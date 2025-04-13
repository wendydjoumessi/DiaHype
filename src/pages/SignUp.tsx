import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, UserPlus, Building, Hospital, Microscope, User, Eye, EyeOff, Shield, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabaseAuth } from "@/services/supabaseAuth";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("patient");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    governmentId: "",
    hospitalName: "",
    labName: "",
    businessLicense: "",
    medicalLicense: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        country: formData.country
      };

      if (userType === "doctor") {
        Object.assign(userData, { 
          medicalLicense: formData.medicalLicense 
        });
      } else if (userType === "hospital") {
        Object.assign(userData, { 
          hospitalName: formData.hospitalName,
          businessLicense: formData.businessLicense 
        });
      } else if (userType === "laboratory") {
        Object.assign(userData, { 
          labName: formData.labName,
          businessLicense: formData.businessLicense 
        });
      }
      const { user, error, rateLimited } = await supabaseAuth.signUp(
        formData.email,
        formData.password,
        userType,
        userData
      );

      if (rateLimited) {
        toast({
          title: "Registration Partially Successful",
          description: "Your account was created, but we couldn't send the confirmation email due to rate limits. Please try signing in later or contact support.",
          variant: "destructive",
        });
        navigate("/sign-in");
        return;
      }

      if (error) throw error;

      toast({
        title: "Registration Successful",
        description: `Your ${userType} account has been created successfully. Please check your email for verification.`,
      });
      
      navigate("/onboarding");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-health-light/30 p-4">
      <div className="w-full max-w-xl">
        <Card className="border-health-primary/20 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-health-primary flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-health-dark">Create an Account</CardTitle>
            <CardDescription>
              Join DiabetesCare to manage your health efficiently
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="patient" onValueChange={setUserType} className="w-full mb-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="patient" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span className="hidden md:inline">Patient</span>
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-1">
                  <UserPlus className="h-3 w-3" />
                  <span className="hidden md:inline">Doctor</span>
                </TabsTrigger>
                <TabsTrigger value="hospital" className="flex items-center gap-1">
                  <Hospital className="h-3 w-3" />
                  <span className="hidden md:inline">Hospital</span>
                </TabsTrigger>
                <TabsTrigger value="laboratory" className="flex items-center gap-1">
                  <Microscope className="h-3 w-3" />
                  <span className="hidden md:inline">Laboratory</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span className="hidden md:inline">Admin</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter your first name" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter your last name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="br">Brazil</SelectItem>
                    <SelectItem value="ng">Nigeria</SelectItem>
                    <SelectItem value="za">South Africa</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="Enter your phone number" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              {userType === "patient" && (
                <div className="space-y-2">
                  <Label htmlFor="governmentId">Government ID</Label>
                  <div className="flex items-center gap-2">
                    <Input id="governmentId" type="file" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Upload a valid government ID for verification</p>
                </div>
              )}
              
              {userType === "doctor" && (
                <div className="space-y-2">
                  <Label htmlFor="license">Medical License Number</Label>
                  <Input id="license" placeholder="Enter your medical license number" required />
                  
                  <Label htmlFor="medicalLicense" className="mt-4">Upload Medical License</Label>
                  <div className="flex items-center gap-2">
                    <Input id="medicalLicense" type="file" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Upload a copy of your medical license for verification</p>
                </div>
              )}
              
              {userType === "hospital" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input id="hospitalName" placeholder="Enter hospital name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessLicense">Business License Number</Label>
                    <Input id="businessLicense" placeholder="Enter business license number" required />
                    
                    <Label htmlFor="hospitalLicense" className="mt-4">Upload Business License</Label>
                    <div className="flex items-center gap-2">
                      <Input id="hospitalLicense" type="file" className="flex-1" />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Upload a copy of your hospital's business license</p>
                  </div>
                </>
              )}
              
              {userType === "laboratory" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="labName">Laboratory Name</Label>
                    <Input id="labName" placeholder="Enter laboratory name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessLicense">Business License Number</Label>
                    <Input id="businessLicense" placeholder="Enter business license number" required />
                    
                    <Label htmlFor="labLicense" className="mt-4">Upload Business License</Label>
                    <div className="flex items-center gap-2">
                      <Input id="labLicense" type="file" className="flex-1" />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Upload a copy of your laboratory's business license</p>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    placeholder="Create a password" 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                    className="pr-9" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 8 characters with letters, numbers and special characters
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded border-gray-300 text-health-primary focus:ring-health-primary" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <Link to="/terms" className="text-health-primary hover:text-health-accent">Terms of Service</Link> and <Link to="/privacy" className="text-health-primary hover:text-health-accent">Privacy Policy</Link>
                </Label>
              </div>
              
              {(userType === "doctor" || userType === "hospital" || userType === "laboratory") && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Your account will require verification of your credentials before you can access the platform. Please have your license and identification documents ready to upload after registration.
                  </p>
                </div>
              )}
              
              <Button type="submit" className="w-full bg-health-primary hover:bg-health-accent" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-health-primary hover:text-health-accent font-medium">
                Sign in
              </Link>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm" className="text-xs">
                Language: English
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Accessibility
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
