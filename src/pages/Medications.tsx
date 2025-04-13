
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Calendar, 
  Check, 
  X, 
  AlertCircle, 
  Pill, 
  ChevronRight, 
  Droplet, 
  Coffee, 
  Sun, 
  Moon, 
  Sunset
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabaseData } from "@/services/supabaseData";
import { toast } from "sonner";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  timeOfDay: ("morning" | "noon" | "evening" | "night")[];
  withFood: boolean;
  withWater: boolean;
  refillDate?: string;
  timesPerDay: number;
}

interface DailyDose {
  id: string;
  medicationId: string;
  time: string;
  taken: boolean;
  timeOfDay: "morning" | "noon" | "evening" | "night";
}

// Helper function to get icon for time of day
const getTimeOfDayIcon = (timeOfDay: string) => {
  switch (timeOfDay) {
    case "morning":
      return <Sun className="h-4 w-4" />;
    case "noon":
      return <Sun className="h-4 w-4" />;
    case "evening":
      return <Sunset className="h-4 w-4" />;
    case "night":
      return <Moon className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

// Function to get motivational messages
const getMotivationalMessage = () => {
  const messages = [
    "Great job staying on track with your medications!",
    "You're doing amazing! Keep up with your medication routine.",
    "Consistency is key to better health. You're crushing it!",
    "Your dedication to your health is inspiring!",
    "Every pill taken is a step toward better health. Keep going!",
    "Your commitment to your medication schedule is paying off!",
    "Health is wealth, and you're investing wisely!",
    "You're on the path to better health. Keep it up!",
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export default function Medications() {
  const [activeTab, setActiveTab] = useState("today");
  const [motivationalMessage, setMotivationalMessage] = useState("");

  // Fetch data using react-query
  const { data: medications = [], isLoading: isMedicationsLoading } = useQuery({
    queryKey: ['medications'],
    queryFn: () => supabaseData.getMedications('user-123'), // Replace with actual user ID
  });

  const { data: dailyDoses = [], isLoading: isDailyDosesLoading } = useQuery({
    queryKey: ['daily-doses'],
    queryFn: () => supabaseData.getDailyDoses('user-123'), // Replace with actual user ID
  });

  // Calculate progress
  const takenCount = dailyDoses.filter(dose => dose.taken).length;
  const totalCount = dailyDoses.length;
  const progressPercentage = totalCount > 0 ? (takenCount / totalCount) * 100 : 0;

  // Get motivational message on component mount
  useEffect(() => {
    setMotivationalMessage(getMotivationalMessage());
  }, []);
  
  // Group daily doses by time of day
  const dosesByTimeOfDay = dailyDoses.reduce((acc, dose) => {
    if (!acc[dose.timeOfDay]) {
      acc[dose.timeOfDay] = [];
    }
    acc[dose.timeOfDay].push(dose);
    return acc;
  }, {} as Record<string, DailyDose[]>);

  // Function to mark a dose as taken or not taken
  const toggleDoseTaken = (doseId: string, currentStatus: boolean) => {
    // In a real app, this would call the API to update the dose status
    console.log("Toggling dose:", doseId, "Current status:", currentStatus);
    
    // Show success toast
    toast.success(currentStatus ? "Medication marked as not taken" : "Medication marked as taken");
  };

  return (
    <AppLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-2">Medications</h1>
        <p className="text-muted-foreground mb-6">
          Track and manage your medications, schedule, and reminders
        </p>
        
        {/* Progress Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-medium mb-1">Daily Progress</h2>
                <p className="text-muted-foreground text-sm">
                  {takenCount} of {totalCount} medications taken today
                </p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Calendar className="h-4 w-4 mr-1" />
                View Calendar
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <Progress value={progressPercentage} className="h-2 mb-2" />
            
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-700 text-sm">
                {motivationalMessage}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Medications Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="schedule">My Schedule</TabsTrigger>
            <TabsTrigger value="medications">My Medications</TabsTrigger>
          </TabsList>
          
          {/* Today's Medications */}
          <TabsContent value="today" className="space-y-6 mt-6">
            {isDailyDosesLoading ? (
              <div className="text-center p-8 text-muted-foreground">Loading today's medications...</div>
            ) : Object.keys(dosesByTimeOfDay).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No medications scheduled for today</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any medications scheduled for today. View your schedule to see upcoming medications.
                  </p>
                  <Button onClick={() => setActiveTab("schedule")}>View Schedule</Button>
                </CardContent>
              </Card>
            ) : (
              ["morning", "noon", "evening", "night"].map((timeOfDay) => {
                if (!dosesByTimeOfDay[timeOfDay]) return null;
                
                return (
                  <div key={timeOfDay}>
                    <div className="flex items-center gap-2 mb-3">
                      {getTimeOfDayIcon(timeOfDay)}
                      <h3 className="text-lg font-medium capitalize">{timeOfDay}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {dosesByTimeOfDay[timeOfDay].map((dose) => {
                        const medication = medications.find(m => m.id === dose.medicationId);
                        if (!medication) return null;
                        
                        return (
                          <Card key={dose.id} className={dose.taken ? "bg-gray-50 border-gray-200" : ""}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                    dose.taken ? "bg-green-100" : "bg-blue-100"
                                  }`}>
                                    <Pill className={`h-5 w-5 ${
                                      dose.taken ? "text-green-600" : "text-blue-600"
                                    }`} />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{medication.name}</h4>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {dose.time}
                                      <span className="mx-1">•</span>
                                      {medication.dosage}
                                    </div>
                                  </div>
                                </div>
                                
                                <Button 
                                  variant={dose.taken ? "outline" : "default"}
                                  size="sm"
                                  onClick={() => toggleDoseTaken(dose.id, dose.taken)}
                                  className={dose.taken ? "text-green-600" : ""}
                                >
                                  {dose.taken ? (
                                    <>
                                      <Check className="h-4 w-4 mr-1" />
                                      Taken
                                    </>
                                  ) : "Take Now"}
                                </Button>
                              </div>
                              
                              {medication.instructions && (
                                <div className="mt-3 text-sm text-muted-foreground bg-gray-50 p-2 rounded-md">
                                  <strong>Instructions:</strong> {medication.instructions}
                                </div>
                              )}
                              
                              <div className="flex items-center gap-3 mt-3">
                                {medication.withFood && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Coffee className="h-3 w-3 mr-1" />
                                    Take with food
                                  </div>
                                )}
                                
                                {medication.withWater && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Droplet className="h-3 w-3 mr-1" />
                                    Take with water
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>
          
          {/* Medication Schedule */}
          <TabsContent value="schedule" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  View your medication schedule for the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Calendar or schedule view would go here */}
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Calendar View Coming Soon</h3>
                  <p>We're working on a detailed calendar view for your medication schedule.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* My Medications List */}
          <TabsContent value="medications" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">My Medications</h3>
              <Button size="sm">Add Medication</Button>
            </div>
            
            {isMedicationsLoading ? (
              <div className="text-center p-8 text-muted-foreground">Loading medications...</div>
            ) : medications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No medications found</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any medications added to your profile yet.
                  </p>
                  <Button>Add Medication</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {medications.map((medication) => (
                  <Card key={medication.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{medication.name}</CardTitle>
                      <CardDescription>{medication.dosage} - {medication.frequency}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Started: {new Date(medication.startDate).toLocaleDateString()}</span>
                        </div>
                        
                        {medication.endDate && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Ends: {new Date(medication.endDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        {medication.refillDate && (
                          <div className="flex items-center text-amber-600">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>Refill by: {new Date(medication.refillDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      {medication.instructions && (
                        <div className="mt-3 text-sm bg-gray-50 p-2 rounded-md">
                          <strong>Instructions:</strong> {medication.instructions}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0 pb-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
