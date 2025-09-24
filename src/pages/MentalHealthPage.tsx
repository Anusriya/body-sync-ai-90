import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import AgentInsights from "@/components/AgentInsights";
import { Brain, Send, Smile, Meh, Frown } from "lucide-react";

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

const MentalHealthPage = () => {
  const [mood, setMood] = useState<number | null>(null);
  const [moodLogs, setMoodLogs] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm here to support your mental wellness journey. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const moodEmojis = [
    { value: 1, emoji: "😢", label: "Very Low", color: "text-destructive" },
    { value: 2, emoji: "😔", label: "Low", color: "text-warning" },
    { value: 3, emoji: "😐", label: "Neutral", color: "text-muted-foreground" },
    { value: 4, emoji: "😊", label: "Good", color: "text-success" },
    { value: 5, emoji: "😄", label: "Excellent", color: "text-primary" },
  ];

  const handleMoodSelect = (moodValue: number) => {
    setMood(moodValue);
    
    const newLog = {
      id: Date.now(),
      mood: moodValue,
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleDateString()
    };

    setMoodLogs([newLog, ...moodLogs.slice(0, 6)]);
    
    // Here you would typically save to Supabase
    console.log("Mood log:", newLog);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages([...chatMessages, userMessage]);
    
    // Here you would typically call the /chatbot API
    console.log("Chat message:", userMessage);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "Thank you for sharing. I understand that can be challenging. Would you like to explore some coping strategies?",
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
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
          <CardHeader>
            <CardTitle>AI Wellness Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-64 w-full">
              <div className="space-y-3 pr-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="glass border-border/50 flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
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

        {/* AI Insights */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <AgentInsights 
            category="Mental Wellness"
            insights={moodLogs.length > 0 ? [
              "Your mood tends to improve in the afternoons",
              "Consider practicing meditation for 10 minutes daily",
              "Social connections seem to boost your emotional state"
            ] : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default MentalHealthPage;