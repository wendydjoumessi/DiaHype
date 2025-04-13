
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DoctorChat } from "@/components/DoctorChat";
import { toast } from "@/components/ui/use-toast";
import { DoctorCard } from "@/components/appointments/DoctorCard";
import { DoctorSearch } from "@/components/appointments/DoctorSearch";
import { AppointmentScheduler } from "@/components/appointments/AppointmentScheduler";
import { DoctorDetails } from "@/components/appointments/DoctorDetails";
import { UpcomingAppointmentsList } from "@/components/appointments/UpcomingAppointmentsList";
import { doctors, timeSlots } from "@/data/doctors";

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("find-doctor");
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appointmentType, setAppointmentType] = useState("video");

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setActiveTab("schedule");
  };

  const handleChatWithDoctor = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setActiveTab("chat");
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    const doctor = doctors.find(d => d.id === selectedDoctor);
    
    toast({
      title: "Appointment Scheduled!",
      description: `Your ${appointmentType} appointment with ${doctor?.name} is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
    });
    
    // Reset selection and go back to doctor list
    setSelectedDoctor(null);
    setSelectedDate(new Date());
    setSelectedTime(null);
    setActiveTab("upcoming");
  };

  const getCurrentDoctor = () => {
    return doctors.find(d => d.id === selectedDoctor);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-health-dark">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage your healthcare appointments</p>
        </div>

        <Tabs defaultValue="find-doctor" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="find-doctor">Find a Doctor</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          
          {/* Find a Doctor Tab */}
          <TabsContent value="find-doctor" className="space-y-6">
            <DoctorSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id}
                  doctor={doctor}
                  onChatClick={handleChatWithDoctor}
                  onBookClick={handleDoctorSelect}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            {selectedDoctor ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AppointmentScheduler 
                  onBack={() => {
                    setSelectedDoctor(null);
                    setActiveTab("find-doctor");
                  }}
                  onBook={handleBookAppointment}
                  appointmentType={appointmentType}
                  setAppointmentType={setAppointmentType}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  timeSlots={timeSlots}
                />
                
                {getCurrentDoctor() && (
                  <DoctorDetails 
                    doctor={getCurrentDoctor()!} 
                    appointmentType={appointmentType} 
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No Doctor Selected</h3>
                <p className="text-muted-foreground mb-4">Please select a doctor to schedule an appointment</p>
                <Button onClick={() => setActiveTab("find-doctor")}>Find a Doctor</Button>
              </div>
            )}
          </TabsContent>
          
          {/* Upcoming Appointments Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <UpcomingAppointmentsList />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Appointments;
