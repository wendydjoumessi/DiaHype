import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, ChevronUp, ChevronDown, Equal } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthInsight {
  title: string;
  description: string;
  trend?: "up" | "down" | "stable";
  severity?: "info" | "warning" | "critical" | "positive";
}

interface HealthInsightsCardProps {
  insights: HealthInsight[];
}

export function HealthInsightsCard({ insights }: HealthInsightsCardProps) {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "warning":
        return "text-amber-500";
      case "critical":
        return "text-red-500";
      case "positive":
        return "text-green-500";
      case "info":
      default:
        return "text-blue-500";
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <ChevronUp className="h-4 w-4" />;
      case "down":
        return <ChevronDown className="h-4 w-4" />;
      case "stable":
        return <Equal className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-health-primary" />
          <CardTitle>Health Insights</CardTitle>
        </div>
        <CardDescription>
          Personalized insights based on your health data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">
            Log more health data to receive personalized insights.
          </p>
        ) : (
          insights.map((insight, index) => (
            <div 
              key={index} 
              className="p-3 border rounded-md bg-slate-50"
            >
              <div className="flex justify-between items-start">
                <h4 className={cn("font-medium text-sm", getSeverityColor(insight.severity))}>
                  {insight.title}
                </h4>
                {insight.trend && (
                  <div className={cn("flex items-center", getSeverityColor(insight.severity))}>
                    <TrendingUp className="mr-1 h-4 w-4" />
                    {getTrendIcon(insight.trend)}
                  </div>
                )}
              </div>
              <p className="text-sm mt-1 text-muted-foreground">
                {insight.description}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
