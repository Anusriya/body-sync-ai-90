import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AgentInsights from "@/components/AgentInsights";
import { Utensils, TrendingUp } from "lucide-react";

const NutritionPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  const nutritionSymptoms = [
    { id: "fatigue", label: "Fatigue or low energy" },
    { id: "cravings", label: "Food cravings" },
    { id: "bloating", label: "Bloating or digestive issues" },
    { id: "mood", label: "Mood swings" },
    { id: "brain_fog", label: "Brain fog or concentration issues" },
    { id: "sugar_cravings", label: "Sugar cravings" },
    { id: "sleep_issues", label: "Sleep disturbances" },
    { id: "energy_crashes", label: "Energy crashes" },
  ];

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    }
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) return;

    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      symptoms: selectedSymptoms,
      timestamp: new Date().toLocaleDateString(),
      symptomsCount: selectedSymptoms.length
    };

    setRecentLogs([newLog, ...recentLogs.slice(0, 6)]);
    
    // Here you would typically save to Supabase
    console.log("Nutrition log:", newLog);
    
    // Reset form
    setSelectedSymptoms([]);
  };

  const getSymptomLabel = (id: string) => {
    return nutritionSymptoms.find(s => s.id === id)?.label || id;
  };

  return (
    <div className="min-h-screen bg-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">
            Nutrition Support
          </h1>
          <p className="text-muted-foreground">
            Track symptoms to optimize your nutrition
          </p>
        </div>

        {/* Nutrition Assessment */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-secondary" />
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Select any symptoms you've experienced recently:
            </p>
            
            <div className="space-y-3">
              {nutritionSymptoms.map((symptom) => (
                <div key={symptom.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={symptom.id}
                    checked={selectedSymptoms.includes(symptom.id)}
                    onCheckedChange={(checked) => 
                      handleSymptomChange(symptom.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={symptom.id}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {symptom.label}
                  </Label>
                </div>
              ))}
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{selectedSymptoms.length}</span> symptoms selected
                </p>
              </div>
            )}

            <Button 
              onClick={handleSubmit}
              disabled={selectedSymptoms.length === 0}
              variant="hero"
              className="w-full mt-6"
            >
              Log Symptoms
            </Button>
          </CardContent>
        </Card>

        {/* Recent Logs */}
        {recentLogs.length > 0 && (
          <Card className="glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Nutrition History
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
                          {log.symptomsCount} symptoms reported
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded ${
                          log.symptomsCount <= 2 
                            ? 'bg-success/20 text-success' 
                            : log.symptomsCount <= 4
                            ? 'bg-warning/20 text-warning'
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {log.symptomsCount <= 2 ? 'Good' : 
                           log.symptomsCount <= 4 ? 'Moderate' : 'Concerning'}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-foreground/70">
                      {log.symptoms.slice(0, 3).map((symptom: string) => 
                        getSymptomLabel(symptom)
                      ).join(", ")}
                      {log.symptoms.length > 3 && ` +${log.symptoms.length - 3} more`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Insights */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <AgentInsights 
            category="Nutrition Optimization"
            insights={recentLogs.length > 0 ? [
              "Fatigue patterns suggest possible iron deficiency",
              "Consider eating more protein with breakfast",
              "Your symptoms improve on weekends - stress may be a factor"
            ] : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;