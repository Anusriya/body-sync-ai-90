import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import AgentInsights from "@/components/AgentInsights";
import { MapPin, X } from "lucide-react";
import { motion } from "framer-motion";

const EnhancedPainPage = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [severity, setSeverity] = useState([5]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [bodyPartIntensity, setBodyPartIntensity] = useState<Record<string, number>>({});

  // Body parts for quick selection
  const bodyParts = [
    "Head", "Neck", "Shoulders", "Upper Back", "Lower Back",
    "Chest", "Arms", "Hands", "Hips", "Knees", "Feet"
  ];

  // SVG click areas for body map
  const bodyAreas = [
    { id: "head", path: "M100 20 C110 20 120 30 120 40 C120 50 110 60 100 60 C90 60 80 50 80 40 C80 30 90 20 100 20 Z", name: "Head" },
    { id: "neck", path: "M95 60 L105 60 L105 75 L95 75 Z", name: "Neck" },
    { id: "shoulders", path: "M70 75 L90 75 L90 95 L70 95 Z M110 75 L130 75 L130 95 L110 95 Z", name: "Shoulders" },
    { id: "chest", path: "M85 75 L115 75 L115 120 L85 120 Z", name: "Chest" },
    { id: "upper-back", path: "M85 75 L115 75 L115 110 L85 110 Z", name: "Upper Back" },
    { id: "lower-back", path: "M85 110 L115 110 L115 150 L85 150 Z", name: "Lower Back" },
    { id: "arms", path: "M70 95 L65 130 L70 160 L90 150 L90 120 Z M110 120 L110 150 L130 160 L135 130 L130 95 Z", name: "Arms" },
    { id: "hands", path: "M65 160 L75 165 L75 175 L65 175 Z M125 175 L135 175 L135 165 L125 160 Z", name: "Hands" },
    { id: "hips", path: "M85 150 L115 150 L115 180 L85 180 Z", name: "Hips" },
    { id: "knees", path: "M85 200 L95 200 L95 220 L85 220 Z M105 200 L115 200 L115 220 L105 220 Z", name: "Knees" },
    { id: "feet", path: "M85 250 L95 280 L90 285 L85 280 Z M105 280 L115 280 L115 285 L105 285 Z", name: "Feet" }
  ];

  const handleBodyPartClick = (part: string) => {
    setSelectedLocations(prev => 
      prev.includes(part) 
        ? prev.filter(p => p !== part)
        : [...prev, part]
    );
  };

  const handleBodyAreaClick = (areaName: string) => {
    handleBodyPartClick(areaName);
    // Set intensity for heat map visualization
    setBodyPartIntensity(prev => ({
      ...prev,
      [areaName]: severity[0]
    }));
  };

  const removeSelectedLocation = (part: string) => {
    setSelectedLocations(prev => prev.filter(p => p !== part));
    setBodyPartIntensity(prev => {
      const updated = { ...prev };
      delete updated[part];
      return updated;
    });
  };

  const getHeatMapColor = (areaName: string) => {
    const intensity = bodyPartIntensity[areaName];
    if (!intensity) return "transparent";
    
    const opacity = intensity / 10;
    if (intensity <= 3) return `hsla(var(--success), ${opacity})`;
    if (intensity <= 6) return `hsla(var(--warning), ${opacity})`;
    return `hsla(var(--destructive), ${opacity})`;
  };

  const handleSubmit = () => {
    if (selectedLocations.length === 0) return;

    const newLog = {
      id: Date.now(),
      locations: selectedLocations,
      severity: severity[0],
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleString()
    };

    setRecentLogs([newLog, ...recentLogs.slice(0, 4)]);
    
    // Here you would typically save to Supabase
    console.log("Pain log:", newLog);
    
    // Reset form
    setSelectedLocations([]);
    setBodyPartIntensity({});
    setSeverity([5]);
  };

  return (
    <div className="min-h-screen bg-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">
            Pain Tracker
          </h1>
          <p className="text-muted-foreground">
            Track multiple pain points to get comprehensive relief recommendations
          </p>
        </motion.div>

        {/* Interactive Body Map with Heat Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-tertiary" />
                Interactive Body Map
                <Badge variant="secondary" className="ml-auto">Click to select</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Enhanced SVG Body with Heat Map */}
              <div className="relative mx-auto w-48 h-64 mb-6">
                <svg viewBox="0 0 200 300" className="w-full h-full cursor-pointer">
                  <defs>
                    <linearGradient id="bodyOutline" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {/* Body outline */}
                  <path
                    d="M100 20 C110 20 120 30 120 40 C120 50 110 60 100 60 C90 60 80 50 80 40 C80 30 90 20 100 20 Z M100 60 L90 75 L90 150 L85 200 L85 250 L90 280 L110 280 L115 250 L115 200 L110 150 L110 75 Z M90 75 L70 95 L65 130 L70 160 L90 150 M110 75 L130 95 L135 130 L130 160 L110 150"
                    fill="url(#bodyOutline)"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                  />

                  {/* Clickable areas with heat map */}
                  {bodyAreas.map((area) => (
                    <path
                      key={area.id}
                      d={area.path}
                      fill={getHeatMapColor(area.name)}
                      stroke={selectedLocations.includes(area.name) ? "hsl(var(--primary))" : "transparent"}
                      strokeWidth="2"
                      className="cursor-pointer hover:stroke-primary/50 transition-all duration-200"
                      onClick={() => handleBodyAreaClick(area.name)}
                    />
                  ))}
                </svg>
              </div>

              {/* Body part quick select */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {bodyParts.map((part) => (
                  <Button
                    key={part}
                    variant={selectedLocations.includes(part) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBodyPartClick(part)}
                    className="text-xs"
                  >
                    {part}
                  </Button>
                ))}
              </div>

              {/* Selected locations */}
              {selectedLocations.length > 0 && (
                <motion.div 
                  className="mt-4 p-3 rounded-lg bg-muted/30"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-foreground font-medium mb-2">
                    Selected Areas ({selectedLocations.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocations.map((location) => (
                      <Badge 
                        key={location} 
                        variant="secondary" 
                        className="flex items-center gap-1"
                      >
                        {location}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removeSelectedLocation(location)}
                        />
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pain Severity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass">
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
                disabled={selectedLocations.length === 0}
                variant="hero"
                className="w-full"
              >
                Log Pain {selectedLocations.length > 0 && `(${selectedLocations.length} areas)`}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Logs */}
        {recentLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle>Recent Pain Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <div className="flex flex-wrap gap-1 mb-1">
                          {log.locations.map((location: string) => (
                            <Badge key={location} variant="outline" className="text-xs">
                              {location}
                            </Badge>
                          ))}
                        </div>
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
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AgentInsights 
            category="Pain Relief"
            insights={recentLogs.length > 0 ? [
              "Multiple pain points detected - consider holistic treatment",
              "Lower back pain is most frequent - focus on posture",
              "Pain levels tend to increase in the evening hours"
            ] : undefined}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedPainPage;