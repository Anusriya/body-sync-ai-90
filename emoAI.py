import sounddevice as sd
import numpy as np
import queue
import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
import google.generativeai as genai
from google.cloud import speech, firestore
from google.cloud.firestore import SERVER_TIMESTAMP
import threading
from datetime import datetime, time
from collections import Counter

# ==============================================================================
# 1. --- IMPORTANT: PASTE YOUR FILE PATHS AND API KEY HERE ---
# ==============================================================================

# 1a. Paste the FULL path to your Google credentials JSON file
# FIX: Corrected this line to use os.environ
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\shamb\Downloads\ai\ttsbot-471404-39e4ea704298.json"

# 1b. Paste your Gemini API key
GEMINI_API_KEY = "AIzaSyA7mC-8AdeLf_rrOU2moGSU0DZ1LF7Xbws" # Replace with your actual key

# ==============================================================================
# --- BACKEND LOGIC (SERVER) ---
# ==============================================================================

try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    stt_client = speech.SpeechClient()
    db = firestore.Client()
except Exception as e:
    print(f"FATAL ERROR: Could not initialize Google Cloud services: {e}")
    exit()

# --- Globals ---
GLOBAL_SESSION_ID = "global_chat_history"
chat_history = []
current_persona = "therapist_bot"

# Audio recording globals
q = queue.Queue()
is_recording = False
recording_thread = None
full_audio_data = b''

def get_db_ref():
    return db.collection(GLOBAL_SESSION_ID).document("chat")

def load_chat_history():
    global chat_history
    try:
        doc = get_db_ref().get()
        if doc.exists:
            data = doc.to_dict()
            chat_history = data.get("messages", [])
            print("Chat history loaded from Firestore.")
        else:
            print("No chat history found in Firestore.")
    except Exception as e:
        print(f"Error loading chat history from Firestore: {e}")
    
def save_chat_history():
    try:
        get_db_ref().set({"messages": chat_history})
    except Exception as e:
        print(f"Error saving chat history to Firestore: {e}")

def add_message(speaker, text):
    now = datetime.now()
    timestamp_str = now.strftime("%I:%M %p")
    new_message = {"speaker": speaker, "text": text, "timestamp": timestamp_str}
    chat_history.append(new_message)
    save_chat_history()

def clear_chat_history():
    global chat_history
    chat_history = []
    try:
        get_db_ref().delete()
        print("Chat history cleared.")
    except Exception as e:
        print(f"Error clearing chat history: {e}")

def generate_reply(user_message, persona):
    full_prompt = (
        f"You are an AI assistant in the role of a {persona}. "
        "Your goal is to provide supportive and empathetic responses. "
        "Keep your replies concise and helpful. "
        "Based on the conversation history, respond to the user's latest message. "
        "Ensure your responses are empathetic and provide mental health support."
    )
    
    context = [{"role": "user", "parts": [full_prompt]}]
    for msg in chat_history:
        role = "user" if msg["speaker"] == "user" else "model"
        context.append({"role": role, "parts": [msg["text"]]})

    try:
        response = model.generate_content(context)
        return response.text
    except Exception as e:
        print(f"Error generating content: {e}")
        return "I'm sorry, I am unable to generate a response at this time."

def generate_insights_rules(mood_logs, chat_messages):
    insights = set()
    
    if not mood_logs and not chat_messages:
        return ["Hello there! To get personalized insights, start by logging your mood and thoughts or chatting with me."]
    
    # Define keywords for different moods
    low_mood_keywords = ['stressed', 'anxious', 'overwhelmed', 'sad', 'tired', 'down', 'difficult', 'struggling']
    happy_mood_keywords = ['happy', 'excited', 'great', 'good', 'joyful', 'amazing', 'productive', 'inspired']
    
    recent_moods = [log['mood'] for log in mood_logs]
    
    # Rule 1: Consistent Low Moods (3 consecutive)
    if len(recent_moods) >= 3 and all(mood <= 2 for mood in recent_moods[:3]):
        insights.add("It looks like you've been feeling low recently. Remember, it's okay to take a break and focus on self-care. Try listening to some calming music or stepping away for a few moments.")

    # Rule 2: Consistent High Moods (3 consecutive)
    if len(recent_moods) >= 3 and all(mood >= 4 for mood in recent_moods[:3]):
        insights.add("Your mood has been consistently high! Keep a journal of what's going well to reinforce these positive feelings.")

    # Rule 3: Significant Mood Drop (e.g., from Good/Excellent to Low/Very Low)
    if len(recent_moods) >= 2 and recent_moods[0] <= 2 and recent_moods[1] >= 4:
        insights.add("A significant mood drop was logged. It's important to be kind to yourself on days like these. Try to identify what might have triggered this change and remember you're not alone.")

    # Rule 4: Significant Mood Spike (e.g., from Low/Very Low to Good/Excellent)
    if len(recent_moods) >= 2 and recent_moods[0] >= 4 and recent_moods[1] <= 2:
        insights.add("Your mood spiked up recently! Reflect on what made you feel better and try to incorporate more of that into your routine.")

    # Rule 5: Low mood and associated thoughts
    for log in mood_logs:
        if log['mood'] <= 2 and 'whatWasOnYourMind' in log:
            if any(keyword in log['whatWasOnYourMind'].lower() for keyword in low_mood_keywords):
                insights.add("We've noticed a connection between your recent low mood and your thoughts. Acknowledge what you're feeling and consider talking to a trusted friend or family member.")
                break

    # Rule 6: Happy mood and associated thoughts
    for log in mood_logs:
        if log['mood'] >= 4 and 'whatWasOnYourMind' in log:
            if any(keyword in log['whatWasOnYourMind'].lower() for keyword in happy_mood_keywords):
                insights.add("It looks like you're feeling great! Try to remember what's making you feel this way and continue doing it.")
                break

    # Rule 7: Correlate keywords from chat with low moods
    for message in chat_messages:
        if message['speaker'] == 'user' and any(keyword in message['text'].lower() for keyword in low_mood_keywords):
            insights.add("We've noticed you've been talking about stress. Acknowledging your feelings is the first step towards managing them. You might find a short walk or some deep breathing exercises helpful.")
            break

    # Rule 8: Correlate keywords from chat with happy moods
    for message in chat_messages:
        if message['speaker'] == 'user' and any(keyword in message['text'].lower() for keyword in happy_mood_keywords):
            insights.add("It's wonderful to see your positive energy shining through in our chat! Keep celebrating those small wins.")
            break

    # Rule 9: Check for consistent neutral moods (e.g., all 3s in the last 5 logs)
    if len(recent_moods) >= 5 and all(mood == 3 for mood in recent_moods[:5]):
        insights.add("Your mood has been steady and neutral. Try setting a small, manageable goal to add some excitement to your routine, like trying a new hobby or activity.")

    # Rule 10: Specific keyword combination for sleep
    sleep_keywords = ['sleep', 'tired', 'restless', 'insomnia']
    for log in mood_logs:
        if log['mood'] <= 2 and 'whatWasOnYourMind' in log and any(keyword in log['whatWasOnYourMind'].lower() for keyword in sleep_keywords):
            insights.add("It seems that a lack of rest might be affecting your mood. Prioritizing your sleep can make a big difference! Try to wind down before bed with a warm drink or a book.")
            break

    # Final fallback if no other insights are generated
    if not insights:
        insights.add("Keep logging your moods and chatting to unlock new insights!")
        
    return list(insights)

