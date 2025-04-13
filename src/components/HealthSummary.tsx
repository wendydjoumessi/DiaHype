
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplet, Heart, Weight, Lightbulb, Trophy } from "lucide-react";
import { HealthCondition } from "@/pages/Index";

interface HealthSummaryProps {
  selectedConditions: HealthCondition[];
}

export function HealthSummary({ selectedConditions }: HealthSummaryProps) {
  // If no conditions are selected, show a different message
  if (selectedConditions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Health Summary</CardTitle>
          <CardDescription>
            Select a health condition above to see your personalized summary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No health conditions selected. Choose one or more conditions above to see your personalized health summary.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Health Summary</CardTitle>
        <CardDescription>
          Overview of your current health status and progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Health Progress</h3>
            
            {selectedConditions.includes("diabetes") && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Droplet className="h-4 w-4 text-health-primary mr-2" />
                    <span className="text-sm font-medium">Glucose Control</span>
                  </div>
                  <span className="text-sm font-medium">Good</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Your average blood glucose is within target range 75% of the time
                </p>
              </div>
            )}
            
            {selectedConditions.includes("hypertension") && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-health-primary mr-2" />
                    <span className="text-sm font-medium">Blood Pressure</span>
                  </div>
                  <span className="text-sm font-medium">Improving</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Your blood pressure readings have improved by 10% in the last month
                </p>
              </div>
            )}
            
            {selectedConditions.includes("obesity") && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Weight className="h-4 w-4 text-health-primary mr-2" />
                    <span className="text-sm font-medium">Weight Management</span>
                  </div>
                  <span className="text-sm font-medium">On Track</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  You've lost 3.2 kg since starting your weight management plan
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Recent Achievements</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Trophy className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">7-Day Medication Streak</p>
                  <p className="text-xs text-muted-foreground">
                    You've taken all your medications on time for a week!
                  </p>
                </div>
              </div>
              
              {selectedConditions.includes("diabetes") && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Droplet className="h-4 w-4 text-health-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stable Glucose Week</p>
                    <p className="text-xs text-muted-foreground">
                      Your glucose readings stayed in range for 5 consecutive days
                    </p>
                  </div>
                </div>
              )}
              
              {selectedConditions.includes("obesity") && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Weight className="h-4 w-4 text-health-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Lifestyle</p>
                    <p className="text-xs text-muted-foreground">
                      You've met your daily step goal 4 days in a row
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
