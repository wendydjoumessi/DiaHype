
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Brain, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HealthCondition } from "@/pages/UserDashboard";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface RiskAssessmentProps {
  selectedConditions: HealthCondition[];
}

export function RiskAssessment({ selectedConditions }: RiskAssessmentProps) {
  // Skip if no conditions selected
  if (!selectedConditions) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          AI-Powered Risk Assessment
        </CardTitle>
        <CardDescription>
          Personalized insights based on your health data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {selectedConditions.includes("diabetes") && (
            <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex-shrink-0 mr-4">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Blood Sugar Pattern Alert</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  We've noticed your fasting glucose levels tend to spike on weekends. Consider maintaining consistent meal times and carb intake.
                </p>
                <Button variant="link" className="p-0 h-auto text-amber-600 mt-2 text-sm">
                  View detailed analysis
                </Button>
              </div>
            </div>
          )}

          {selectedConditions.includes("hypertension") && (
            <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 mr-4">
                <Shield className="h-6 w-6 text-health-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Blood Pressure Improvement</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your blood pressure readings show a positive trend when you log regular exercise. Continue your current routine for optimal results.
                </p>
                <Button variant="link" className="p-0 h-auto text-health-primary mt-2 text-sm">
                  View exercise impact analysis
                </Button>
              </div>
            </div>
          )}

          {selectedConditions.includes("obesity") && (
            <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 mr-4">
                <Info className="h-6 w-6 text-health-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Weight Management Insight</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your progress, adjusting your protein intake may help accelerate your weight loss goals while maintaining muscle mass.
                </p>
                <Button variant="link" className="p-0 h-auto text-health-primary mt-2 text-sm">
                  <Link to="/weight-management">Get personalized nutrition tips</Link>
                </Button>
              </div>
            </div>
          )}
          
          {/* New Symptom Checker Prompt */}
          <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex-shrink-0 mr-4">
              <Info className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Experiencing New Symptoms?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Use our AI-powered symptom checker to get preliminary insights and recommendations tailored to your health profile.
              </p>
              <Button variant="link" className="p-0 h-auto text-green-600 mt-2 text-sm">
                <Link to="/symptom-checker">Check your symptoms now</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