def callback(indata, frames, time, status):
    q.put(indata.copy())

def start_recording():
    global is_recording, recording_thread, full_audio_data
    if is_recording: return False
    is_recording = True
    full_audio_data = b''
    recording_thread = threading.Thread(target=_record_thread)
    recording_thread.start()
    print("Recording started...")
    return True

def _record_thread():
    global is_recording, full_audio_data
    with sd.InputStream(callback=callback, channels=1, samplerate=44100):
        while is_recording or not q.empty():
            try:
                data = q.get_nowait()
                audio_np = np.frombuffer(data, dtype=np.float32)
                audio_int16 = (audio_np * 32767).astype(np.int16)
                full_audio_data += audio_int16.tobytes()
            except queue.Empty:
                if not is_recording: break
                pass

def stop_recording_and_get_bytes():
    global is_recording, recording_thread, full_audio_data
    if not is_recording: return None
    is_recording = False
    if recording_thread:
        recording_thread.join()
    print("Recording stopped.")
    return full_audio_data

def speech_to_text_bytes(audio_bytes):
    global stt_client
    try:
        audio = speech.RecognitionAudio(content=audio_bytes)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=44100,
            language_code="en-US"
        )
        response = stt_client.recognize(config=config, audio=audio)
        if response.results:
            return response.results[0].alternatives[0].transcript
        return ""
    except Exception as e:
        print(f"Speech-to-text error: {e}")
        return ""

class ChatbotHandler(BaseHTTPRequestHandler):
    def _send_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/get_history":
            self._send_response(200, {"messages": chat_history})
        else:
            self._send_response(404, {"error": "Not Found"})

    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            endpoint = self.path
            status_code = 200
            response_data = {}
            
            if endpoint == "/api/send_message":
                user_message = data.get("message")
                add_message("user", user_message)
                bot_reply = generate_reply(user_message, current_persona)
                add_message(current_persona, bot_reply)
                now = datetime.now()
                timestamp_str = now.strftime("%I:%M %p")
                response_data = {"reply": bot_reply, "speaker": current_persona, "timestamp": timestamp_str}
            elif endpoint == "/api/clear_history":
                clear_chat_history()
                response_data = {"status": "success"}
            elif endpoint == "/api/get_insights":
                mood_logs = data.get("moodLogs", [])
                chat_messages = data.get("chatMessages", [])
                
                insights = generate_insights_rules(mood_logs, chat_messages)
                response_data = {"insights": insights}

            elif endpoint == "/api/start_recording":
                response_data = {"status": "success" if start_recording() else "error"}
            elif endpoint == "/api/stop_recording":
                audio_bytes = stop_recording_and_get_bytes()
                if not audio_bytes: status_code, response_data = 500, {"message": "No audio"}
                else:
                    text = speech_to_text_bytes(audio_bytes)
                    add_message("user", text)
                    bot_reply = generate_reply(text, current_persona)
                    add_message(current_persona, bot_reply)
                    now = datetime.now()
                    timestamp_str = now.strftime("%I:%M %p")
                    response_data = {"text": text, "reply": bot_reply, "speaker": current_persona, "timestamp": timestamp_str}
            else: status_code, response_data = 404, {"error": "Not Found"}
            self._send_response(status_code, response_data)
        except Exception as e:
            print(f"Error in POST to {self.path}: {e}")
            self._send_response(500, {"error": "Internal Server Error", "details": str(e)})

if __name__ == "__main__":
    load_chat_history()
    server = HTTPServer(('localhost', 8000), ChatbotHandler)
    print("🔥 Server started at http://localhost:8000 🔥")
    try: server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()
        print("Server stopped.")
