import { supabase } from "@/lib/supabase";

// Function to save onboarding data to Supabase
export const saveOnboardingData = async (userId: string, data: any): Promise<{ success: boolean; error: Error | null }> => {
  try {
    console.log("Saving onboarding data for user:", userId);
    
    // For demo/development without authentication:
    if (userId === "00000000-0000-0000-0000-000000000000") {
      console.log("Using mock user ID for development. Data would be saved:", data);
      return { success: true, error: null };
    }
    
    // First, update the user's profile with basic info
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        name: data.name,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        onboardingCompleted: true
      })
      .eq('id', userId);
    
    if (profileError) throw profileError;
    
    // Then insert the health measurements
    if (data.bloodPressure || data.glucose || data.cholesterol) {
      const { error: measurementError } = await supabase
        .from('health_measurements')
        .insert({
          user_id: userId,
          blood_pressure: data.bloodPressure,
          blood_glucose: data.glucose,
          cholesterol: data.cholesterol,
          recorded_at: new Date().toISOString()
        });
      
      if (measurementError) throw measurementError;
    }
    
    // Save health conditions
    if (data.existingConditions.length > 0) {
      const conditionsToInsert = data.existingConditions.map((condition: string) => ({
        user_id: userId,
        condition_name: condition,
        is_active: true
      }));
      
      const { error: conditionsError } = await supabase
        .from('health_conditions')
        .insert(conditionsToInsert);
      
      if (conditionsError) throw conditionsError;
    }
    
    // Save family history
    if (data.familyHistory.length > 0) {
      const historyToInsert = data.familyHistory.map((condition: string) => ({
        user_id: userId,
        condition_name: condition
      }));
      
      const { error: historyError } = await supabase
        .from('family_history')
        .insert(historyToInsert);
      
      if (historyError) throw historyError;
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    return { success: false, error: error as Error };
  }
};

// Function to get the first user ID from the database (fallback for development only)
export const getFirstUserId = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)
      .single();
    
    if (error) {
      console.error('Error getting first user ID:', error);
      return null;
    }
    
    return data?.id || null;
  } catch (error) {
    console.error('Error in getFirstUserId:', error);
    return null;
  }
};
