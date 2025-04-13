import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Activity } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabaseAuth } from "@/services/supabaseAuth";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

       // Validate inputs
       if (!email || !password) {
        toast({
          title: "Missing information",
          description: "Please provide both email and password.",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);

    try {
      // Authenticate with Supabase
      const { user, error } = await supabaseAuth.signIn(email, password);

      if (error) throw error;

      if (user) {
        toast({
          title: "Sign In Successful",
          description: "Welcome back to DiabetesCare!",
        });
        
        // Navigate to the appropriate dashboard based on user type
        navigate("/profile"); 
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign In Failed",
        description: error instanceof Error ? error.message : "Incorrect email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to reset your password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { success, error } = await supabaseAuth.resetPassword(email);
      
      if (error) throw error;

      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for a link to reset your password.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Password Reset Failed",
        description: error instanceof Error ? error.message : "Failed to send password reset email. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-health-light/30 p-4">
      <div className="w-full max-w-md">
        <Card className="border-health-primary/20 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-health-primary flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-health-dark">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your DiabetesCare account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button 
                    variant="link" 
                    className="px-0 font-normal text-xs text-health-primary hover:text-health-accent"
                    onClick={handleResetPassword}
                    type="button"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    placeholder="Enter your password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-health-primary hover:bg-health-accent"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-health-primary hover:text-health-accent font-medium">
                Sign up
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
