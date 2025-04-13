
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Activity, Calendar, MessagesSquare, Pill, Info, Droplet, 
  ArrowUp, ArrowDown, Heart, Weight, Brain, CheckCircle, AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { GlucoseChart } from "@/components/GlucoseChart";
import { UpcomingAppointments } from "@/components/UpcomingAppointments";
import { MedicationReminders } from "@/components/MedicationReminders";
import { DoctorMessages } from "@/components/DoctorMessages";
import { ConditionSelector } from "@/components/ConditionSelector";
import { HealthSummary } from "@/components/HealthSummary";
import { RiskAssessment } from "@/components/RiskAssessment";
import { LogBloodSugarDialog } from "@/components/LogBloodSugarDialog";
import { LogBloodPressureDialog } from "@/components/LogBloodPressureDialog";
import { LogWeightDialog } from "@/components/LogWeightDialog";
import { cn } from "@/lib/utils";

// Define health conditions for the user
export type HealthCondition = "diabetes" | "hypertension" | "obesity" | "none";

const Index = () => {
  // State for selected health conditions
  const [selectedConditions, setSelectedConditions] = useState<HealthCondition[]>([]);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  
  // State for dialog controls
  const [bloodSugarDialogOpen, setBloodSugarDialogOpen] = useState(false);
  const [bloodPressureDialogOpen, setBloodPressureDialogOpen] = useState(false);
  const [weightDialogOpen, setWeightDialogOpen] = useState(false);
  
  // Check if user is onboarded (this would normally come from an API/localStorage)
  useEffect(() => {
    // Simulating checking if user has completed onboarding
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    setIsOnboarded(onboardingCompleted === "true");
  }, []);

  // If not onboarded, show onboarding prompt
  if (!isOnboarded) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-health-primary flex items-center justify-center mx-auto mb-6">
              <Info className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-health-dark mb-4">Welcome to DiaHype</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your personalized health management system for chronic conditions like diabetes, 
              hypertension, and obesity. Let's start by setting up your health profile.
            </p>
            <Link to="/onboarding">
              <Button size="lg" className="bg-health-primary hover:bg-health-accent">
                Start Onboarding
              </Button>
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-health-dark">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">Here's your personalized health summary</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedConditions.includes("diabetes") && (
              <Button 
                className="bg-health-primary hover:bg-health-accent"
                onClick={() => setBloodSugarDialogOpen(true)}
              >
                <Droplet className="mr-2 h-4 w-4" />
                Log Blood Sugar
              </Button>
            )}
            {selectedConditions.includes("hypertension") && (
              <Button 
                className="bg-health-primary hover:bg-health-accent"
                onClick={() => setBloodPressureDialogOpen(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                Log Blood Pressure
              </Button>
            )}
            {selectedConditions.includes("obesity") && (
              <Button 
                className="bg-health-primary hover:bg-health-accent"
                onClick={() => setWeightDialogOpen(true)}
              >
                <Weight className="mr-2 h-4 w-4" />
                Log Weight
              </Button>
            )}
          </div>
        </div>

        {/* Condition Selector */}
        <ConditionSelector 
          selectedConditions={selectedConditions}
          onConditionChange={setSelectedConditions}
        />

        {/* Health Summary */}
        <HealthSummary selectedConditions={selectedConditions} />

        {/* Quick stats - conditionally shown based on selected conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedConditions.includes("diabetes") && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Latest Blood Sugar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplet className="mr-2 h-5 w-5 text-health-primary" />
                    <span className="text-2xl font-bold">120</span>
                    <span className="ml-1 text-sm">mg/dL</span>
                  </div>
                  <div className="flex items-center text-health-success">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    <span className="text-sm font-medium">12%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Last checked 2 hours ago</p>
              </CardContent>
            </Card>
          )}
          
          {selectedConditions.includes("hypertension") && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Blood Pressure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-health-primary" />
                    <span className="text-2xl font-bold">128/82</span>
                    <span className="ml-1 text-sm">mmHg</span>
                  </div>
                  <div className="flex items-center text-health-success">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    <span className="text-sm font-medium">8%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Last checked today</p>
              </CardContent>
            </Card>
          )}
          
          {selectedConditions.includes("obesity") && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Weight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Weight className="mr-2 h-5 w-5 text-health-primary" />
                    <span className="text-2xl font-bold">82.5</span>
                    <span className="ml-1 text-sm">kg</span>
                  </div>
                  <div className="flex items-center text-health-success">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    <span className="text-sm font-medium">3%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">BMI: 28.4 (Overweight)</p>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Medication Adherence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Pill className="mr-2 h-5 w-5 text-health-primary" />
                  <span className="text-2xl font-bold">92%</span>
                </div>
                <div className="flex items-center text-health-success">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">3%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Risk Assessment */}
        <RiskAssessment selectedConditions={selectedConditions} />

        {/* Condition-specific charts */}
        {selectedConditions.includes("diabetes") && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blood Glucose Trends</CardTitle>
                  <CardDescription>Your blood sugar readings for the past 7 days</CardDescription>
                </div>
                <Link to="/glucose">
                  <Button variant="outline" size="sm" className="h-8">
                    <Info className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <GlucoseChart />
            </CardContent>
          </Card>
        )}

        {/* 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="mr-2 h-5 w-5" />
                Medication Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MedicationReminders conditions={selectedConditions} />
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UpcomingAppointments />
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessagesSquare className="mr-2 h-5 w-5" />
                Messages from Your Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DoctorMessages />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog components */}
      <LogBloodSugarDialog 
        open={bloodSugarDialogOpen} 
        onOpenChange={setBloodSugarDialogOpen} 
      />
      <LogBloodPressureDialog 
        open={bloodPressureDialogOpen} 
        onOpenChange={setBloodPressureDialogOpen} 
      />
      <LogWeightDialog 
        open={weightDialogOpen} 
        onOpenChange={setWeightDialogOpen} 
      />
    </AppLayout>
  );
};

export default Index;
