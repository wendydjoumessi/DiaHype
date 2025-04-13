
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video } from "lucide-react";

export const UpcomingAppointmentsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Upcoming Appointments</CardTitle>
        <CardDescription>Manage your scheduled consultations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4 border border-muted">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Dr. Sarah Williams</h3>
                  <p className="text-sm text-muted-foreground">Endocrinologist</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Video Consultation
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <Calendar className="mr-2 h-4 w-4" />
              <span>June 15, 2023 - 10:30 AM (25 min)</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <Button size="sm" className="flex-1">
                <Video className="mr-2 h-4 w-4" />
                Join Call
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Reschedule
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 border border-muted">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Dr. Raj Patel</h3>
                  <p className="text-sm text-muted-foreground">Cardiologist</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                In-Person Visit
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <Calendar className="mr-2 h-4 w-4" />
              <span>July 3, 2023 - 9:00 AM (45 min)</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <Button size="sm" className="flex-1">
                Directions
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Reschedule
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
