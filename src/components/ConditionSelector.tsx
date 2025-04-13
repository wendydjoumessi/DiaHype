
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Heart, Weight, CheckCircle } from "lucide-react";
import { HealthCondition } from "@/pages/Index";
import { cn } from "@/lib/utils";

interface ConditionSelectorProps {
  selectedConditions: HealthCondition[];
  onConditionChange: (conditions: HealthCondition[]) => void;
}

export function ConditionSelector({ 
  selectedConditions, 
  onConditionChange 
}: ConditionSelectorProps) {
  const toggleCondition = (condition: HealthCondition) => {
    if (selectedConditions.includes(condition)) {
      onConditionChange(selectedConditions.filter(c => c !== condition));
    } else {
      onConditionChange([...selectedConditions, condition]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Your Conditions</CardTitle>
        <CardDescription>
          Select the health conditions you want to monitor with DiaHype
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className={cn(
              "h-auto py-4 px-6 flex flex-col items-center justify-center text-center border-2",
              selectedConditions.includes("diabetes") 
                ? "border-health-primary bg-health-light text-health-primary" 
                : "border-gray-200"
            )}
            onClick={() => toggleCondition("diabetes")}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-2">
              <Droplet className={cn(
                "h-6 w-6",
                selectedConditions.includes("diabetes") ? "text-health-primary" : "text-gray-400"
              )} />
              {selectedConditions.includes("diabetes") && (
                <CheckCircle className="h-4 w-4 text-health-primary absolute -right-1 -top-1" />
              )}
            </div>
            <span className="font-medium">Diabetes</span>
            <span className="text-xs text-muted-foreground mt-1">
              Monitor blood glucose and insulin management
            </span>
          </Button>

          <Button
            variant="outline"
            className={cn(
              "h-auto py-4 px-6 flex flex-col items-center justify-center text-center border-2",
              selectedConditions.includes("hypertension") 
                ? "border-health-primary bg-health-light text-health-primary" 
                : "border-gray-200"
            )}
            onClick={() => toggleCondition("hypertension")}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-2">
              <Heart className={cn(
                "h-6 w-6",
                selectedConditions.includes("hypertension") ? "text-health-primary" : "text-gray-400"
              )} />
              {selectedConditions.includes("hypertension") && (
                <CheckCircle className="h-4 w-4 text-health-primary absolute -right-1 -top-1" />
              )}
            </div>
            <span className="font-medium">Hypertension</span>
            <span className="text-xs text-muted-foreground mt-1">
              Track blood pressure and heart health
            </span>
          </Button>

          <Button
            variant="outline"
            className={cn(
              "h-auto py-4 px-6 flex flex-col items-center justify-center text-center border-2",
              selectedConditions.includes("obesity") 
                ? "border-health-primary bg-health-light text-health-primary" 
                : "border-gray-200"
            )}
            onClick={() => toggleCondition("obesity")}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-2">
              <Weight className={cn(
                "h-6 w-6",
                selectedConditions.includes("obesity") ? "text-health-primary" : "text-gray-400"
              )} />
              {selectedConditions.includes("obesity") && (
                <CheckCircle className="h-4 w-4 text-health-primary absolute -right-1 -top-1" />
              )}
            </div>
            <span className="font-medium">Obesity</span>
            <span className="text-xs text-muted-foreground mt-1">
              Manage weight, BMI, and nutrition
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
