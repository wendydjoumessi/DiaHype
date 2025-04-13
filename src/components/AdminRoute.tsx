
import { Navigate } from "react-router-dom";
import { supabaseAuth } from "@/services/supabaseAuth";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const currentUser = supabaseAuth.getCurrentUser();
  const isAdmin = currentUser?.userType === "admin";
  
  if (!currentUser) {
    // Not logged in, redirect to sign in
    return <Navigate to="/sign-in" replace />;
  }
  
  if (!isAdmin) {
    // Logged in but not an admin, redirect to home
    return <Navigate to="/" replace />;
  }
  
  // User is an admin, render the protected component
  return <>{children}</>;
};
