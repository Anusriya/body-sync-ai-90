import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import AgentInsights from "@/components/AgentInsights";
import { Brain, Send, Smile, Meh, Frown, X } from "lucide-react";

interface ChatMessage {
  id: number;
  speaker: string;
  text: string;
  timestamp: string;
}

const MentalHealthPage = () => {
  const [mood, setMood] = useState<number | null>(null);
  const [whatWasOnYourMind, setWhatWasOnYourMind] = useState<string>(""); // New state for the user's thoughts
  const [moodLogs, setMoodLogs] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]); // New state for dynamic insights

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const moodEmojis = [
    { value: 1, emoji: "😢", label: "Very Low", color: "text-destructive" },
    { value: 2, emoji: "😔", label: "Low", color: "text-warning" },
    { value: 3, emoji: "😐", label: "Neutral", color: "text-muted-foreground" },
    { value: 4, emoji: "😊", label: "Good", color: "text-success" },
    { value: 5, emoji: "😄", label: "Excellent", color: "text-primary" },
  ];

  // Function to fetch dynamic insights from the backend
  const fetchInsights = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/get_insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send relevant data to the backend for analysis
        body: JSON.stringify({ moodLogs, chatMessages }), 
      });
      const data = await response.json();
      if (response.ok) {
        setInsights(data.insights);
      }
    } catch (error) {
      console.error("Failed to fetch insights:", error);
      // You can set a default message on failure
      setInsights(["Sorry, I'm unable to get new insights right now."]); 
    }
  };

  // Effect to fetch initial chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/get_history");
        const data = await response.json();
        if (response.ok) {
          setChatMessages(data.messages);
        } else {
          console.error("Failed to fetch chat history:", data);
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChatHistory();
    // Also fetch insights on initial load
    fetchInsights();
  }, []);

  // Effect to auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Effect to fetch new insights whenever mood logs or chat messages change
  useEffect(() => {
    fetchInsights();
  }, [moodLogs, chatMessages]);

  const handleMoodSelect = (moodValue: number) => {
    setMood(moodValue);
    
    const newLog = {
      id: Date.now(),
      mood: moodValue,
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleDateString(),
      whatWasOnYourMind: whatWasOnYourMind // Include the new data in the log
    };

    setMoodLogs([newLog, ...moodLogs.slice(0, 6)]);
    console.log("Mood log:", newLog);
    setWhatWasOnYourMind(""); // Clear the input field after logging
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage;
    const userMessage: ChatMessage = {
      id: Date.now(),
      speaker: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/send_message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      if (response.ok) {
        const data = await response.json();
        const botResponse: ChatMessage = {
          id: Date.now(),
          speaker: data.speaker,
          text: data.reply,
          timestamp: data.timestamp
        };
        setChatMessages(prev => [...prev, botResponse]);
      } else {
        console.error("API error:", response.status, response.statusText);
        const errorBotResponse: ChatMessage = {
          id: Date.now(),
          speaker: 'bot',
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, errorBotResponse]);
      }
    } catch (error) {
      console.error("Network error:", error);
      const errorBotResponse: ChatMessage = {
        id: Date.now(),
        speaker: 'bot',
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, errorBotResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await fetch("http://localhost:8000/api/clear_history", { method: "POST" });
      setChatMessages([]);
    } catch (error) {
      console.error("Failed to clear chat history:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">
            Mental Wellness
          </h1>
          <p className="text-muted-foreground">
            Your AI companion for emotional support
          </p>
        </div>

        {/* Mood Tracker */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-tertiary" />
              How are you feeling?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center py-4">
              {moodEmojis.map((moodOption) => (
                <button
                  key={moodOption.value}
                  onClick={() => handleMoodSelect(moodOption.value)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                    mood === moodOption.value
                      ? 'bg-glass/50 scale-110'
                      : 'hover:bg-glass/30 hover:scale-105'
                  }`}
                >
                  <span className="text-2xl mb-1">{moodOption.emoji}</span>
                  <span className={`text-xs font-medium ${moodOption.color}`}>
                    {moodOption.label}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="mt-4">
              <label htmlFor="whatWasOnYourMind" className="text-sm font-medium text-foreground/90">
                What was on your mind? (optional)
              </label>
              <Input
                id="whatWasOnYourMind"
                value={whatWasOnYourMind}
                onChange={(e) => setWhatWasOnYourMind(e.target.value)}
                placeholder="Share your thoughts..."
                className="glass mt-2"
              />
            </div>
          
            {mood && (
              <div className="mt-4 p-3 rounded-lg bg-tertiary/10 border border-tertiary/20">
                <p className="text-sm text-foreground">
                  Mood logged: {moodEmojis.find(m => m.value === mood)?.label}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chatbot Interface */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>AI Wellness Chat</CardTitle>
            <Button
              onClick={handleClearChat}
              variant="ghost"
              size="icon"
              className="w-8 h-8"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Clear Chat</span>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-64 w-full">
              <div ref={chatContainerRef} className="space-y-3 pr-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.speaker === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.speaker === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground">
                      <p className="text-sm italic">Typing...</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="glass border-border/50 flex-1"
                disabled={loading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || loading}
                size="icon"
                variant="hero"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Mood Logs */}
        {moodLogs.length > 0 && (
          <Card className="glass animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle>Mood History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodLogs.map((log) => {
                  const moodData = moodEmojis.find(m => m.value === log.mood);
                  return (
                    <div
                      key={log.id}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/20"
                    >
                      <div>
                        <p className="text-sm font-medium">{log.timestamp}</p>
                        {log.whatWasOnYourMind && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Thoughts: {log.whatWasOnYourMind}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{moodData?.emoji}</span>
                        <span className={`text-sm font-medium ${moodData?.color}`}>
                          {moodData?.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Insights - now using dynamic insights */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <AgentInsights 
            category="Mental Wellness"
            insights={insights} // Pass the dynamic insights state
            onRefresh={fetchInsights} // Pass the new fetch function to the refresh button
          />
        </div>
      </div>
    </div>
  );
};

export default MentalHealthPage;
