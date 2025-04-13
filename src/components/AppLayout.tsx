
import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { 
  Activity, Calendar, MessagesSquare, Pill, 
  Home, Settings, User, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserAccountNav } from "@/components/UserAccountNav";
import { supabaseAuth } from "@/services/supabaseAuth";

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: MessagesSquare, label: "Messages", href: "/messages" },
  { icon: Pill, label: "Medication", href: "/medication" },
  { icon: Activity, label: "Wearables", href: "/wearables" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Get user role from auth service
  const currentUser = supabaseAuth.getCurrentUser();
  const userRole = currentUser?.userType || "patient";
  
  // Function to check if a nav item is active based on the current location
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button 
        variant="ghost" 
        className="fixed top-4 left-4 z-50 md:hidden p-2"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white shadow-md flex flex-col w-64 md:w-72 p-6 fixed md:sticky top-0 h-screen z-40 transition-all duration-300",
          sidebarOpen ? "left-0" : "-left-full md:left-0"
        )}
      >
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-health-primary flex items-center justify-center">
            <Activity className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold text-health-dark">DiabetesCare</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-health-light hover:text-health-primary transition-all",
                    isActive(item.href) && "bg-health-light text-health-primary font-medium"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            
            {/* Admin Dashboard link - only visible for admin users */}
            {userRole === "admin" && (
              <li>
                <Link 
                  to="/admin"
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-health-light hover:text-health-primary transition-all",
                    isActive("/admin") && "bg-health-light text-health-primary font-medium"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <User size={20} />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="mt-auto">
          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
            <UserAccountNav />
            <div>
              <p className="font-medium text-sm">Sarah Johnson</p>
              <p className="text-xs text-gray-500">{userRole === "admin" ? "Admin" : "Patient"}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

