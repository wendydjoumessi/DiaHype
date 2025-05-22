import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useRegionBasedRecommendations = () => {
  const { user, profile } = useAuth();
  
  // Get user country from profile if available
  const userCountry = profile?.country || 'default';

  // Fetch country-specific diet recommendations
  const dietRecommendations = useQuery({
    queryKey: ['diet-recommendations', userCountry],
    queryFn: async () => {
      try {
        // Here we would ideally query from Supabase based on country
        // For now, we'll simulate different recommendations based on country
        
        // Common diet recommendations that work across cultures
        const commonRecommendations = [
          {
            title: "Portion Control",
            description: "Use smaller plates and practice mindful eating to reduce calorie intake.",
            category: "Weight Management",
            icon: "Salad",
            foods: ["Vegetables (fill half your plate)", "Lean proteins", "Whole grains (quarter plate)"],
            avoid: ["Sugary beverages", "Processed foods", "Large portion sizes"],
            mealPlan: "Focus on protein and fiber at each meal to promote fullness with fewer calories."
          },
          {
            title: "Low-Calorie, Nutrient-Dense Foods",
            description: "Emphasize foods with high nutritional value and lower calories.",
            category: "Weight Management",
            icon: "Apple",
            foods: ["Leafy greens", "Berries", "Lean poultry", "Fish", "Legumes"],
            avoid: ["Fried foods", "High-fat dairy", "Refined carbohydrates"],
            mealPlan: "Aim for colorful meals with at least 3 different vegetables daily."
          },
          {
            title: "DASH Diet Approach",
            description: "Dietary Approaches to Stop Hypertension - proven to lower blood pressure.",
            category: "Blood Pressure",
            icon: "Heart",
            foods: ["Fruits", "Vegetables", "Whole grains", "Low-fat dairy", "Lean proteins"],
            avoid: ["Processed meats", "Canned soups", "Salty snacks"],
            mealPlan: "Aim for 4-5 servings each of fruits and vegetables daily."
          }
        ];
        
        // Region-specific additions
        const regionSpecificRecommendations: Record<string, any[]> = {
          'United States': [
            {
              title: "American Heart Association Diet",
              description: "Follow AHA guidelines for heart health and weight management.",
              category: "Heart Health",
              icon: "Heart",
              foods: ["Fish twice weekly", "Whole grains", "Fresh vegetables", "Lean meats"],
              avoid: ["Processed meats", "Fast food", "High sodium packaged foods"],
              mealPlan: "Aim for less than 2,300mg of sodium daily and limit added sugars."
            }
          ],
          'India': [
            {
              title: "Indian Diet Modifications",
              description: "Traditional Indian diet modified for health conditions.",
              category: "Balanced Nutrition",
              icon: "Apple",
              foods: ["Dal (lentils)", "Roti made from whole grains", "Seasonal vegetables", "Curd/yogurt"],
              avoid: ["Deep fried snacks", "Sweets high in sugar", "White rice in excess"],
              mealPlan: "Use pressure cooking instead of frying; replace ghee with mustard oil for cooking."
            }
          ],
          'Nigeria': [
            {
              title: "Nigerian Diet Adaptations",
              description: "Traditional West African diet adapted for health management.",
              category: "Balanced Nutrition",
              icon: "Apple",
              foods: ["Beans", "Fish", "Leafy vegetables", "Unrefined grains"],
              avoid: ["Palm oil in excess", "Fried foods", "High-sodium seasonings"],
              mealPlan: "Cook with less oil, incorporate more vegetables into traditional soups."
            }
          ],
          'Japan': [
            {
              title: "Japanese Diet Principles",
              description: "Traditional Japanese eating patterns for health.",
              category: "Balanced Nutrition",
              icon: "Fish",
              foods: ["Fatty fish", "Fermented foods", "Vegetables", "Green tea", "Small portions"],
              avoid: ["Excess sodium from soy sauce", "Processed versions of traditional foods"],
              mealPlan: "Follow the principle of hara hachi bu - eat until 80% full."
            }
          ],
          'China': [
            {
              title: "Chinese Diet Modifications",
              description: "Traditional Chinese eating patterns adapted for health management.",
              category: "Balanced Nutrition",
              icon: "Salad",
              foods: ["Variety of vegetables", "White fish", "Small amounts of rice", "Green tea"],
              avoid: ["MSG-heavy seasonings", "Deep fried dishes", "Sweet sauces"],
              mealPlan: "Emphasize steaming and stir-frying with minimal oil instead of deep frying."
            }
          ]
        };
        
        // Return recommendations based on region if available, otherwise use common recommendations
        return [
          ...(regionSpecificRecommendations[userCountry] || []),
          ...commonRecommendations
        ].slice(0, 4); // Return maximum 4 recommendations
        
      } catch (error) {
        console.error("Error fetching diet recommendations:", error);
        return [];
      }
    },
    enabled: true,
  });

  // Fetch country-specific exercise recommendations
  const exerciseRecommendations = useQuery({
    queryKey: ['exercise-recommendations', userCountry],
    queryFn: async () => {
      try {
        // Common exercise recommendations
        const commonExercises = [
          {
            title: "Walking",
            description: "Start with 20-30 minutes of brisk walking each day, gradually increasing duration.",
            intensity: "moderate",
            icon: "Activity",
            details: "Walking is a perfect low-impact exercise to start with. Begin with short sessions of 10-15 minutes and gradually work up to 30+ minutes daily. Find a comfortable pace where you can still talk but are slightly breathless.",
            benefits: ["Burns calories", "Improves cardiovascular health", "Low impact on joints", "Can be done anywhere"],
            duration: "30 minutes",
            frequency: "5-7 days per week",
            videoLink: "https://www.youtube.com/watch?v=njeZ29umqVE"
          },
          {
            title: "Swimming",
            description: "Low-impact exercise ideal for weight management and cardiovascular health.",
            intensity: "moderate",
            icon: "Dumbbell",
            details: "Swimming is excellent for people with excess weight as water supports your body, reducing strain on joints while providing resistance for muscle building.",
            benefits: ["Full body workout", "Burns significant calories", "Zero impact on joints", "Improves lung capacity"],
            duration: "30-45 minutes",
            frequency: "3-4 days per week",
            videoLink: "https://www.youtube.com/watch?v=s3FUBz0RJ18"
          },
          {
            title: "Cycling",
            description: "Improves heart health and helps lower blood pressure. Aim for 30 minutes 3-5 times weekly.",
            intensity: "moderate",
            icon: "Activity",
            details: "Stationary or outdoor cycling helps lower blood pressure by strengthening your heart and blood vessels. Start with 10-15 minute sessions and gradually build up.",
            benefits: ["Strengthens heart muscle", "Improves blood vessel elasticity", "Reduces blood pressure", "Low impact cardio"],
            duration: "30 minutes",
            frequency: "3-5 days per week",
            videoLink: "https://www.youtube.com/watch?v=tgqQdgxL9e0"
          }
        ];
        
        // Region-specific exercises
        const regionSpecificExercises: Record<string, any[]> = {
          'India': [
            {
              title: "Yoga",
              description: "Traditional Indian practice combining physical postures, breathing techniques, and meditation.",
              intensity: "moderate",
              icon: "Activity",
              details: "Yoga helps improve flexibility, strength, and mental wellbeing. It's particularly helpful for managing stress which can impact blood pressure and blood sugar levels.",
              benefits: ["Improves flexibility", "Reduces stress", "Enhances balance and coordination", "Strengthens core muscles"],
              duration: "30-60 minutes",
              frequency: "3-5 days per week",
              videoLink: "https://www.youtube.com/watch?v=v7AYKMP6rOE"
            }
          ],
          'China': [
            {
              title: "Tai Chi",
              description: "Ancient Chinese martial art involving slow, deliberate movements and breathing.",
              intensity: "light",
              icon: "Activity",
              details: "Tai Chi is particularly good for older adults and those with joint problems. The slow, controlled movements improve balance and reduce stress while being gentle on the body.",
              benefits: ["Improves balance", "Reduces stress", "Gentle on joints", "Enhances mind-body connection"],
              duration: "20-30 minutes",
              frequency: "Daily or 5 days per week",
              videoLink: "https://www.youtube.com/watch?v=cEOS2zoyQw4"
            }
          ],
          'Nigeria': [
            {
              title: "Dance Exercise",
              description: "Rhythmic movements based on traditional African dance patterns for fitness.",
              intensity: "moderate to high",
              icon: "Dumbbell",
              details: "Incorporating traditional dance movements into your workout provides both cardiovascular benefits and strengthens muscles in a culturally familiar way.",
              benefits: ["Burns calories", "Improves coordination", "Strengthens leg muscles", "Enjoyable social activity"],
              duration: "30 minutes",
              frequency: "3-4 days per week",
              videoLink: "https://www.youtube.com/watch?v=ZMO_XC9w7Lw"
            }
          ]
        };
        
        // Return recommendations based on region if available, otherwise use common recommendations
        return [
          ...(regionSpecificExercises[userCountry] || []),
          ...commonExercises
        ].slice(0, 4); // Return maximum 4 recommendations
        
      } catch (error) {
        console.error("Error fetching exercise recommendations:", error);
        return [];
      }
    },
    enabled: true,
  });

  return {
    dietRecommendations: dietRecommendations.data || [],
    exerciseRecommendations: exerciseRecommendations.data || [],
    isLoading: dietRecommendations.isLoading || exerciseRecommendations.isLoading,
    userCountry
  };
};
