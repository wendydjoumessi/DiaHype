
import { useState, useRef } from "react";
import { AppLayout } from "@/components/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  DownloadCloud, 
  Edit, 
  Save, 
  ChevronRight,
  Info,
  Upload
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedReports, setUploadedReports] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real implementation, we would upload the file to a server or Supabase storage
    // For demo purposes, we'll just add the filename to our state
    const newReports = Array.from(files).map(file => file.name);
    setUploadedReports(prev => [...prev, ...newReports]);
    toast.success("Medical report uploaded successfully");
    
    // Reset the file input
    e.target.value = '';
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-health-dark">Your Profile</h1>
            <p className="text-muted-foreground">Manage your account and health information</p>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex">
            <TabsTrigger value="personal" className="flex-1">
              <User className="h-4 w-4 mr-2 hidden md:block" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="health">
              <Shield className="h-4 w-4 mr-2 hidden md:block" />
              Health
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2 hidden md:block" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2 hidden md:block" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      defaultValue="Sarah Johnson" 
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      defaultValue="sarah.johnson@example.com" 
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      defaultValue="1985-06-15" 
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      defaultValue="(555) 123-4567" 
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      defaultValue="123 Main St" 
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input 
                      id="emergency" 
                      defaultValue="John Johnson (Husband) - (555) 987-6543" 
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Medical Reports</CardTitle>
                <CardDescription>
                  Upload and manage your medical reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    className="hidden"
                    multiple
                  />
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium mb-1">Upload Medical Reports</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop files here or click to browse
                  </p>
                  <Button onClick={handleUploadClick}>
                    <Upload className="h-4 w-4 mr-2" /> Select Files
                  </Button>
                </div>
                
                {uploadedReports.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h4 className="font-medium">Uploaded Reports</h4>
                    <div className="space-y-2">
                      {uploadedReports.map((report, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                          <div>
                            <span className="font-medium">{report}</span>
                            <p className="text-xs text-muted-foreground">Uploaded: {new Date().toLocaleDateString()}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            View <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="health" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
                <CardDescription>
                  Your health data and medical information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Height</Label>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                      <span>175 cm</span>
                      <Button variant="ghost" size="sm" className="h-8 p-0 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Weight</Label>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                      <span>82.5 kg</span>
                      <Button variant="ghost" size="sm" className="h-8 p-0 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>BMI</Label>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                      <span>26.9 (Overweight)</span>
                      <Button variant="ghost" size="sm" className="h-8 p-0 w-8">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                      <span>O+</span>
                      <Button variant="ghost" size="sm" className="h-8 p-0 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Medical Conditions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                      <div>
                        <span className="font-medium">Type 2 Diabetes</span>
                        <p className="text-xs text-muted-foreground">Diagnosed: 2018</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        Manage <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                      <div>
                        <span className="font-medium">Hypertension</span>
                        <p className="text-xs text-muted-foreground">Diagnosed: 2019</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        Manage <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Current Medications</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                      <div>
                        <span className="font-medium">Metformin</span>
                        <p className="text-xs text-muted-foreground">500mg, Twice daily</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border">
                      <div>
                        <span className="font-medium">Lisinopril</span>
                        <p className="text-xs text-muted-foreground">10mg, Once daily</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <DownloadCloud className="h-4 w-4 mr-2" />
                  Download Medical Records
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Configure which notifications you want to receive and how you want to receive them.
                </p>
                
                <div className="space-y-4">
                  {["Medication Reminders", "Appointment Reminders", "Health Alerts", "Tips & Education", "Doctor Messages"].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item}</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for {item.toLowerCase()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">Email</Button>
                        <Button variant="outline" size="sm" className="h-8">Push</Button>
                        <Button variant="outline" size="sm" className="h-8">SMS</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>
                  Customize your app experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Units of Measurement</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred units
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Metric (kg, cm)
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Sharing</h4>
                    <p className="text-sm text-muted-foreground">
                      Control who can access your health data
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Accessibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Adjust font size, contrast, and other settings
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Language</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred language
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    English
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
