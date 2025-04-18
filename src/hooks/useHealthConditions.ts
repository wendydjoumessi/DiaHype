
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export const useHealthConditions = () => {
  const { user } = useAuth();
  
  // For testing - mock health conditions for development
  const mockHealthConditions = [
    {
      id: "1",
      user_id: "test-user-id",
      condition_name: "diabetes",
      status: "active",
      severity: "moderate",
      diagnosis_date: "2022-05-15",
      notes: "Type 2 diabetes, diagnosed following routine blood work"
    },
    {
      id: "2",
      user_id: "test-user-id",
      condition_name: "hypertension",
      status: "active",
      severity: "mild",
      diagnosis_date: "2022-06-10",
      notes: "Essential hypertension, well-controlled with medication"
    },
    {
      id: "3",
      user_id: "test-user-id",
      condition_name: "obesity",
      status: "active",
      severity: "moderate",
      diagnosis_date: "2022-04-22",
      notes: "BMI: 32.4"
    }
  ];

  return useQuery({
    queryKey: ["health-conditions", user?.id],
    queryFn: async () => {
      // For testing without authentication
      if (!user?.id) {
        console.log("Using mock health conditions (no authenticated user)");
        return mockHealthConditions;
      }

      const { data, error } = await supabase
        .from("health_conditions")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      
      // If no data returned from DB, use mock data for testing
      if (!data || data.length === 0) {
        console.log("No health conditions found in database, using mock data");
        return mockHealthConditions;
      }
      
      return data;
    },
    // Enable the query even without a user ID (for testing)
    enabled: true,
  });
};
