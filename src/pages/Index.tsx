import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calendar,
  Heart,
  Pill,
  MessageSquare,
  Activity,
  ArrowRight,
  BarChart3,
  Apple,
  BellRing,
  Flag,
  ShieldCheck,
  Droplets,
  User,
} from "lucide-react";
import { DoctorMessages } from "@/components/DoctorMessages";

export default function Index() {
  const mockConversations = [
    {
      id: "mock-1",
      participantId: "dr-williams",
      participantName: "Dr. Williams",
      participantAvatar: "/placeholder.svg",
      lastMessage:
        "Your latest A1C results look good. Keep up with the current medication schedule.",
      lastMessageTime: "Yesterday",
      unreadCount: 2,
    },
    {
      id: "mock-2",
      participantId: "dr-martinez",
      participantName: "Dr. Martinez",
      participantAvatar: "/placeholder.svg",
      lastMessage:
        "Please monitor your blood pressure daily for the next week and send me the readings.",
      lastMessageTime: "3 days ago",
      unreadCount: 0,
    },
  ];

  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  return (
    <>
      {/* Custom Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 sticky top-0 z-10">
        <Link to="/" className="text-2xl font-bold text-health-primary">DiaHype</Link>
        <div className="flex gap-4">
          <Link to="/sign-in">
            <Button variant="outline" size="sm">Sign In</Button>
          </Link>
          <Link to="/sign-up">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>

      <div className="relative w-full bg-gradient-to-br from-health-primary to-health-accent py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Turn Your Phone into Your Personal Health Assistant
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg">
                Empower your health journey with integrated tools and personalized guidance for managing diabetes, hypertension, obesity, and other chronic conditions across web and mobile platforms.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-health-primary hover:bg-gray-100 shadow-lg">
                  Get Started Today
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md transform md:translate-y-4 transition-all">
                <h2 className="text-xl font-semibold mb-4 text-health-dark">Your Health Dashboard</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Droplets className="h-5 w-5 text-health-primary" />
                      <span>Blood Glucose</span>
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-lg">118 mg/dL</span>
                      <span className="text-xs text-green-600">↓ 8% from last week</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Activity className="h-5 w-5 text-health-primary" />
                      <span>Blood Pressure</span>
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-lg">120/80 mmHg</span>
                      <span className="text-xs text-gray-500">Normal range</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Apple className="h-5 w-5 text-health-primary" />
                      <span>A1C Level</span>
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-lg">6.5%</span>
                      <span className="text-xs text-amber-600">Target: &lt;7.0%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <BarChart3 className="h-5 w-5 text-health-primary" />
                      <span>Active Goals</span>
                    </span>
                    <span className="font-bold text-lg">3 of 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </div>

      <main className="flex-1">
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-health-dark">
              Stay on Top of Every Condition
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage your condition effectively in one place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="h-12 w-12 rounded-full bg-health-light flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-health-primary" />
                  </div>
                  <CardTitle className="text-xl">Smart Appointments</CardTitle>
                  <CardDescription>Schedule and manage doctor visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-health-primary">3</p>
                  <p className="text-sm text-gray-500">Upcoming appointments</p>
                </CardContent>
                <CardFooter>
                  <Link to="/sign-in">
                    <Button variant="outline" className="border-health-primary text-health-primary hover:bg-health-light">
                      View Calendar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="h-12 w-12 rounded-full bg-health-light flex items-center justify-center mb-2">
                    <Pill className="h-6 w-6 text-health-primary" />
                  </div>
                  <CardTitle className="text-xl">Medication Tracking</CardTitle>
                  <CardDescription>Never miss a dose again</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-health-primary">5</p>
                  <p className="text-sm text-gray-500">Active medications</p>
                </CardContent>
                <CardFooter>
                  <Link to="/sign-in">
                    <Button variant="outline" className="border-health-primary text-health-primary hover:bg-health-light">
                      Manage Meds <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="h-12 w-12 rounded-full bg-health-light flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 text-health-primary" />
                  </div>
                  <CardTitle className="text-xl">Symptom Analysis</CardTitle>
                  <CardDescription>Identify potential health concerns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last check</span>
                    <span className="text-sm font-medium">2 days ago</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/sign-in">
                    <Button variant="outline" className="border-health-primary text-health-primary hover:bg-health-light">
                      Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-health-dark">
                Your Health Network
              </h2>
              <p className="text-lg text-gray-600">
                Stay connected with your healthcare providers and monitor your progress
              </p>
            </div>

            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="w-full md:w-auto bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="appointments" 
                  className="flex items-center data-[state=active]:bg-health-primary data-[state=active]:text-white rounded px-4 py-2"
                >
                  <Calendar className="mr-2 h-4 w-4" /> Appointments
                </TabsTrigger>
                <TabsTrigger 
                  value="messages" 
                  className="flex items-center data-[state=active]:bg-health-primary data-[state=active]:text-white rounded px-4 py-2"
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Messages
                </TabsTrigger>
                <TabsTrigger 
                  value="wearables" 
                  className="flex items-center data-[state=active]:bg-health-primary data-[state=active]:text-white rounded px-4 py-2"
                >
                  <Activity className="mr-2 h-4 w-4" /> Wearables
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appointments" className="mt-6">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gray-50 rounded-t-lg">
                    <CardTitle className="flex items-center text-health-dark">
                      <Calendar className="mr-2 h-5 w-5 text-health-primary" /> Upcoming Appointments
                    </CardTitle>
                    <CardDescription>Your next scheduled consultations</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-health-light flex items-center justify-center mr-3">
                              <User className="h-5 w-5 text-health-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Dr. Williams</h3>
                              <p className="text-sm text-gray-500">Endocrinologist</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">April 18, 2025</p>
                            <p className="text-sm text-gray-500">10:00 AM</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <Link to="/sign-in" className="w-full">Sign in to Reschedule</Link>
                        </Button>
                      </div>
                      <div className="text-center pt-4">
                        <p className="text-gray-500 mb-4">No other appointments scheduled</p>
                        <Link to="/sign-in">
                          <Button className="bg-health-primary hover:bg-health-accent">
                            Sign in to Schedule Appointment
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="mt-6">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gray-50 rounded-t-lg">
                    <CardTitle className="flex items-center text-health-dark">
                      <MessageSquare className="mr-2 h-5 w-5 text-health-primary" /> Recent Messages
                    </CardTitle>
                    <CardDescription>Your conversations with healthcare providers</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">Sign in to view your messages</p>
                      <Link to="/sign-in">
                        <Button className="bg-health-primary hover:bg-health-accent">
                          Sign In Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wearables" className="mt-6">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gray-50 rounded-t-lg">
                    <CardTitle className="flex items-center text-health-dark">
                      <Activity className="mr-2 h-5 w-5 text-health-primary" /> Wearable Integration
                    </CardTitle>
                    <CardDescription>Connect your devices for better tracking</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-health-primary transition-colors">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                            <Activity className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Glucose Monitor</h3>
                            <p className="text-sm text-gray-500">Connect your continuous glucose monitor</p>
                          </div>
                        </div>
                        <Link to="/sign-in">
                          <Button className="bg-health-primary hover:bg-health-accent">Sign In to Connect</Button>
                        </Link>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-health-primary transition-colors">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                            <Activity className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Fitness Tracker</h3>
                            <p className="text-sm text-gray-500">Sync your activity and sleep data</p>
                          </div>
                        </div>
                        <Link to="/sign-in">
                          <Button className="bg-health-primary hover:bg-health-accent">Sign In to Connect</Button>
                        </Link>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-health-primary transition-colors">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                            <Activity className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Smart Scale</h3>
                            <p className="text-sm text-gray-500">Track weight and body composition</p>
                          </div>
                        </div>
                        <Link to="/sign-in">
                          <Button className="bg-health-primary hover:bg-health-accent">Sign In to Connect</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-health-light">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-health-dark">
                Benefits of DiaHype
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Designed specifically your disease management, our platform offers everything you need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-health-light flex items-center justify-center mb-4">
                  <BellRing className="h-7 w-7 text-health-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Smart Reminders</h3>
                <p className="text-gray-600">Never miss medications or appointments with customized alerts</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-health-light flex items-center justify-center mb-4">
                  <ShieldCheck className="h-7 w-7 text-health-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Data Security</h3>
                <p className="text-gray-600">Your health information is protected with top-tier encryption</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-health-light flex items-center justify-center mb-4">
                  <Flag className="h-7 w-7 text-health-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Goal Setting</h3>
                <p className="text-gray-600">Set and track personal health goals with progress reports</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-health-light flex items-center justify-center mb-4">
                  <MessageSquare className="h-7 w-7 text-health-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Direct Communication</h3>
                <p className="text-gray-600">Message your healthcare providers securely and easily</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-health-primary to-health-accent text-white">
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Condition effortlessly?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Join thousands of users who have improved their health with our comprehensive diabetes management platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/sign-up">
                <Button size="lg" className="bg-white text-health-primary hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-health-primary">DiaHype</h2>
              <p className="text-sm text-gray-400">Effortless Disease Management—Right From Your Smartphone.</p>
            </div>
            <div className="flex gap-6">
              <Link to="/sign-in" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link to="/sign-up" className="text-gray-300 hover:text-white transition-colors">Sign Up</Link>
              <Link to="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} DiaHype. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
