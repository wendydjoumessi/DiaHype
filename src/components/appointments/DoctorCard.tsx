
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  experience: string;
  nextAvailable: string;
  about: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onChatClick: (doctorId: string) => void;
  onBookClick: (doctorId: string) => void;
}

export const DoctorCard = ({ doctor, onChatClick, onBookClick }: DoctorCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={doctor.avatar} alt={doctor.name} />
            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-lg">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          <div className="flex items-center mt-2">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
            <span className="text-sm font-medium">{doctor.rating}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{doctor.experience}</span>
          </div>
        </div>
        <div className="border-t pt-4">
          <p className="text-sm mb-2">
            <span className="font-medium">Next Available:</span> {doctor.nextAvailable}
          </p>
          <p className="text-sm text-muted-foreground truncate">{doctor.about}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-col md:flex-row gap-2 pt-0">
        <Button 
          onClick={() => onChatClick(doctor.id)} 
          variant="outline" 
          className="w-full md:order-first sm:order-first"
        >
          Chat with Doctor
        </Button>
        <Button 
          onClick={() => onBookClick(doctor.id)} 
          className="w-full bg-health-primary hover:bg-health-accent"
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}
