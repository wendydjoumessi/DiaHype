
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Activity, Salad, Apple, Droplet, Heart, Weight } from "lucide-react";
import { cn } from "@/lib/utils";

type HealthCondition = string;

interface HealthTip {
  title: string;
  description: string;
  category: string;
  icon?: React.ReactNode;
  actionSteps?: string[];
  urgency?: 'low' | 'medium' | 'high';
}

interface HealthTipsCardProps {
  conditions: HealthCondition[];
}

export function HealthTipsCard({ conditions }: HealthTipsCardProps) {
  // Generate relevant health tips based on user conditions
  const getHealthTips = (): HealthTip[] => {
    const tips: HealthTip[] = [];
    
    if (conditions.includes("diabetes")) {
      tips.push({
        title: "Monitor Blood Sugar Regularly",
        description: "Check your blood glucose levels as directed by your healthcare provider.",
        category: "diabetes",
        icon: <Droplet className="h-4 w-4" />,
        actionSteps: [
          "Check your blood sugar before meals and at bedtime",
          "Record readings in the app for better tracking",
          "Notify your doctor if readings are consistently outside target range"
        ],
        urgency: 'high'
      });
      tips.push({
        title: "Watch Carbohydrate Intake",
        description: "Keep track of carbs to help manage blood sugar levels throughout the day.",
        category: "diabetes",
        icon: <Apple className="h-4 w-4" />,
        actionSteps: [
          "Learn to count carbohydrates in your meals",
          "Distribute carbs evenly throughout the day",
          "Choose complex carbohydrates over simple sugars"
        ],
        urgency: 'medium'
      });
    }
    
    if (conditions.includes("hypertension")) {
      tips.push({
        title: "Limit Sodium Intake",
        description: "Reduce salt consumption to help control blood pressure.",
        category: "hypertension",
        icon: <Heart className="h-4 w-4" />,
        actionSteps: [
          "Aim for less than 2,300mg of sodium daily (about 1 teaspoon)",
          "Read food labels to identify hidden sodium",
          "Use herbs and spices instead of salt for flavoring"
        ],
        urgency: 'high'
      });
      tips.push({
        title: "Practice Stress Management",
        description: "Techniques like deep breathing and meditation can help lower blood pressure.",
        category: "hypertension",
        icon: <Activity className="h-4 w-4" />,
        actionSteps: [
          "Practice 10 minutes of deep breathing daily",
          "Try guided meditation using smartphone apps",
          "Schedule regular relaxation time in your daily routine"
        ],
        urgency: 'medium'
      });
    }
    
    if (conditions.includes("obesity")) {
      tips.push({
        title: "Focus on Portion Control",
        description: "Use smaller plates and be mindful of serving sizes.",
        category: "obesity",
        icon: <Salad className="h-4 w-4" />,
        actionSteps: [
          "Use measuring cups and a food scale initially to learn proper portions",
          "Follow the plate method: ½ vegetables, ¼ protein, ¼ whole grains",
          "Wait 20 minutes after eating before considering seconds"
        ],
        urgency: 'high'
      });
      tips.push({
        title: "Stay Hydrated",
        description: "Drinking water before meals can help reduce overall food intake.",
        category: "obesity",
        icon: <Droplet className="h-4 w-4" />,
        actionSteps: [
          "Drink 16oz of water 30 minutes before each meal",
          "Carry a reusable water bottle throughout the day",
          "Replace sugary drinks with water, unsweetened tea or sparkling water"
        ],
        urgency: 'medium'
      });
      tips.push({
        title: "Increase Daily Movement",
        description: "Find ways to incorporate more activity into your daily routine.",
        category: "obesity",
        icon: <Weight className="h-4 w-4" />,
        actionSteps: [
          "Take a 10-minute walk after each meal",
          "Use stairs instead of elevators when possible",
          "Set a timer to stand up and move for 2 minutes every hour"
        ],
        urgency: 'medium'
      });
    }
    
    // Add general health tips if no specific conditions or few tips
    if (tips.length < 2) {
      tips.push({
        title: "Prioritize Sleep",
        description: "Aim for 7-9 hours of quality sleep each night for overall health.",
        category: "general",
        icon: <Activity className="h-4 w-4" />,
        actionSteps: [
          "Establish a consistent sleep schedule, even on weekends",
          "Create a relaxing bedtime routine",
          "Limit screen time 1 hour before bed"
        ],
        urgency: 'medium'
      });
      tips.push({
        title: "Stay Physically Active",
        description: "Try to incorporate at least 30 minutes of moderate activity most days of the week.",
        category: "general",
        icon: <Activity className="h-4 w-4" />,
        actionSteps: [
          "Schedule exercise time in your calendar",
          "Find activities you enjoy to make exercise sustainable",
          "Break up exercise into smaller 10-minute sessions if needed"
        ],
        urgency: 'medium'
      });
    }
    
    return tips;
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "diabetes":
        return "text-blue-700 bg-blue-100";
      case "hypertension":
        return "text-red-700 bg-red-100";
      case "obesity":
        return "text-amber-700 bg-amber-100";
      default:
        return "text-green-700 bg-green-100";
    }
  };

  const getUrgencyBadge = (urgency: 'low' | 'medium' | 'high') => {
    const classes = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-amber-100 text-amber-800',
      high: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${classes[urgency]}`}>
        {urgency.charAt(0).toUpperCase() + urgency.slice(1)} priority
      </span>
    );
  };

  const tips = getHealthTips();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Tips</CardTitle>
        <CardDescription>
          Recommendations based on your health conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="border rounded-md p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-full flex-shrink-0",
                getCategoryColor(tip.category)
              )}>
                {tip.icon || <Activity className="h-4 w-4" />}
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{tip.title}</h3>
                  {tip.urgency && getUrgencyBadge(tip.urgency)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {tip.description}
                </p>
                
                {tip.actionSteps && (
                  <div className="mt-2 bg-white p-3 rounded border border-slate-200">
                    <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Action Steps</h4>
                    <ul className="space-y-1">
                      {tip.actionSteps.map((step, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="inline-block mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
