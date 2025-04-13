
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Video, Phone, Calendar as CalendarIcon } from "lucide-react";

interface AppointmentSchedulerProps {
  onBack: () => void;
  onBook: () => void;
  appointmentType: string;
  setAppointmentType: (type: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  timeSlots: string[];
}

export const AppointmentScheduler = ({
  onBack,
  onBook,
  appointmentType,
  setAppointmentType,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  timeSlots
}: AppointmentSchedulerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Date & Time</CardTitle>
        <CardDescription>Choose when you'd like to meet</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-4">
          <div>
            <div className="mb-3">
              <h3 className="mb-2 font-medium">Appointment Type</h3>
              <div className="flex space-x-2">
                <Button 
                  variant={appointmentType === "video" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setAppointmentType("video")}
                  className="flex-1"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Video Call
                </Button>
                <Button 
                  variant={appointmentType === "phone" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setAppointmentType("phone")}
                  className="flex-1"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Phone Call
                </Button>
                <Button 
                  variant={appointmentType === "inperson" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setAppointmentType("inperson")}
                  className="flex-1"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  In Person
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="mb-2 font-medium">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-2"
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              />
            </div>
            
            <div>
              <h3 className="mb-2 font-medium">Select Time</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Doctors
        </Button>
        <Button onClick={onBook}>
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};
