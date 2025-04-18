import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, 
  Droplet, 
  Weight as WeightIcon, 
  PlusCircle
} from "lucide-react";

interface QuickHealthEntryCardProps {
  onLogBloodSugar: () => void;
  onLogBloodPressure: () => void;
  onLogWeight: () => void;
  conditions: string[];
}

export function QuickHealthEntryCard({ 
  onLogBloodSugar, 
  onLogBloodPressure, 
  onLogWeight,
  conditions 
}: QuickHealthEntryCardProps) {
  const hasCondition = (condition: string) => 
    conditions.includes(condition.toLowerCase());

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <PlusCircle className="mr-2 h-5 w-5 text-health-primary" />
          <CardTitle>Log Health Data</CardTitle>
        </div>
        <CardDescription>
          Keep track of your health by logging your data regularly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hasCondition("diabetes") && (
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 border-health-primary/30 hover:bg-health-primary/10"
              onClick={onLogBloodSugar}
            >
              <Droplet className="h-8 w-8 mb-2 text-health-primary" />
              <span className="font-medium">Blood Sugar</span>
              <span className="text-xs text-muted-foreground mt-1">
                Track glucose levels
              </span>
            </Button>
          )}

          {hasCondition("hypertension") && (
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 border-health-primary/30 hover:bg-health-primary/10"
              onClick={onLogBloodPressure}
            >
              <HeartPulse className="h-8 w-8 mb-2 text-health-primary" />
              <span className="font-medium">Blood Pressure</span>
              <span className="text-xs text-muted-foreground mt-1">
                Monitor your BP
              </span>
            </Button>
          )}

          {hasCondition("obesity") && (
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 border-health-primary/30 hover:bg-health-primary/10"
              onClick={onLogWeight}
            >
              <WeightIcon className="h-8 w-8 mb-2 text-health-primary" />
              <span className="font-medium">Weight</span>
              <span className="text-xs text-muted-foreground mt-1">
                Keep track of progress
              </span>
            </Button>
          )}

          {/* Always show at least one button if no conditions match */}
          {!hasCondition("diabetes") && 
           !hasCondition("hypertension") && 
           !hasCondition("obesity") && (
            <>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-4 border-health-primary/30 hover:bg-health-primary/10"
                onClick={onLogBloodSugar}
              >
                <Droplet className="h-8 w-8 mb-2 text-health-primary" />
                <span className="font-medium">Blood Sugar</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Track glucose levels
                </span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-4 border-health-primary/30 hover:bg-health-primary/10"
                onClick={onLogBloodPressure}
              >
                <HeartPulse className="h-8 w-8 mb-2 text-health-primary" />
                <span className="font-medium">Blood Pressure</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Monitor your BP
                </span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-4 border-health-primary/30 hover:bg-health-primary/10"
                onClick={onLogWeight}
              >
                <WeightIcon className="h-8 w-8 mb-2 text-health-primary" />
                <span className="font-medium">Weight</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Keep track of progress
                </span>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
