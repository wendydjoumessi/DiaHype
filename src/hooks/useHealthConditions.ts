
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export const useHealthConditions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["health-conditions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("health_conditions")
        .select("*")
        .eq("user_id", user.id)
        .order("diagnosis_date", { ascending: false });

      if (error) {
        console.error("Error fetching health conditions:", error);
        return [];
      }

      return data || [];
    },
    enabled: !!user?.id,
  });
};

