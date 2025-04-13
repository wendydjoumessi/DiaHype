import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  PlusCircle, 
  Calendar, 
  Clock, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  AlertTriangle
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LogBloodPressureDialog } from "@/components/LogBloodPressureDialog";

const BloodPressureManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [bloodPressureDialogOpen, setBloodPressureDialogOpen] = useState(false);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-health-dark">Blood Pressure Management</h1>
            <p className="text-muted-foreground">Track and manage your hypertension</p>
          </div>
          <Button 
            className="bg-health-primary hover:bg-health-accent"
            onClick={() => setBloodPressureDialogOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Log Blood Pressure
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Latest Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-health-primary" />
                <span className="text-2xl font-bold">128/82</span>
                <span className="ml-1 text-sm">mmHg</span>
                <div className="flex items-center text-health-success ml-auto">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">8%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Measured today at 8:30 AM</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                7-Day Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-health-primary" />
                <span className="text-2xl font-bold">132/85</span>
                <span className="ml-1 text-sm">mmHg</span>
                <div className="flex items-center text-health-success ml-auto">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Based on 12 readings this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Classification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-amber-500" />
                <span className="text-xl font-bold text-amber-500">Elevated</span>
                <Button variant="link" size="sm" className="ml-auto p-0 h-auto">
                  <Info className="h-4 w-4 mr-1" />
                  Learn more
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Consider lifestyle adjustments</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="log">Log</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blood Pressure History</CardTitle>
                    <CardDescription>Your readings for the past 7 days</CardDescription>
                  </div>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24hours">Last 24 Hours</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Blood pressure chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Readings</CardTitle>
                  <CardDescription>Your most recent blood pressure readings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "Today, 8:30 AM", value: "128/82 mmHg", pulse: "72 bpm", status: "elevated" },
                      { time: "Yesterday, 9:00 PM", value: "124/80 mmHg", pulse: "68 bpm", status: "normal" },
                      { time: "Yesterday, 8:45 AM", value: "130/84 mmHg", pulse: "76 bpm", status: "elevated" },
                      { time: "2 days ago, 7:30 AM", value: "122/78 mmHg", pulse: "70 bpm", status: "normal" },
                    ].map((reading, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm text-muted-foreground">{reading.time}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="font-medium">{reading.value}</span>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              reading.status === "normal" 
                                ? "bg-green-100 text-green-800" 
                                : reading.status === "elevated"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {reading.status === "normal" 
                                ? "Normal" 
                                : reading.status === "elevated"
                                ? "Elevated"
                                : "High"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">Pulse: {reading.pulse}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Readings</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Insights</CardTitle>
                  <CardDescription>AI-powered analysis of your blood pressure patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-shrink-0 mr-4">
                      <Info className="h-6 w-6 text-health-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Morning Elevation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your blood pressure tends to be higher in the morning. Consider taking medications earlier or adjusting your wake-up routine.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex-shrink-0 mr-4">
                      <AlertTriangle className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Sodium Sensitivity</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        We've noticed higher readings on days with higher sodium intake. Try to limit high-sodium foods.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-shrink-0 mr-4">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Exercise Benefits</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your readings improve after days with moderate exercise. Consider maintaining your current activity level.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Get More Insights</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="log" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Log Blood Pressure</CardTitle>
                <CardDescription>
                  Record a new blood pressure reading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="systolic">Systolic (mmHg)</Label>
                      <Input 
                        id="systolic" 
                        type="number" 
                        placeholder="Enter top number (e.g., 120)"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                      <Input 
                        id="diastolic" 
                        type="number" 
                        placeholder="Enter bottom number (e.g., 80)"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pulse">Pulse (bpm)</Label>
                    <Input 
                      id="pulse" 
                      type="number" 
                      placeholder="Enter heart rate (e.g., 72)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reading-time">Reading Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        id="reading-date" 
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]} 
                      />
                      <Input 
                        id="reading-time" 
                        type="time"
                        defaultValue={new Date().toTimeString().split(' ')[0].slice(0, 5)} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="arm">Arm Used</Label>
                    <Select defaultValue="left">
                      <SelectTrigger>
                        <SelectValue placeholder="Select arm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left Arm</SelectItem>
                        <SelectItem value="right">Right Arm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Body Position</Label>
                    <Select defaultValue="sitting">
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sitting">Sitting</SelectItem>
                        <SelectItem value="standing">Standing</SelectItem>
                        <SelectItem value="lying">Lying Down</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input 
                      id="notes" 
                      placeholder="Any additional information (e.g., stress, medication, symptoms)"
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-health-primary hover:bg-health-accent"
                    onClick={() => setBloodPressureDialogOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Save Reading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Trends Analysis</CardTitle>
                <CardDescription>
                  In-depth analysis of your blood pressure patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Analyze your blood pressure trends across different time periods and contexts.
                </p>
                <p className="flex h-40 items-center justify-center border rounded-lg bg-muted text-muted-foreground">
                  Detailed trend analysis charts would be shown here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Smart analysis of your blood pressure patterns and personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get personalized insights and recommendations based on your blood pressure data.
                </p>
                <p className="flex h-40 items-center justify-center border rounded-lg bg-muted text-muted-foreground">
                  AI-generated insights and recommendations would be shown here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <LogBloodPressureDialog 
        open={bloodPressureDialogOpen} 
        onOpenChange={setBloodPressureDialogOpen} 
      />
    </AppLayout>
  );
};

export default BloodPressureManagement;
