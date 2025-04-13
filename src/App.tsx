
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import WearableIntegration from "./pages/WearableIntegration";
import AdminDashboard from "./pages/AdminDashboard";
import Messages from "./pages/Messages";
import Medications from "./pages/Medications";
import Settings from "./pages/Settings";
import SymptomChecker from "./pages/SymptomChecker";
import WeightManagement from "./pages/WeightManagement";
import GlucoseManagement from "./pages/GlucoseManagement";
import BloodPressureManagement from "./pages/BloodPressureManagement";
import { AdminRoute } from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/wearables" element={<WearableIntegration />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/messages" element={<Messages />} />
          <Route path="/medication" element={<Medications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/weight-management" element={<WeightManagement />} />
          <Route path="/glucose" element={<GlucoseManagement />} />
          <Route path="/blood-pressure" element={<BloodPressureManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
