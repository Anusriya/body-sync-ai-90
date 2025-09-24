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
from datetime import datetime

# ==============================================================================
# 1. --- IMPORTANT: PASTE YOUR FILE PATHS AND API KEY HERE ---
# ==============================================================================

# 1a. Paste the FULL path to your Google credentials JSON file
# FIX: Corrected this line to use os.environ
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"D:\sih\agri_predict_app\body-sync-ai-90\ttsbot-471404-39e4ea704298.json"

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
GLOBAL_SESSION_ID = "global_chat"
current_persona = "Lucy" # This will now represent the user's "handle" or chosen persona
RATE = 16000
CHANNELS = 1
q = queue.Queue()
is_recording = False
stream = None

personality_styles = {
    "Lucy": "gentle, sweet, comforting 💕", "Suzanne": "funny, silly, playful 😂",
    "Lexi": "wise, thoughtful 🌿", "Roxy": "bold, confident 🔥"
}

# --- Firestore Helpers (Updated for Global Chat) ---
def add_message(speaker, text):
    # All messages go to the global chat session now
    msgs = db.collection("sessions").document(GLOBAL_SESSION_ID).collection("messages")
    msgs.add({"speaker": speaker, "text": text, "ts": SERVER_TIMESTAMP})

# MODIFIED: This function now includes a formatted timestamp
def get_messages(limit=50):
    msgs_col = db.collection("sessions").document(GLOBAL_SESSION_ID).collection("messages")
    docs = msgs_col.order_by("ts", direction=firestore.Query.ASCENDING).limit(limit).stream()
    messages = []
    for d in docs:
        data = d.to_dict()
        timestamp = data.get("ts", None)
        if timestamp:
            # Format the timestamp to a readable string for the frontend
            timestamp_str = timestamp.strftime("%I:%M %p")
        else:
            timestamp_str = "Unknown"
        messages.append({
            "id": d.id,
            "speaker": data.get("speaker"),
            "text": data.get("text"),
            "timestamp": timestamp_str
        })
    return messages

def clear_history():
    doc_ref = db.collection("sessions").document(GLOBAL_SESSION_ID)
    msgs = list(doc_ref.collection("messages").stream())
    batch = db.batch()
    for i, m in enumerate(msgs):
        batch.delete(m.reference)
        if (i + 1) % 400 == 0:
            batch.commit()
            batch = db.batch()
    if len(msgs) % 400 != 0: batch.commit()

def add_persona_memory(persona, text):
    mem = db.collection("persona_memories").document(persona).collection("entries")
    mem.add({"text": text, "ts": SERVER_TIMESTAMP})

def get_persona_memory(persona, limit=10):
    mem_col = db.collection("persona_memories").document(persona).collection("entries")
    docs = mem_col.order_by("ts", direction=firestore.Query.DESCENDING).limit(limit).stream()
    return "\n".join([d.to_dict().get("text", "") for d in docs])

# --- AI Logic (Updated for Memory) ---
def generate_reply(user_text, persona):
    style = personality_styles.get(persona, "friendly and supportive")
    history_text = "\n".join([f"{m['speaker']}: {m['text']}" for m in get_messages(limit=20)])
    persona_mem = get_persona_memory(persona)
    prompt = (
        f"You are {persona}, {style}. Speak as yourself only, not for others.\n\n"
        f"Your private memory of things you've said:\n{persona_mem}\n\n"
        f"This is the current group chat history:\n{history_text}\n"
        f"A user just said: {user_text}\n"
        f"Your response (as {persona}):"
    )
    response = model.generate_content(prompt)
    reply_text = response.text.strip()
    # Add the AI's reply to its own memory
    add_persona_memory(persona, reply_text)
    return reply_text

# --- Audio Functions ---
def audio_callback(indata, frames, time, status):
    if status: print(status, flush=True)
    if is_recording: q.put(indata.copy())

def start_recording():
    global is_recording, stream
    is_recording = True; q.queue.clear()
    try:
        stream = sd.InputStream(samplerate=RATE, channels=CHANNELS, callback=audio_callback)
        stream.start(); return True
    except Exception as e:
        print(f"Error starting audio stream: {e}"); return False

def stop_recording_and_get_bytes():
    global is_recording, stream
    is_recording = False
    if stream: stream.stop(); stream.close(); stream = None
    if q.empty(): return None
    frames = [];
    while not q.empty(): frames.append(q.get())
    return (np.concatenate(frames, axis=0) * 32767).astype(np.int16).tobytes()

def speech_to_text_bytes(audio_bytes):
    if not audio_bytes: return ""
    audio = speech.RecognitionAudio(content=audio_bytes)
    config = speech.RecognitionConfig(encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16, sample_rate_hertz=RATE, language_code="en-US")
    response = stt_client.recognize(config=config, audio=audio)
    return response.results[0].alternatives[0].transcript if response.results else ""

# --- HTTP Server ---
class ChatbotHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*"); self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(204); self._send_cors_headers(); self.end_headers()

    def _send_response(self, code, data, content_type="application/json"):
        self.send_response(code); self.send_header("Content-type", content_type); self._send_cors_headers(); self.end_headers()
        if data is not None: self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_GET(self):
        if self.path == "/": self.path = "/index.html"
        try:
            filepath = self.path.lstrip("/")
            if filepath.endswith((".html", ".css", ".js")):
                content_types = {".html": "text/html", ".css": "text/css", ".js": "application/javascript"}
                content_type = content_types[os.path.splitext(filepath)[1]]
                with open(filepath, "rb") as f:
                    self.send_response(200); self.send_header("Content-type", content_type); self.end_headers()
                    self.wfile.write(f.read())
            elif self.path == "/api/get_history":
                self._send_response(200, {"messages": get_messages()})
            else:
                self._send_response(404, {"error": "Not Found"})
        except FileNotFoundError:
            self._send_response(404, {"error": f"{self.path.lstrip('/')} not found"})
        except Exception as e:
            self._send_response(500, {"error": "Internal Server Error", "details": str(e)})

    # MODIFIED: This function now returns a timestamp with the bot's reply
    def do_POST(self):
        global current_persona
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            data = json.loads(body.decode('utf-8')) if body else {}
            endpoint = self.path
            response_data, status_code = {}, 200

            if endpoint == "/api/set_persona":
                current_persona = data.get("persona", "Lucy")
                response_data = {"status": "success", "persona": current_persona}
            elif endpoint == "/api/send_message":
                text = data.get("message", "").strip()
                add_message("user", text)
                bot_reply = generate_reply(text, current_persona)
                add_message(current_persona, bot_reply)
                now = datetime.now()
                timestamp_str = now.strftime("%I:%M %p")
                response_data = {"reply": bot_reply, "speaker": current_persona, "timestamp": timestamp_str}
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
    server = HTTPServer(('localhost', 8000), ChatbotHandler)
    print("🔥 Server started at http://localhost:8000 🔥")
    try: server.serve_forever()
    except KeyboardInterrupt: print("\n👋 Server shutting down..."); server.shutdown()
