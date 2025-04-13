
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, Heart, BookOpen, Clock, Apple, Weight, 
  MapPin, ArrowRight, CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabaseData } from "@/services/supabaseData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Types for location specific recommendations
interface FoodRecommendation {
  name: string;
  description: string;
  nutritionalValue: string;
  mealIdeas: string[];
}

interface ExerciseRecommendation {
  name: string;
  description: string;
  caloriesBurned: string;
  duration: string;
  tips: string[];
}

interface LocationRecommendations {
  region: string;
  foods: FoodRecommendation[];
  exercises: ExerciseRecommendation[];
  culturalNotes: string;
}

const WeightManagement = () => {
  const [userLocation, setUserLocation] = useState<string>("africa");
  const [recommendations, setRecommendations] = useState<LocationRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to fetch location-specific recommendations
  const fetchRecommendations = async (location: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would use an AI service or database
      // For now, using simulated data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Simulated response data
      let mockRecommendations: LocationRecommendations;
      
      if (location === "africa") {
        mockRecommendations = {
          region: "Africa",
          foods: [
            {
              name: "Millet",
              description: "A staple grain in many African countries that's highly nutritious and beneficial for weight management.",
              nutritionalValue: "Rich in dietary fiber, protein, and essential micronutrients. Lower glycemic index compared to refined grains.",
              mealIdeas: ["Millet porridge with fresh fruits", "Millet salad with vegetables", "Millet and bean stew"]
            },
            {
              name: "Moringa",
              description: "A nutrient-dense leafy green used across Africa with powerful health benefits.",
              nutritionalValue: "High in protein, vitamins A, C, and E. Contains significant amounts of calcium, potassium, and iron.",
              mealIdeas: ["Moringa smoothie", "Moringa soup", "Moringa-infused rice dishes"]
            },
            {
              name: "Okra",
              description: "A versatile vegetable that can help regulate blood sugar and support digestive health.",
              nutritionalValue: "Low in calories, rich in soluble fiber, vitamins C and K, and antioxidants.",
              mealIdeas: ["Okra soup", "Roasted okra", "Okra and tomato stew"]
            }
          ],
          exercises: [
            {
              name: "Community Dance",
              description: "Traditional dance styles that incorporate full-body movements and rhythmic patterns.",
              caloriesBurned: "400-600 calories per hour",
              duration: "30-60 minutes, 3-5 times per week",
              tips: ["Join local dance groups", "Practice with music at home", "Combine traditional movements with modern exercise routines"]
            },
            {
              name: "Outdoor Circuit Training",
              description: "Utilizing natural environments and minimal equipment for a full-body workout.",
              caloriesBurned: "500-700 calories per hour",
              duration: "20-40 minutes, 3-4 times per week",
              tips: ["Use rocks, logs, or body weight for resistance", "Exercise during cooler times of day", "Stay hydrated with clean water"]
            },
            {
              name: "Farm Work",
              description: "Traditional agricultural activities that provide natural exercise while being productive.",
              caloriesBurned: "300-500 calories per hour",
              duration: "Variable, incorporated into daily routine",
              tips: ["Focus on proper lifting techniques", "Rotate tasks to engage different muscle groups", "Schedule rest periods"]
            }
          ],
          culturalNotes: "African diets traditionally feature whole, unprocessed foods with plenty of vegetables, legumes, and grains. Portion control is important, as some traditional dishes may be calorie-dense."
        };
      } else if (location === "asia") {
        mockRecommendations = {
          region: "Asia",
          foods: [
            {
              name: "Brown Rice",
              description: "A nutritious alternative to white rice that provides more fiber and nutrients.",
              nutritionalValue: "Good source of fiber, manganese, selenium, and B vitamins. Helps maintain stable blood sugar.",
              mealIdeas: ["Brown rice with steamed vegetables", "Brown rice congee", "Brown rice sushi rolls"]
            },
            {
              name: "Tofu",
              description: "A versatile protein source that can be prepared in countless ways.",
              nutritionalValue: "High in protein, iron, calcium, and isoflavones. Low in calories and contains all essential amino acids.",
              mealIdeas: ["Mapo tofu", "Tofu stir-fry with vegetables", "Silken tofu with soy sauce and ginger"]
            },
            {
              name: "Bitter Melon",
              description: "A vegetable known for its ability to help regulate blood sugar levels.",
              nutritionalValue: "Very low in calories, high in vitamin C, folate, and antioxidants. Contains compounds that may help with insulin resistance.",
              mealIdeas: ["Bitter melon stir-fry", "Bitter melon soup", "Stuffed bitter melon"]
            }
          ],
          exercises: [
            {
              name: "Tai Chi",
              description: "A gentle form of martial arts focusing on slow, deliberate movements and breathing.",
              caloriesBurned: "200-300 calories per hour",
              duration: "30-60 minutes daily",
              tips: ["Learn from a qualified instructor", "Practice consistently", "Focus on proper form rather than speed"]
            },
            {
              name: "Urban Walking",
              description: "Utilizing city environments for walking exercises, incorporating stairs and inclines.",
              caloriesBurned: "200-400 calories per hour",
              duration: "30-60 minutes daily",
              tips: ["Use pedestrian walkways", "Walk to markets instead of driving", "Walk after meals"]
            },
            {
              name: "Indoor Calisthenics",
              description: "Body weight exercises that can be done in limited space.",
              caloriesBurned: "400-600 calories per hour",
              duration: "20-40 minutes, 3-5 times per week",
              tips: ["Create a routine that works in small spaces", "Use household items as equipment", "Focus on form and controlled movements"]
            }
          ],
          culturalNotes: "Asian dietary patterns often emphasize balance, moderation, and mindfulness. Traditional eating practices include small portions, plenty of vegetables, modest amounts of protein, and minimal processed foods."
        };
      } else {
        mockRecommendations = {
          region: "Western",
          foods: [
            {
              name: "Quinoa",
              description: "A complete protein grain that's versatile and filling.",
              nutritionalValue: "Rich in protein, fiber, magnesium, B vitamins, iron, potassium, and antioxidants.",
              mealIdeas: ["Quinoa salad with vegetables", "Quinoa breakfast bowl", "Quinoa stuffed peppers"]
            },
            {
              name: "Leafy Greens",
              description: "Vegetables like kale, spinach, and collard greens that are nutrient-dense and low in calories.",
              nutritionalValue: "High in vitamins A, C, K, and folate. Good source of fiber and antioxidants.",
              mealIdeas: ["Green smoothies", "Sautéed greens with garlic", "Mixed green salads with lean protein"]
            },
            {
              name: "Greek Yogurt",
              description: "A protein-rich dairy option that can help with satiety.",
              nutritionalValue: "High in protein, calcium, probiotics, and B vitamins. Lower in sugar than many yogurt varieties.",
              mealIdeas: ["Greek yogurt parfait with berries", "Yogurt-based dressing for salads", "Yogurt with nuts and honey"]
            }
          ],
          exercises: [
            {
              name: "High-Intensity Interval Training (HIIT)",
              description: "Short bursts of intense exercise alternated with low-intensity recovery periods.",
              caloriesBurned: "500-800 calories per hour",
              duration: "20-30 minutes, 3-4 times per week",
              tips: ["Start with shorter intervals", "Modify exercises to your fitness level", "Allow adequate recovery time"]
            },
            {
              name: "Strength Training",
              description: "Resistance exercises using weights or body weight to build muscle.",
              caloriesBurned: "300-500 calories per hour, plus afterburn effect",
              duration: "30-45 minutes, 2-3 times per week",
              tips: ["Focus on major muscle groups", "Use proper form", "Progressively increase resistance"]
            },
            {
              name: "Cycling",
              description: "Indoor or outdoor cycling for cardiovascular fitness and lower body strength.",
              caloriesBurned: "400-800 calories per hour",
              duration: "30-60 minutes, 3-5 times per week",
              tips: ["Adjust bike fit properly", "Mix in interval training", "Join group rides for motivation"]
            }
          ],
          culturalNotes: "Western dietary patterns benefit from incorporating more whole foods and fewer processed items. Focus on controlling portion sizes and being mindful of hidden sugars and fats in packaged foods."
        };
      }
      
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Failed to load recommendations",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(userLocation);
  }, [userLocation]);

  const handleLocationChange = (value: string) => {
    setUserLocation(value);
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-health-dark">Weight Management</h1>
            <p className="text-muted-foreground">
              Personalized recommendations to help you maintain a healthy weight
            </p>
          </div>
          <Button className="bg-health-primary hover:bg-health-accent">
            <Activity className="mr-2 h-4 w-4" />
            Log Today's Weight
          </Button>
        </div>

        {/* Location Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Location-Specific Recommendations
            </CardTitle>
            <CardDescription>
              Get personalized diet and exercise recommendations based on your location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-64">
                <Select defaultValue={userLocation} onValueChange={handleLocationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="western">Western</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                Your recommendations will be tailored to foods and activities available in your region.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Region-specific content */}
        {recommendations && (
          <Tabs defaultValue="diet" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="diet" className="flex items-center justify-center">
                <Apple className="mr-2 h-4 w-4" />
                Diet Recommendations
              </TabsTrigger>
              <TabsTrigger value="exercise" className="flex items-center justify-center">
                <Activity className="mr-2 h-4 w-4" />
                Exercise Recommendations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="diet" className="space-y-4 mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium">Cultural Note for {recommendations.region}</p>
                <p className="text-sm mt-1">{recommendations.culturalNotes}</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.foods.map((food, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-health-primary/10 pb-2">
                      <CardTitle className="text-lg">{food.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <p className="text-sm">{food.description}</p>
                      
                      <div>
                        <h4 className="text-sm font-medium">Nutritional Value</h4>
                        <p className="text-sm text-muted-foreground">{food.nutritionalValue}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Meal Ideas</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5">
                          {food.mealIdeas.map((idea, i) => (
                            <li key={i}>{idea}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="exercise" className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.exercises.map((exercise, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-health-primary/10 pb-2">
                      <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <p className="text-sm">{exercise.description}</p>
                      
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-health-primary" />
                          <span>{exercise.caloriesBurned}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-health-primary" />
                          <span>{exercise.duration}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Tips</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5">
                          {exercise.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Weight Tracking Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Weight className="mr-2 h-5 w-5" />
              Your Weight Journey
            </CardTitle>
            <CardDescription>
              Track your progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
              <div className="rounded-full bg-blue-100 p-3">
                <Weight className="h-8 w-8 text-health-primary" />
              </div>
              <h3 className="text-lg font-medium">Start Tracking Your Weight</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Log your weight regularly to see your progress over time. This will help you stay motivated and make informed decisions about your health journey.
              </p>
              <Button className="mt-4 bg-health-primary hover:bg-health-accent">
                Start Tracking Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Health Coaching */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Personalized Health Coaching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-health-primary/20 to-health-accent/20 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">Need more personalized guidance?</h3>
                  <p className="text-sm">
                    Connect with a health coach specializing in weight management for one-on-one support tailored to your specific needs and goals.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      <span>Custom meal plans</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      <span>Exercise routines</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      <span>Behavioral support</span>
                    </div>
                  </div>
                </div>
                <Button className="flex items-center whitespace-nowrap bg-health-primary hover:bg-health-accent">
                  Connect with a Coach <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default WeightManagement;
