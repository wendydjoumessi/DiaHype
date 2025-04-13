import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  User, 
  Ruler, 
  Weight, 
  HeartPulse, 
  ActivitySquare, 
  Droplet, 
  BadgeCheck, 
  AlertTriangle,
  Info
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    bloodPressure: "",
    glucose: "",
    cholesterol: "",
    existingConditions: [] as string[],
    familyHistory: [] as string[],
    consentGiven: false
  });

  const totalSteps = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (condition: string) => {
    setFormData(prev => {
      const exists = prev.existingConditions.includes(condition);
      return {
        ...prev,
        existingConditions: exists 
          ? prev.existingConditions.filter(c => c !== condition)
          : [...prev.existingConditions, condition]
      };
    });
  };

  const handleFamilyHistoryChange = (condition: string) => {
    setFormData(prev => {
      const exists = prev.familyHistory.includes(condition);
      return {
        ...prev,
        familyHistory: exists
          ? prev.familyHistory.filter(c => c !== condition)
          : [...prev.familyHistory, condition]
      };
    });
  };

  const calculateBMI = () => {
    const heightM = parseFloat(formData.height) / 100; // convert cm to m
    const weightKg = parseFloat(formData.weight);
    
    if (heightM > 0 && weightKg > 0) {
      const bmi = weightKg / (heightM * heightM);
      return bmi.toFixed(1);
    }
    return "N/A";
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { text: "Normal", color: "text-green-500" };
    if (bmi < 30) return { text: "Overweight", color: "text-yellow-500" };
    return { text: "Obese", color: "text-red-500" };
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi !== "N/A" ? getBMICategory(parseFloat(bmi)) : { text: "N/A", color: "" };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setProgress(prev => prev + (100 / totalSteps));
    } 
    else {
      // Complete onboarding
      localStorage.setItem("onboardingCompleted", "true");
      navigate("/");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setProgress(prev => prev - (100 / totalSteps));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to DiaHype</h1>
          <p className="text-muted-foreground">
            Complete your health profile to get personalized care
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <Card className="w-full shadow-lg border-t-4 border-t-health-primary">
          {currentStep === 1 && (
            <>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 text-health-primary mr-2" />
                  <CardTitle>Personal Information</CardTitle>
                </div>
                <CardDescription>
                  Tell us a bit about yourself
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Enter your full name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      name="age" 
                      type="number" 
                      placeholder="Years" 
                      value={formData.age} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup 
                      value={formData.gender} 
                      onValueChange={(value) => setFormData({...formData, gender: value})}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Weight className="h-5 w-5 text-health-primary mr-2" />
                  <CardTitle>Physical Measurements</CardTitle>
                </div>
                <CardDescription>
                  Your physical measurements help us provide personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                      id="height" 
                      name="height" 
                      type="number" 
                      placeholder="Height in centimeters" 
                      value={formData.height} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      name="weight" 
                      type="number" 
                      placeholder="Weight in kilograms" 
                      value={formData.weight} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {bmi !== "N/A" && (
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Your BMI</span>
                      <span className={`text-sm font-bold ${bmiCategory.color}`}>
                        {bmi} - {bmiCategory.text}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(parseFloat(bmi) * 2, 100)} 
                      className="h-2 mt-2" 
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <HeartPulse className="h-5 w-5 text-health-primary mr-2" />
                  <CardTitle>Health Measurements</CardTitle>
                </div>
                <CardDescription>
                  Enter your recent health measurements if available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                    <Input 
                      id="bloodPressure" 
                      name="bloodPressure" 
                      placeholder="e.g., 120/80" 
                      value={formData.bloodPressure} 
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">Format: Systolic/Diastolic</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
                    <Input 
                      id="glucose" 
                      name="glucose" 
                      type="number" 
                      placeholder="e.g., 100" 
                      value={formData.glucose} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                    <Input 
                      id="cholesterol" 
                      name="cholesterol" 
                      type="number" 
                      placeholder="e.g., 180" 
                      value={formData.cholesterol} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4 flex items-start">
                  <Info className="h-5 w-5 text-health-primary mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    These measurements help us establish your baseline health status. If you don't have recent readings, you can skip this step and add them later.
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 4 && (
            <>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <ActivitySquare className="h-5 w-5 text-health-primary mr-2" />
                  <CardTitle>Health History</CardTitle>
                </div>
                <CardDescription>
                  Tell us about your health history to personalize your care
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Do you have any of these health conditions?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Diabetes", "Hypertension", "High Cholesterol", "Obesity", "Heart Disease", "Asthma", "Thyroid Disorders"].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`condition-${condition}`} 
                          checked={formData.existingConditions.includes(condition)}
                          onCheckedChange={() => handleCheckboxChange(condition)}
                        />
                        <Label htmlFor={`condition-${condition}`} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Family history of any of these conditions?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Diabetes", "Hypertension", "Heart Disease", "Stroke", "Cancer"].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`family-${condition}`} 
                          checked={formData.familyHistory.includes(condition)}
                          onCheckedChange={() => handleFamilyHistoryChange(condition)}
                        />
                        <Label htmlFor={`family-${condition}`} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 5 && (
            <>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <BadgeCheck className="h-5 w-5 text-health-primary mr-2" />
                  <CardTitle>Consent & Finish</CardTitle>
                </div>
                <CardDescription>
                  Review your information and provide consent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
                  <h3 className="font-medium">Your Information Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Name:</div>
                    <div>{formData.name || "Not provided"}</div>
                    
                    <div className="text-muted-foreground">Age:</div>
                    <div>{formData.age || "Not provided"}</div>
                    
                    <div className="text-muted-foreground">Gender:</div>
                    <div>{formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</div>
                    
                    <div className="text-muted-foreground">Height:</div>
                    <div>{formData.height ? `${formData.height} cm` : "Not provided"}</div>
                    
                    <div className="text-muted-foreground">Weight:</div>
                    <div>{formData.weight ? `${formData.weight} kg` : "Not provided"}</div>
                    
                    <div className="text-muted-foreground">BMI:</div>
                    <div className={bmiCategory.color}>
                      {bmi !== "N/A" ? `${bmi} (${bmiCategory.text})` : "Not available"}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="text-sm text-slate-700">
                        Based on the information you've provided, we've identified the following health areas to focus on:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {parseFloat(bmi) >= 25 && (
                          <li>Weight management</li>
                        )}
                        {formData.existingConditions.includes("Diabetes") && (
                          <li>Diabetes management</li>
                        )}
                        {formData.existingConditions.includes("Hypertension") && (
                          <li>Hypertension management</li>
                        )}
                        {!formData.existingConditions.includes("Diabetes") && 
                          formData.familyHistory.includes("Diabetes") && (
                          <li>Diabetes prevention</li>
                        )}
                        {!formData.existingConditions.includes("Hypertension") && 
                          formData.familyHistory.includes("Hypertension") && (
                          <li>Hypertension prevention</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox 
                      id="consent" 
                      checked={formData.consentGiven}
                      onCheckedChange={(checked) => setFormData({...formData, consentGiven: checked as boolean})}
                      required
                    />
                    <Label htmlFor="consent" className="text-sm">
                      I consent to my data being used for health evaluation and program improvement. I understand that this information will be used to provide personalized health recommendations.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button 
              onClick={nextStep}
              disabled={currentStep === 5 && !formData.consentGiven}
            >
              {currentStep === totalSteps ? "Complete Setup" : "Continue"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
