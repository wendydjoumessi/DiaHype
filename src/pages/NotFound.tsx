
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-health-light/30 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold text-health-dark mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="default">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="#" onClick={() => window.history.back()} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Looking for something specific?</p>
          <div className="mt-2 space-x-2">
            <Link to="/sign-in" className="text-health-primary hover:underline">Sign In</Link>
            <span>•</span>
            <Link to="/sign-up" className="text-health-primary hover:underline">Sign Up</Link>
            <span>•</span>
            <Link to="/profile" className="text-health-primary hover:underline">Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
