import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AgentInsights from "@/components/AgentInsights";
import { Moon, Clock } from "lucide-react";

const SleepPage = () => {
  const [disrupted, setDisrupted] = useState(false);
  const [position, setPosition] = useState("");
  const [notes, setNotes] = useState("");
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  const sleepPositions = [
    "Back", "Side (Left)", "Side (Right)", "Stomach", "Mixed"
  ];

  const handleSubmit = () => {
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      disrupted,
      position: position || "Not specified",
      notes,
      timestamp: new Date().toLocaleDateString()
    };

    setRecentLogs([newLog, ...recentLogs.slice(0, 6)]);
    
    // Here you would typically save to Supabase
    console.log("Sleep log:", newLog);
    
    // Reset form
    setDisrupted(false);
    setPosition("");
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">
            Sleep Shield
          </h1>
          <p className="text-muted-foreground">
            Track your sleep patterns for better rest
          </p>
        </div>

        {/* Sleep Log Form */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              Today's Sleep
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sleep Disruption */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Disrupted Sleep
                </Label>
                <p className="text-xs text-muted-foreground">
                  Did you experience interruptions?
                </p>
              </div>
              <Switch
                checked={disrupted}
                onCheckedChange={setDisrupted}
              />
            </div>

            {/* Sleep Position */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Sleep Position
              </Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger className="glass border-border/50">
                  <SelectValue placeholder="Select your sleep position" />
                </SelectTrigger>
                <SelectContent className="glass border-border/50">
                  {sleepPositions.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Sleep Notes
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did you sleep? Any observations..."
                className="glass border-border/50 resize-none"
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSubmit}
              variant="hero"
              className="w-full"
            >
              Log Sleep
            </Button>
          </CardContent>
        </Card>

        {/* Recent Logs */}
        {recentLogs.length > 0 && (
          <Card className="glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Sleep History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-muted/20 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{log.timestamp}</p>
                        <p className="text-xs text-muted-foreground">
                          Position: {log.position}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {log.disrupted && (
                          <span className="text-xs px-2 py-1 bg-warning/20 text-warning rounded">
                            Disrupted
                          </span>
                        )}
                      </div>
                    </div>
                    {log.notes && (
                      <p className="text-xs text-foreground/80">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Insights */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <AgentInsights 
            category="Sleep Optimization"
            insights={recentLogs.length > 0 ? [
              "Your sleep quality improves on weekends",
              "Try limiting screen time 1 hour before bed",
              "Side sleeping position shows better outcomes"
            ] : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default SleepPage;