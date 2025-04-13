
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface DoctorDetailsProps {
  doctor: Doctor;
  appointmentType: string;
}

export const DoctorDetails = ({ doctor, appointmentType }: DoctorDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Information</CardTitle>
        <CardDescription>Details about your selected doctor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={doctor.avatar} alt={doctor.name} />
              <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium">{doctor.name}</h3>
              <p className="text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">About</h4>
            <p className="text-sm text-muted-foreground">{doctor.about}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h4 className="font-medium mb-1">Experience</h4>
              <p className="text-sm text-muted-foreground">{doctor.experience}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Rating</h4>
              <p className="text-sm text-muted-foreground">{doctor.rating} / 5</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Appointment Info</h4>
            <p className="text-sm text-muted-foreground">
              {appointmentType === "video" && "Video consultations are conducted through our secure platform. You'll receive a link 10 minutes before your appointment."}
              {appointmentType === "phone" && "Our doctor will call you at your registered phone number at the scheduled time."}
              {appointmentType === "inperson" && "Visit our clinic at the scheduled time. Please arrive 15 minutes early to complete registration."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
