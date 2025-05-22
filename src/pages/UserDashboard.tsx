import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Activity, Calendar, MessagesSquare, Pill, Info, Droplet, 
  ArrowUp, ArrowDown, Heart, Weight, Brain, CheckCircle, AlertTriangle,
  Edit, TrendingUp, Dumbbell, Apple, Salad, Drumstick
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useHealthConditions } from "@/hooks/useHealthConditions";
import { useLatestMeasurements } from "@/hooks/useLatestMeasurements";
import { useRegionBasedRecommendations } from "@/hooks/useRegionBasedRecommendations";
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
import { HealthCondition as HealthConditionType } from "@/types/healthTypes";
import { WeightChart } from "@/components/WeightChart";
import { BloodPressureChart } from "@/components/BloodPressureChart";
import { HealthTipsCard } from "@/components/HealthTipsCard";

export type ConditionName = "diabetes";

const UserDashboard = () => {
 
  const { user, profile } = useAuth();
  const { data: healthConditions, isLoading: isLoadingConditions } = useHealthConditions();
  const { 
    bloodSugar, 
    bloodPressure, 
    weight, 
    bloodSugarHistory, 
    bloodPressureHistory, 
    weightHistory,
    isLoading: isLoadingMeasurements 
  } = useLatestMeasurements();
  
  const { 
    dietRecommendations, 
    exerciseRecommendations, 
    isLoading: isLoadingRecommendations 
  } = useRegionBasedRecommendations();
  
  const navigate = useNavigate();
  
  const [bloodSugarDialogOpen, setBloodSugarDialogOpen] = useState(false);
  const [bloodPressureDialogOpen, setBloodPressureDialogOpen] = useState(false);
  const [weightDialogOpen, setWeightDialogOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<ConditionName | null>(null);



  const actualHealthConditions = healthConditions || [];
  
  const selectedConditions = actualHealthConditions.map(c => 
    c.condition_name as ConditionName
  ) || [];

  // Provide fallbacks for health data
  const currentBloodSugar = bloodSugar || [];
  
  const currentBloodPressure = bloodPressure || [];
  
  const currentWeight = weight || [];

  const mockHealthConditionsForComponents: HealthConditionType[] = selectedConditions.map(condition => ({
    id: condition,
    name: condition.charAt(0).toUpperCase() + condition.slice(1),
    status: 'active',
    diagnosisDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    severity: 'moderate',
    description: `${condition.charAt(0).toUpperCase() + condition.slice(1)} management`
  }));

  const showLoading = false;

  if (showLoading && (!user || !profile)) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Please sign in to view your dashboard</p>
        </div>
      </AppLayout>
    );
  }

  if (showLoading && (isLoadingConditions || isLoadingMeasurements || isLoadingRecommendations)) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading your health data...</p>
        </div>
      </AppLayout>
    );
  }

  const getHealthInsights = () => {
    const insights = [];

    if (currentBloodSugar) {
      const level = currentBloodSugar.glucose_level;
      if (level > 160) {
        insights.push({
          title: "High Blood Sugar",
          description: "Your blood sugar is above the recommended range. Consider consulting your healthcare provider.",
          severity: "critical",
          trend: "up",
          metric: `${level} ${currentBloodSugar.unit}`,
          icon: <Droplet className="h-4 w-4" />
        });
      } else if (level < 70) {
        insights.push({
          title: "Low Blood Sugar",
          description: "Your blood sugar is below the normal range. Consider having a snack.",
          severity: "warning",
          trend: "down",
          metric: `${level} ${currentBloodSugar.unit}`,
          icon: <Droplet className="h-4 w-4" />
        });
      } else {
        insights.push({
          title: "Normal Blood Sugar",
          description: "Your blood sugar is within the target range.",
          severity: "positive",
          trend: "stable",
          metric: `${level} ${currentBloodSugar.unit}`,
          icon: <Droplet className="h-4 w-4" />
        });
      }
    }

    if (currentBloodPressure) {
      const { systolic, diastolic } = currentBloodPressure;
      if (systolic >= 140 || diastolic >= 90) {
        insights.push({
          title: "High Blood Pressure",
          description: "Your blood pressure is elevated. Monitor regularly and consult your doctor.",
          severity: "critical",
          trend: "up",
          metric: `${systolic}/${diastolic} mmHg`,
          icon: <Heart className="h-4 w-4" />
        });
      } else if (systolic <= 90 || diastolic <= 60) {
        insights.push({
          title: "Low Blood Pressure",
          description: "Your blood pressure is lower than normal. Monitor for symptoms.",
          severity: "warning",
          trend: "down",
          metric: `${systolic}/${diastolic} mmHg`,
          icon: <Heart className="h-4 w-4" />
        });
      } else {
        insights.push({
          title: "Normal Blood Pressure",
          description: "Your blood pressure is within the normal range.",
          severity: "positive",
          trend: "stable",
          metric: `${systolic}/${diastolic} mmHg`,
          icon: <Heart className="h-4 w-4" />
        });
      }
    }

    if (currentWeight) {
      const heightInMeters = 1.75; // This should ideally come from user profile
      const weightInKg = currentWeight.unit === 'kg' ? currentWeight.weight : currentWeight.weight * 0.453592;
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      
      if (bmi >= 30) {
        insights.push({
          title: "Obesity Concern",
          description: "Your BMI indicates obesity. Consider a weight management plan with your doctor.",
          severity: "critical",
          trend: "up",
          metric: `${currentWeight.weight} ${currentWeight.unit} (BMI: ${bmi.toFixed(1)})`,
          icon: <Weight className="h-4 w-4" />
        });
      } else if (bmi >= 25) {
        insights.push({
          title: "Overweight",
          description: "Your BMI indicates you're overweight. Regular exercise and a balanced diet can help.",
          severity: "warning",
          trend: "up",
          metric: `${currentWeight.weight} ${currentWeight.unit} (BMI: ${bmi.toFixed(1)})`,
          icon: <Weight className="h-4 w-4" />
        });
      } else if (bmi < 18.5) {
        insights.push({
          title: "Underweight",
          description: "Your BMI indicates you're underweight. Consult with a nutritionist.",
          severity: "warning",
          trend: "down",
          metric: `${currentWeight.weight} ${currentWeight.unit} (BMI: ${bmi.toFixed(1)})`,
          icon: <Weight className="h-4 w-4" />
        });
      } else {
        insights.push({
          title: "Healthy Weight",
          description: "Your BMI is within the healthy range.",
          severity: "positive",
          trend: "stable",
          metric: `${currentWeight.weight} ${currentWeight.unit} (BMI: ${bmi.toFixed(1)})`,
          icon: <Weight className="h-4 w-4" />
        });
      }
    }

    return insights;
  };

  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  
  const handleExerciseClick = (exercise: any) => {
    setSelectedExercise(exercise);
  };
  
  const closeExerciseDetails = () => {
    setSelectedExercise(null);
  };
  
  const ExerciseDetailsComponent = ({ exercise }: { exercise: any }) => {
    if (!exercise) return null;
    
    const Icon = () => {
      if (exercise.icon === "Activity") return <Activity className="h-6 w-6 text-blue-500" />;
      if (exercise.icon === "Dumbbell") return <Dumbbell className="h-6 w-6 text-blue-500" />;
      return <Activity className="h-6 w-6 text-blue-500" />;
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Icon />
                <h2 className="text-2xl font-bold text-gray-900 ml-2">{exercise.title}</h2>
              </div>
              <button 
                onClick={closeExerciseDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Details</h3>
                <p className="text-gray-700">{exercise.details}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recommended</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <span className="text-sm text-gray-500">Duration</span>
                    <p className="font-medium">{exercise.duration}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <span className="text-sm text-gray-500">Frequency</span>
                    <p className="font-medium">{exercise.frequency}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md col-span-2">
                    <span className="text-sm text-gray-500">Intensity</span>
                    <p className="font-medium capitalize">{exercise.intensity}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Benefits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {exercise.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="text-gray-700">{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2">
                <a 
                  href={exercise.videoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Watch Tutorial Video
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const userFirstName = profile?.first_name;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-health-dark">
              Welcome back, {userFirstName}
            </h1>
            <p className="text-muted-foreground">Here's your personalized health summary</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              className="bg-health-accent hover:bg-health-primary"
              onClick={() => navigate('/onboarding')}
            >
              <Edit className="mr-2 h-4 w-4" />
              Update Health Data
            </Button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedConditions.includes("diabetes") && (
            <Card className={cn(
              currentBloodSugar.glucose_level > 160 ? "border-red-300 bg-red-50" : 
              currentBloodSugar.glucose_level < 70 ? "border-yellow-300 bg-yellow-50" : 
              "border-green-300 bg-green-50"
            )}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Latest Blood Sugar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplet className={cn(
                      "mr-2 h-5 w-5",
                      currentBloodSugar.glucose_level > 160 ? "text-red-500" : 
                      currentBloodSugar.glucose_level < 70 ? "text-yellow-500" : 
                      "text-green-500"
                    )} />
                    <span className="text-2xl font-bold">{currentBloodSugar.glucose_level}</span>
                    <span className="ml-1 text-sm">{currentBloodSugar.unit}</span>
                  </div>
                  <div>
                    {currentBloodSugar.glucose_level > 160 && <ArrowUp className="h-5 w-5 text-red-500" />}
                    {currentBloodSugar.glucose_level < 70 && <ArrowDown className="h-5 w-5 text-yellow-500" />}
                    {(currentBloodSugar.glucose_level >= 70 && currentBloodSugar.glucose_level <= 160) && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last checked: {new Date(currentBloodSugar.measured_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          )}
          
          {selectedConditions.includes("hypertension") && (
            <Card className={cn(
              (currentBloodPressure.systolic >= 140 || currentBloodPressure.diastolic >= 90) ? "border-red-300 bg-red-50" :
              (currentBloodPressure.systolic <= 90 || currentBloodPressure.diastolic <= 60) ? "border-yellow-300 bg-yellow-50" :
              "border-green-300 bg-green-50"
            )}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Blood Pressure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className={cn(
                      "mr-2 h-5 w-5",
                      (currentBloodPressure.systolic >= 140 || currentBloodPressure.diastolic >= 90) ? "text-red-500" :
                      (currentBloodPressure.systolic <= 90 || currentBloodPressure.diastolic <= 60) ? "text-yellow-500" :
                      "text-green-500"
                    )} />
                    <span className="text-2xl font-bold">
                      {currentBloodPressure.systolic}/{currentBloodPressure.diastolic}
                    </span>
                    <span className="ml-1 text-sm">mmHg</span>
                  </div>
                  <div>
                    {(currentBloodPressure.systolic >= 140 || currentBloodPressure.diastolic >= 90) && <ArrowUp className="h-5 w-5 text-red-500" />}
                    {(currentBloodPressure.systolic <= 90 || currentBloodPressure.diastolic <= 60) && <ArrowDown className="h-5 w-5 text-yellow-500" />}
                    {(currentBloodPressure.systolic > 90 && currentBloodPressure.systolic < 140 && currentBloodPressure.diastolic > 60 && currentBloodPressure.diastolic < 90) && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last checked: {new Date(currentBloodPressure.measured_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          )}
          
          {selectedConditions.includes("obesity") && (
            <Card className={cn(
              currentWeight.weight > 100 ? "border-red-300 bg-red-50" :
              currentWeight.weight > 85 ? "border-yellow-300 bg-yellow-50" :
              "border-green-300 bg-green-50"
            )}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Weight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Weight className={cn(
                      "mr-2 h-5 w-5",
                      currentWeight.weight > 100 ? "text-red-500" :
                      currentWeight.weight > 85 ? "text-yellow-500" :
                      "text-green-500"
                    )} />
                    <span className="text-2xl font-bold">{currentWeight.weight}</span>
                    <span className="ml-1 text-sm">{currentWeight.unit}</span>
                  </div>
                  <div>
                    {currentWeight.weight > 100 && <ArrowUp className="h-5 w-5 text-red-500" />}
                    {currentWeight.weight > 85 && currentWeight.weight <= 100 && <TrendingUp className="h-5 w-5 text-yellow-500" />}
                    {currentWeight.weight <= 85 && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last checked: {new Date(currentWeight.timestamp).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <ConditionSelector 
          conditions={["diabetes", "hypertension", "obesity"]} 
          selectedCondition={selectedConditions[0] || null}
          onSelect={(condition) => setSelectedCondition(condition as ConditionName)}
        />
        
        <HealthSummary conditions={actualHealthConditions || []} />

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-health-primary" />
                Health Insights
              </CardTitle>
              <CardDescription>
                Personalized insights based on your health data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getHealthInsights().map((insight, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      insight.severity === "critical" && "bg-red-50 border-red-200",
                      insight.severity === "warning" && "bg-yellow-50 border-yellow-200",
                      insight.severity === "positive" && "bg-green-50 border-green-200",
                      insight.severity === "info" && "bg-blue-50 border-blue-200"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={cn(
                          "p-1.5 rounded-full",
                          insight.severity === "critical" && "bg-red-100",
                          insight.severity === "warning" && "bg-yellow-100",
                          insight.severity === "positive" && "bg-green-100",
                          insight.severity === "info" && "bg-blue-100"
                        )}>
                          {insight.icon}
                        </span>
                        <h3 className="font-medium">{insight.title}</h3>
                      </div>
                      <span className="text-sm font-medium">{insight.metric}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <div className="flex items-center mt-2">
                      {insight.trend === "up" && <ArrowUp className="h-4 w-4 text-red-500" />}
                      {insight.trend === "down" && <ArrowDown className="h-4 w-4 text-yellow-500" />}
                      {insight.trend === "stable" && <Activity className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Apple className="mr-2 h-5 w-5 text-health-primary" />
              Dietary Recommendations
            </CardTitle>
            <CardDescription>
              Nutrition guidance based on your health conditions and region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dietRecommendations.map((nutrition, index) => {
                // Determine icon component based on string identifier
                const NutritionIcon = () => {
                  if (nutrition.icon === "Salad") return <Salad className="h-5 w-5 text-green-700" />;
                  if (nutrition.icon === "Apple") return <Apple className="h-5 w-5 text-green-700" />;
                  if (nutrition.icon === "Heart") return <Heart className="h-5 w-5 text-red-700" />;
                  if (nutrition.icon === "Fish") return <Drumstick className="h-5 w-5 text-green-700" />;
                  return <Apple className="h-5 w-5 text-green-700" />;
                };
                
                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-green-200 bg-green-50"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="p-1.5 rounded-full bg-green-100">
                        <NutritionIcon />
                      </span>
                      <div>
                        <h3 className="font-medium">{nutrition.title}</h3>
                        <p className="text-xs text-muted-foreground">{nutrition.category}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{nutrition.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-medium uppercase text-green-700">Recommended Foods</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {nutrition.foods.map((food, i) => (
                            <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium uppercase text-red-700">Foods to Limit</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {nutrition.avoid.map((food, i) => (
                            <span key={i} className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-1">
                        <h4 className="text-xs font-medium uppercase text-gray-700">Meal Planning Tip</h4>
                        <p className="text-sm mt-1 text-gray-600">{nutrition.mealPlan}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="mr-2 h-5 w-5 text-health-primary" />
              Recommended Physical Activities
            </CardTitle>
            <CardDescription>
              Tailored exercises based on your health conditions and region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exerciseRecommendations.map((exercise, index) => {
                // Determine icon component based on string identifier
                const ExerciseIcon = () => {
                  if (exercise.icon === "Activity") return <Activity className="h-5 w-5" />;
                  if (exercise.icon === "Dumbbell") return <Dumbbell className="h-5 w-5" />;
                  return <Activity className="h-5 w-5" />;
                };
                
                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg border bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                    onClick={() => handleExerciseClick(exercise)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="p-1.5 rounded-full bg-blue-100">
                        <ExerciseIcon />
                      </span>
                      <h3 className="font-medium">{exercise.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        exercise.intensity === "light" && "bg-green-100 text-green-800",
                        exercise.intensity === "moderate" && "bg-blue-100 text-blue-800",
                        exercise.intensity === "high" && "bg-amber-100 text-amber-800"
                      )}>
                        {exercise.intensity.charAt(0).toUpperCase() + exercise.intensity.slice(1)} intensity
                      </span>
                      <span className="text-xs text-blue-600">Click for details</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          {selectedConditions.includes("diabetes") && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blood Glucose Trends</CardTitle>
                    <CardDescription>Your blood sugar readings over time</CardDescription>
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

          {selectedConditions.includes("hypertension") && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blood Pressure Trends</CardTitle>
                    <CardDescription>Your blood pressure readings over time</CardDescription>
                  </div>
                  <Link to="/blood-pressure">
                    <Button variant="outline" size="sm" className="h-8">
                      <Info className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <BloodPressureChart />
              </CardContent>
            </Card>
          )}

          {selectedConditions.includes("obesity") && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Weight Trends</CardTitle>
                    <CardDescription>Your weight measurements over time</CardDescription>
                  </div>
                  <Link to="/weight">
                    <Button variant="outline" size="sm" className="h-8">
                      <Info className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <WeightChart />
              </CardContent>
            </Card>
          )}
        </div>

        <RiskAssessment conditions={actualHealthConditions || []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="mr-2 h-5 w-5" />
                Medication Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MedicationReminders 
                conditions={mockHealthConditionsForComponents} 
                medications={[]}
                onMarkTaken={() => {}}
              />
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
        
        {selectedExercise && <ExerciseDetailsComponent exercise={selectedExercise} />}
      </div>
    </AppLayout>
  );
};

export default UserDashboard;
