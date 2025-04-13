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
  Droplet, 
  PlusCircle, 
  Calendar, 
  Clock, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  AlertTriangle
} from "lucide-react";
import { GlucoseChart } from "@/components/GlucoseChart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LogBloodSugarDialog } from "@/components/LogBloodSugarDialog";

const GlucoseManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [bloodSugarDialogOpen, setBloodSugarDialogOpen] = useState(false);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-health-dark">Blood Glucose Management</h1>
            <p className="text-muted-foreground">Track and manage your blood sugar levels</p>
          </div>
          <Button 
            className="bg-health-primary hover:bg-health-accent"
            onClick={() => setBloodSugarDialogOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Log Blood Sugar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-health-primary" />
                <span className="text-2xl font-bold">118</span>
                <span className="ml-1 text-sm">mg/dL</span>
                <div className="flex items-center text-health-success ml-auto">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">8%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">From 3 readings today</p>
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
                <span className="text-2xl font-bold">127</span>
                <span className="ml-1 text-sm">mg/dL</span>
                <div className="flex items-center text-health-success ml-auto">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">From 18 readings this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Last HbA1c
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-health-primary" />
                <span className="text-2xl font-bold">6.8%</span>
                <div className="flex items-center text-health-success ml-auto">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">0.4%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Measured 2 months ago</p>
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
                    <CardTitle>Blood Glucose Trends</CardTitle>
                    <CardDescription>Your blood sugar readings for the past 7 days</CardDescription>
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
                <GlucoseChart />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Readings</CardTitle>
                  <CardDescription>Your most recent blood glucose entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "Today, 7:30 AM", value: "115 mg/dL", note: "Before breakfast", status: "normal" },
                      { time: "Yesterday, 9:30 PM", value: "132 mg/dL", note: "After dinner", status: "normal" },
                      { time: "Yesterday, 1:15 PM", value: "142 mg/dL", note: "After lunch", status: "elevated" },
                      { time: "Yesterday, 7:45 AM", value: "118 mg/dL", note: "Before breakfast", status: "normal" },
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
                          <p className="text-xs text-muted-foreground">{reading.note}</p>
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
                  <CardDescription>AI-powered analysis of your glucose patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-shrink-0 mr-4">
                      <Info className="h-6 w-6 text-health-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Morning Spike Pattern</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your glucose tends to spike between 7-9 AM. Consider adjusting your breakfast or morning medication timing.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex-shrink-0 mr-4">
                      <AlertTriangle className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Post-Dinner Elevation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        We've noticed higher readings after dinner. Consider reducing carbohydrates in your evening meals.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-shrink-0 mr-4">
                      <Droplet className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Improved Control</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your average glucose levels have improved by 12% in the past month. Keep up the good work!
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
                <CardTitle>Log Blood Glucose</CardTitle>
                <CardDescription>
                  Record a new blood glucose reading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="glucose-value">Blood Glucose (mg/dL)</Label>
                      <Input 
                        id="glucose-value" 
                        type="number" 
                        placeholder="Enter your reading (e.g., 120)"
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
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="measurement-context">Measurement Context</Label>
                    <Select defaultValue="before-breakfast">
                      <SelectTrigger>
                        <SelectValue placeholder="Select context" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="before-breakfast">Before Breakfast</SelectItem>
                        <SelectItem value="after-breakfast">After Breakfast</SelectItem>
                        <SelectItem value="before-lunch">Before Lunch</SelectItem>
                        <SelectItem value="after-lunch">After Lunch</SelectItem>
                        <SelectItem value="before-dinner">Before Dinner</SelectItem>
                        <SelectItem value="after-dinner">After Dinner</SelectItem>
                        <SelectItem value="bedtime">Before Bedtime</SelectItem>
                        <SelectItem value="night">Middle of Night</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input 
                      id="notes" 
                      placeholder="Any additional information (e.g., meals, activity, stress)"
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-health-primary hover:bg-health-accent"
                    onClick={() => setBloodSugarDialogOpen(true)}
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
                  In-depth analysis of your blood glucose patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Analyze your glucose trends across different time periods and contexts.
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
                  Smart analysis of your glucose patterns and personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get personalized insights and recommendations based on your glucose data.
                </p>
                <p className="flex h-40 items-center justify-center border rounded-lg bg-muted text-muted-foreground">
                  AI-generated insights and recommendations would be shown here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <LogBloodSugarDialog 
        open={bloodSugarDialogOpen} 
        onOpenChange={setBloodSugarDialogOpen} 
      />
    </AppLayout>
  );
};

export default GlucoseManagement;
