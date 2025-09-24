import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";

interface AgentInsightsProps {
  category: string;
  insights?: string[];
  onRefresh?: () => void;
}

const AgentInsights = ({ category, insights, onRefresh }: AgentInsightsProps) => {
  const defaultInsights = [
    "Your data is being analyzed...",
    "AI insights will appear here as you log more data",
    "Personalized recommendations coming soon"
  ];

  const displayInsights = insights || defaultInsights;

  return (
    <Card className="glass mt-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-background" />
            </div>
            AI Insights - {category}
          </CardTitle>
          {onRefresh && (
            <Button variant="ghost" size="icon" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayInsights.map((insight, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted/30 border border-border/20"
            >
              <p className="text-sm text-foreground/90">{insight}</p>
            </div>
          ))}
        </div>
        {insights && insights.length > 0 && (
          <div className="mt-4 text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentInsights;