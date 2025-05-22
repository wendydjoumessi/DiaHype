import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export const useLatestMeasurements = () => {
  const { user } = useAuth();

  const isEnabled = !!user?.id;

  // Latest Blood Sugar 
  const bloodSugar = useQuery({
    queryKey: ["latest-blood-sugar", user?.id],
    enabled: isEnabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blood_sugar_records")
        .select("*")
        .eq("user_id", user.id)
        .order("measured_at", { ascending: false })
        .limit(1)
        .maybeSingle(); // <-- returns a single object, not array

      if (error) {
        console.error("Error fetching blood sugar data:", error);
        return null;
      }

      return data;
    },
  });

  // Latest Blood Pressure
  const bloodPressure = useQuery({
    queryKey: ["latest-blood-pressure", user?.id],
    enabled: isEnabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blood_pressure_records")
        .select("*")
        .eq("user_id", user.id)
        .order("measured_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching blood pressure data:", error);
        return null;
      }

      return data;
    },
  });

  // Latest Weight
  const weight = useQuery({
    queryKey: ["latest-weight", user?.id],
    enabled: isEnabled, 
    queryFn: async () => {
      const { data, error } = await supabase
        .from("weight_records")
        .select("*")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) {
        console.error("Error fetching weight data:", error);
        return null;
      }
  
      return data;
    },
  });
  

  // History: Blood Sugar (returns an array)
  const bloodSugarHistory = useQuery({
    queryKey: ["blood-sugar-history", user?.id],
    enabled: isEnabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blood_sugar_records")
        .select("*")
        .eq("user_id", user.id)
        .order("measured_at", { ascending: true });
        

      if (error) {
        console.error("Error fetching blood sugar history:", error);
        return [];
      }

      return data || [];
    },
  });

  // History: Blood Pressure
  const bloodPressureHistory = useQuery({
    queryKey: ["blood-pressure-history", user?.id],
    enabled: isEnabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blood_pressure_records")
        .select("*")
        .eq("user_id", user.id)
        .order("measured_at", { ascending: true });
      if (error) {
        console.error("Error fetching blood pressure history:", error);
        return [];
      }

      return data || [];
    },
  });

  // History: Weight
  const weightHistory = useQuery({
    queryKey: ["weight-history", user?.id],
    enabled: isEnabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("weight_records")
        .select("*")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error fetching weight history:", error);
        return [];
      }

      return data || [];
    },
  });

  

  return {
    bloodSugar: bloodSugar.data,
    bloodPressure: bloodPressure.data,
    weight: weight.data,
    bloodSugarHistory: bloodSugarHistory.data || [],
    bloodPressureHistory: bloodPressureHistory.data || [],
    weightHistory: weightHistory.data || [],
    isLoading:
      bloodSugar.isLoading ||
      bloodPressure.isLoading ||
      weight.isLoading ||
      bloodSugarHistory.isLoading ||
      bloodPressureHistory.isLoading ||
      weightHistory.isLoading,
  };
};
