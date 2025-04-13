
import { Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const appointments = [
  {
    doctor: "Dr. Williams",
    specialty: "Endocrinologist",
    date: "June 15, 2023",
    time: "10:30 AM",
    type: "video",
  },
  {
    doctor: "Dr. Martinez",
    specialty: "Primary Care",
    date: "July 3, 2023",
    time: "9:00 AM",
    type: "in-person",
  }
];

export function UpcomingAppointments() {
  return (
    <div className="space-y-4">
      {appointments.map((apt, index) => (
        <div key={index} className="p-3 rounded-lg border flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center mt-1",
              apt.type === "video" ? "bg-health-primary text-white" : "bg-health-success text-white"
            )}>
              {apt.type === "video" ? <Video size={16} /> : <Calendar size={16} />}
            </div>
            <div>
              <p className="font-medium text-sm">{apt.doctor}</p>
              <p className="text-xs text-gray-500">{apt.specialty}</p>
              <p className="text-xs mt-1">{apt.date} • {apt.time}</p>
              <div className="flex space-x-2 mt-2">
                <Button size="sm" className="h-7 text-xs px-2 bg-health-primary hover:bg-health-accent">
                  {apt.type === "video" ? "Join Call" : "Directions"}
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs px-2">
                  Reschedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full">Schedule New Appointment</Button>
    </div>
  );
}
