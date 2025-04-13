
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertTriangle, HelpCircle, CheckCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabaseData } from "@/services/supabaseData";

// Severity levels for the symptom analysis
type SeverityLevel = "low" | "medium" | "high" | "critical";

// Structure for the analysis response
interface SymptomAnalysis {
  severity: SeverityLevel;
  possibleConditions: string[];
  recommendation: string;
  actionNeeded: string;
  timeframe: string;
}

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const { toast } = useToast();

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Please enter your symptoms",
        description: "We need to know what you're experiencing to provide an analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // In a real implementation, this would use an AI service
      // For now, using simulated data based on keywords
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      // Simple keyword detection for demo purposes
      const symptomText = symptoms.toLowerCase();
      let mockAnalysis: SymptomAnalysis;
      
      if (symptomText.includes("headache") && symptomText.includes("fever")) {
        mockAnalysis = {
          severity: "medium",
          possibleConditions: ["Common Cold", "Influenza", "Sinusitis"],
          recommendation: "Rest, stay hydrated, and take over-the-counter pain relievers if needed.",
          actionNeeded: "Self-care is recommended. If symptoms persist for more than 3 days or worsen, consult a doctor.",
          timeframe: "Monitor for 48-72 hours"
        };
      } else if (symptomText.includes("chest") && (symptomText.includes("pain") || symptomText.includes("pressure"))) {
        mockAnalysis = {
          severity: "critical",
          possibleConditions: ["Angina", "Myocardial Infarction", "Pulmonary Embolism"],
          recommendation: "Seek immediate medical attention. This could be a sign of a serious condition.",
          actionNeeded: "Go to the emergency room or call emergency services immediately.",
          timeframe: "Immediate action required"
        };
      } else if (symptomText.includes("cough") && symptomText.includes("shortness of breath")) {
        mockAnalysis = {
          severity: "high",
          possibleConditions: ["Bronchitis", "Pneumonia", "COVID-19"],
          recommendation: "Consult with a healthcare provider soon for proper diagnosis and treatment.",
          actionNeeded: "Schedule an appointment with your doctor within 24 hours.",
          timeframe: "Within 24 hours"
        };
      } else if (symptomText.includes("stomach") && (symptomText.includes("pain") || symptomText.includes("ache"))) {
        mockAnalysis = {
          severity: "medium",
          possibleConditions: ["Gastritis", "Food Poisoning", "Irritable Bowel Syndrome"],
          recommendation: "Try over-the-counter antacids. Maintain a bland diet and stay hydrated.",
          actionNeeded: "If pain is severe or persists for more than 24 hours, consult a doctor.",
          timeframe: "Monitor for 24 hours"
        };
      } else {
        mockAnalysis = {
          severity: "low",
          possibleConditions: ["Minor Ailment", "Stress-related Symptoms"],
          recommendation: "Rest, stay hydrated, and monitor your symptoms.",
          actionNeeded: "Self-care is recommended. If symptoms persist or worsen, consult a doctor.",
          timeframe: "Monitor for 3-5 days"
        };
      }
      
      setAnalysis(mockAnalysis);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "We couldn't analyze your symptoms. Please try again later.",
        variant: "destructive",
      });
      console.error("Error analyzing symptoms:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case "low":
        return "text-green-500 bg-green-50 border-green-200";
      case "medium":
        return "text-amber-500 bg-amber-50 border-amber-200";
      case "high":
        return "text-orange-500 bg-orange-50 border-orange-200";
      case "critical":
        return "text-red-500 bg-red-50 border-red-200";
      default:
        return "text-blue-500 bg-blue-50 border-blue-200";
    }
  };

  const getSeverityIcon = (severity: SeverityLevel) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "medium":
        return <HelpCircle className="h-5 w-5 text-amber-500" />;
      case "high":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleBookAppointment = () => {
    setShowBookingDialog(true);
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold text-health-dark">AI Symptom Checker</h1>
        <p className="text-muted-foreground">
          Describe your symptoms in detail to receive an AI-powered analysis and recommendations.
          This tool provides guidance but does not replace professional medical advice.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
            <CardDescription>
              Please provide as much detail as possible about what you're experiencing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Example: I've had a headache for the past 2 days, along with a mild fever. The pain is mostly in the front of my head and gets worse when I bend over."
              className="min-h-[150px]"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <Button 
              className="w-full sm:w-auto bg-health-primary hover:bg-health-accent"
              onClick={analyzeSymptoms}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Symptoms"
              )}
            </Button>
          </CardContent>
        </Card>

        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getSeverityIcon(analysis.severity)}
                Analysis Results
              </CardTitle>
              <CardDescription>
                Based on the symptoms you've described, here's our assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={cn("p-4 rounded-lg border", getSeverityColor(analysis.severity))}>
                <div className="flex items-center gap-2 font-medium mb-1">
                  Severity Level: {analysis.severity.charAt(0).toUpperCase() + analysis.severity.slice(1)}
                </div>
                <p className="text-sm">
                  {analysis.recommendation}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Possible Conditions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {analysis.possibleConditions.map((condition, index) => (
                    <li key={index} className="text-sm">{condition}</li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-1">
                  Note: This is not a diagnosis. Only a healthcare professional can provide an accurate diagnosis.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recommended Action</h3>
                <p className="text-sm">{analysis.actionNeeded}</p>
                <p className="text-sm mt-1">Timeframe: {analysis.timeframe}</p>
              </div>

              {(analysis.severity === "high" || analysis.severity === "critical") && (
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Button onClick={handleBookAppointment} className="bg-health-primary hover:bg-health-accent">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Doctor Appointment
                  </Button>
                  {analysis.severity === "critical" && (
                    <Button variant="destructive">
                      Emergency Contact Information
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Educational Content */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use the Symptom Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Best Practices</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Be as specific as possible with your symptoms</li>
                  <li>Include when symptoms started and their severity</li>
                  <li>Mention any pre-existing conditions</li>
                  <li>Note any medications you're currently taking</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Limitations</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>This tool does not provide medical diagnosis</li>
                  <li>Always consult a healthcare professional for medical advice</li>
                  <li>If you're experiencing a medical emergency, call emergency services immediately</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Doctor Appointment</DialogTitle>
            <DialogDescription>
              Based on your symptoms, we recommend consulting with a healthcare professional.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <p className="text-sm">Would you like to schedule an appointment with:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="justify-start text-left"
                onClick={() => {
                  setShowBookingDialog(false);
                  toast({
                    title: "Redirecting to appointments",
                    description: "Taking you to the appointment scheduling page.",
                  });
                  window.location.href = "/appointments";
                }}
              >
                Find a new doctor
              </Button>
              <Button 
                variant="outline" 
                className="justify-start text-left"
                onClick={() => {
                  setShowBookingDialog(false);
                  toast({
                    title: "Redirecting to your doctor",
                    description: "Taking you to your primary care doctor's booking page.",
                  });
                  window.location.href = "/appointments";
                }}
              >
                Your primary doctor
              </Button>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row sm:justify-end gap-2">
            <Button 
              variant="ghost" 
              onClick={() => setShowBookingDialog(false)}
            >
              Cancel
            </Button>
            <Link to="/appointments">
              <Button className="bg-health-primary hover:bg-health-accent">
                Go to Appointments
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default SymptomChecker;
