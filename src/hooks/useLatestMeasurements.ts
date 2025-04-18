
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export const useLatestMeasurements = () => {
  const { user } = useAuth();

  // Mock data for testing
  const mockBloodSugar = {
    id: "mock-bs-1",
    user_id: "test-user-id",
    glucose_level: 180,
    unit: "mg/dL", 
    measured_at: new Date().toISOString(),
    notes: "Before breakfast",
    meal_context: "fasting"
  };

  const mockBloodPressure = {
    id: "mock-bp-1",
    user_id: "test-user-id", 
    systolic: 145,
    diastolic: 92,
    pulse_rate: 78,
    measured_at: new Date().toISOString(),
    notes: "Morning reading"
  };

  const mockWeight = {
    id: "mock-w-1",
    user_id: "test-user-id",
    weight: 98,
    unit: "kg",
    timestamp: new Date().toISOString(),
    notes: "Morning weight"
  };

  const bloodSugar = useQuery({
    queryKey: ["latest-blood-sugar", user?.id],
    queryFn: async () => {
      // For testing without authentication
      if (!user?.id) {
        console.log("Using mock blood sugar data (no authenticated user)");
        return mockBloodSugar;
      }
      
      const { data, error } = await supabase
        .from("blood_sugar_records")
        .select("*")
        .eq("user_id", user?.id)
        .order("measured_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.log("Error fetching blood sugar data, using mock data:", error);
        return mockBloodSugar;
      }
      
      return data || mockBloodSugar;
    },
    // Enable the query even without a user ID (for testing)
    enabled: true,
  });

  const bloodPressure = useQuery({
    queryKey: ["latest-blood-pressure", user?.id],
    queryFn: async () => {
      // For testing without authentication
      if (!user?.id) {
        console.log("Using mock blood pressure data (no authenticated user)");
        return mockBloodPressure;
      }
      
      const { data, error } = await supabase
        .from("blood_pressure_records")
        .select("*")
        .eq("user_id", user?.id)
        .order("measured_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.log("Error fetching blood pressure data, using mock data:", error);
        return mockBloodPressure;
      }
      
      return data || mockBloodPressure;
    },
    // Enable the query even without a user ID (for testing)
    enabled: true,
  });

  const weight = useQuery({
    queryKey: ["latest-weight", user?.id],
    queryFn: async () => {
      // For testing without authentication
      if (!user?.id) {
        console.log("Using mock weight data (no authenticated user)");
        return mockWeight;
      }
      
      const { data, error } = await supabase
        .from("weight_records")
        .select("*")
        .eq("user_id", user?.id)
        .order("timestamp", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.log("Error fetching weight data, using mock data:", error);
        return mockWeight;
      }
      
      return data || mockWeight;
    },
    // Enable the query even without a user ID (for testing)
    enabled: true,
  });

  return {
    bloodSugar: bloodSugar.data,
    bloodPressure: bloodPressure.data,
    weight: weight.data,
    isLoading: bloodSugar.isLoading || bloodPressure.isLoading || weight.isLoading,
  };
};
