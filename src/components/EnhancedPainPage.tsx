import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AgentInsights from "@/components/AgentInsights";
import { X } from "lucide-react";

const EnhancedPainPage = () => {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [severity, setSeverity] = useState([5]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const navigate = useNavigate();

  const bodyAreas = [
    { id: "head", name: "Head", path: "M100 10 C110 10 120 25 120 40 C120 55 110 70 100 70 C90 70 80 55 80 40 C80 25 90 10 100 10 Z" },
    { id: "neck", name: "Neck", path: "M95 70 L105 70 L105 90 L95 90 Z" },
    { id: "shoulders", name: "Shoulders", path: "M70 90 L130 90 L130 120 L70 120 Z" },
    { id: "chest", name: "Chest", path: "M80 120 L120 120 L120 160 L80 160 Z" },
    { id: "breast-left", name: "Left Breast", path: "M85 120 L95 120 L95 140 L85 140 Z" },
    { id: "breast-right", name: "Right Breast", path: "M105 120 L115 120 L115 140 L105 140 Z" },
    { id: "abdomen", name: "Abdomen", path: "M80 160 L120 160 L120 200 L80 200 Z" },
    { id: "hips", name: "Hips", path: "M75 200 L125 200 L125 230 L75 230 Z" },
    { id: "inner-thigh-left", name: "Inner Thigh Left", path: "M75 230 L95 230 L95 280 L75 280 Z" },
    { id: "inner-thigh-right", name: "Inner Thigh Right", path: "M105 230 L125 230 L125 280 L105 280 Z" },
    { id: "outer-thigh-left", name: "Outer Thigh Left", path: "M65 230 L75 230 L75 280 L65 280 Z" },
    { id: "outer-thigh-right", name: "Outer Thigh Right", path: "M125 230 L135 230 L135 280 L125 280 Z" },
    { id: "knees-left", name: "Knee Left", path: "M75 280 L95 280 L95 300 L75 300 Z" },
    { id: "knees-right", name: "Knee Right", path: "M105 280 L125 280 L125 300 L105 300 Z" },
    { id: "feet-left", name: "Foot Left", path: "M75 300 L95 300 L95 310 L75 310 Z" },
    { id: "feet-right", name: "Foot Right", path: "M105 300 L125 300 L125 310 L105 310 Z" },
    { id: "arms-left", name: "Arm Left", path: "M60 120 L70 120 L70 180 L60 180 Z" },
    { id: "arms-right", name: "Arm Right", path: "M130 120 L140 120 L140 180 L130 180 Z" },
    { id: "hands-left", name: "Hand Left", path: "M60 180 L70 180 L70 200 L60 200 Z" },
    { id: "hands-right", name: "Hand Right", path: "M130 180 L140 180 L140 200 L130 200 Z" },
  ];

  const togglePart = (name: string) => {
    setSelectedParts(prev =>
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    );
  };

  const handleDone = () => {
    console.log("Selected body parts:", selectedParts); // log for debugging
    navigate("/pain-summary", { state: { selectedParts } });
  };

  const handleLogPain = () => {
    if (selectedParts.length === 0) return;

    const newLog = {
      id: Date.now(),
      locations: selectedParts,
      severity: severity[0],
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleString(),
    };

    setRecentLogs([newLog, ...recentLogs.slice(0, 4)]);
    setSelectedParts([]);
    setSeverity([5]);
  };

  return (
    <div className="min-h-screen bg-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">Pain Tracker</h1>
          <p className="text-muted-foreground">Select areas of pain on the body</p>
        </motion.div>

        {/* Body Map */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Interactive Female Body</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mx-auto w-56 h-[600px] mb-4">
              <svg viewBox="0 0 200 320" className="w-full h-full">
                {bodyAreas.map(area => (
                  <path
                    key={area.id}
                    d={area.path}
                    fill={selectedParts.includes(area.name) ? "rgba(255,0,0,0.5)" : "#fcd5d5"} // light pink default
                    stroke="black"
                    strokeWidth={1.5}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => togglePart(area.name)}
                  />
                ))}
              </svg>
            </div>

            {/* Selected parts badges */}
            {selectedParts.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">
                  Selected Areas ({selectedParts.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedParts.map(part => (
                    <Badge key={part} variant="secondary" className="flex items-center gap-1">
                      {part}
                      <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => togglePart(part)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Pain Severity */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Pain Intensity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Level: {severity[0]}/10</Label>
              <Slider value={severity} onValueChange={setSeverity} max={10} min={1} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
            <Button onClick={handleLogPain} disabled={selectedParts.length === 0} variant="hero" className="w-full">
              Log Pain ({selectedParts.length} areas)
            </Button>
          </CardContent>
        </Card>

        {/* Recent Logs */}
        {recentLogs.length > 0 && (
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Pain Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map(log => (
                  <motion.div key={log.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/20"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                    <div>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {log.locations.map((location: string) => (
                          <Badge key={location} variant="outline" className="text-xs">{location}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{log.severity}/10</p>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`w-1 h-3 rounded ${i < log.severity ? 'bg-tertiary' : 'bg-muted'}`} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Insights */}
        <AgentInsights
          category="Pain Relief"
          insights={recentLogs.length > 0 ? [
            "Multiple pain points detected - consider holistic treatment",
            "Lower back pain is most frequent - focus on posture",
            "Pain levels tend to increase in the evening hours"
          ] : undefined}
        />
      </div>
    </div>
  );
};

export default EnhancedPainPage;
