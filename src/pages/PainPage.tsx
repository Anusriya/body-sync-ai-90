import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import AgentInsights from "@/components/AgentInsights";
import { MapPin } from "lucide-react";

const PainPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [severity, setSeverity] = useState([5]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  // Body parts for quick selection
  const bodyParts = [
    "Head", "Neck", "Shoulders", "Upper Back", "Lower Back",
    "Chest", "Arms", "Hands", "Hips", "Knees", "Feet"
  ];

  const handleBodyPartClick = (part: string) => {
    setSelectedLocation(part);
  };

  const handleSubmit = () => {
    if (!selectedLocation) return;

    const newLog = {
      id: Date.now(),
      location: selectedLocation,
      severity: severity[0],
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleString()
    };

    setRecentLogs([newLog, ...recentLogs.slice(0, 4)]);
    
    // Here you would typically save to Supabase
    console.log("Pain log:", newLog);
    
    // Reset form
    setSelectedLocation("");
    setSeverity([5]);
  };

  return (
    <div className="min-h-screen bg-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">
            Pain Tracker
          </h1>
          <p className="text-muted-foreground">
            Log your pain to get personalized relief recommendations
          </p>
        </div>

        {/* Interactive Body Map */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-tertiary" />
              Where does it hurt?
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simplified body visualization */}
            <div className="relative mx-auto w-48 h-64 mb-6">
              <svg viewBox="0 0 150 200" className="w-full h-full">
                <defs>
                  <linearGradient id="bodyOutline" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                
                {/* Body outline */}
                <path
                  d="M75 15 C85 15 95 25 95 35 C95 45 85 55 75 55 C65 55 55 45 55 35 C55 25 65 15 75 15 Z M75 55 L65 75 L65 120 L60 150 L60 180 L65 195 L85 195 L90 180 L90 150 L85 120 L85 75 Z M65 75 L45 95 L40 120 L45 140 L65 130 M85 75 L105 95 L110 120 L105 140 L85 130"
                  fill="url(#bodyOutline)"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Body part quick select */}
            <div className="grid grid-cols-3 gap-2">
              {bodyParts.map((part) => (
                <Button
                  key={part}
                  variant={selectedLocation === part ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleBodyPartClick(part)}
                  className="text-xs"
                >
                  {part}
                </Button>
              ))}
            </div>

            {selectedLocation && (
              <div className="mt-4 p-3 rounded-lg bg-muted/30">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Selected:</span> {selectedLocation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pain Severity */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>Pain Intensity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Level: {severity[0]}/10
              </Label>
              <Slider
                value={severity}
                onValueChange={setSeverity}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={!selectedLocation}
              variant="hero"
              className="w-full"
            >
              Log Pain
            </Button>
          </CardContent>
        </Card>

        {/* Recent Logs */}
        {recentLogs.length > 0 && (
          <Card className="glass animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle>Recent Pain Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-muted/20"
                  >
                    <div>
                      <p className="font-medium text-sm">{log.location}</p>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{log.severity}/10</p>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-3 rounded ${
                              i < log.severity ? 'bg-tertiary' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Insights */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <AgentInsights 
            category="Pain Relief"
            insights={recentLogs.length > 0 ? [
              "Your most frequent pain location is lower back",
              "Consider gentle stretching exercises",
              "Pain levels tend to increase in the evening"
            ] : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default PainPage;