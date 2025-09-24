import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AgentInsights from "@/components/AgentInsights";
import { Activity, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

const RiskPage = () => {
  const [riskScore, setRiskScore] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock health metrics based on logged data
  const healthMetrics = [
    {
      category: "Pain Management",
      score: 75,
      status: "Good",
      icon: Activity,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Recent pain logs show improvement"
    },
    {
      category: "Sleep Quality",
      score: 60,
      status: "Moderate",
      icon: TrendingUp,
      color: "text-warning",
      bgColor: "bg-warning/10",
      description: "Some disrupted sleep patterns detected"
    },
    {
      category: "Nutrition",
      score: 85,
      status: "Excellent",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Balanced symptom reporting"
    },
    {
      category: "Mental Health",
      score: 70,
      status: "Good",
      icon: Activity,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Positive mood trends observed"
    }
  ];

  const calculateOverallRisk = () => {
    setLoading(true);
    // Simulate API call to /agent endpoint
    setTimeout(() => {
      const avgScore = healthMetrics.reduce((sum, metric) => sum + metric.score, 0) / healthMetrics.length;
      setRiskScore(100 - avgScore); // Inverse for risk
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    calculateOverallRisk();
  }, []);

  const getRiskLevel = (score: number) => {
    if (score < 20) return { level: "Low Risk", color: "text-success", bgColor: "bg-success/10" };
    if (score < 40) return { level: "Moderate Risk", color: "text-warning", bgColor: "bg-warning/10" };
    return { level: "High Risk", color: "text-destructive", bgColor: "bg-destructive/10" };
  };

  const riskLevel = getRiskLevel(riskScore);

  const recommendations = [
    "Continue current pain management routine",
    "Focus on improving sleep consistency",
    "Maintain balanced nutrition habits",
    "Consider stress reduction techniques"
  ];

  return (
    <div className="min-h-screen bg-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">
            Early Detection
          </h1>
          <p className="text-muted-foreground">
            Predictive wellness insights from your health data
          </p>
        </div>

        {/* Overall Risk Score */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Overall Risk Assessment
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={calculateOverallRisk}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-3">
              <div className={`text-6xl font-bold ${riskLevel.color}`}>
                {loading ? "--" : Math.round(riskScore)}%
              </div>
              <div className={`px-4 py-2 rounded-full ${riskLevel.bgColor}`}>
                <span className={`text-sm font-medium ${riskLevel.color}`}>
                  {riskLevel.level}
                </span>
              </div>
              <Progress value={riskScore} className="h-2" />
            </div>
            
            {!loading && (
              <div className="mt-4 p-3 rounded-lg bg-muted/20">
                <p className="text-sm text-foreground/80 text-center">
                  Based on your recent health data and patterns
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Metrics Breakdown */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthMetrics.map((metric, index) => (
                <div 
                  key={metric.category}
                  className="space-y-2"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                        <metric.icon className={`w-4 h-4 ${metric.color}`} />
                      </div>
                      <span className="text-sm font-medium">{metric.category}</span>
                    </div>
                    <span className={`text-sm font-medium ${metric.color}`}>
                      {metric.status}
                    </span>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                  <p className="text-xs text-muted-foreground ml-10">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="glass animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/20"
                >
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/90">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comprehensive AI Insights */}
        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <AgentInsights 
            category="Comprehensive Analysis"
            insights={[
              "Your pain levels correlate with sleep quality - focus on sleep hygiene",
              "Nutrition choices are supporting overall wellness",
              "Mental health stability is a protective factor",
              "Consider scheduling a wellness check-up in 3 months"
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RiskPage;