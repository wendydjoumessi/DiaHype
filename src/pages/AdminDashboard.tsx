
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, CalendarClock, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabaseData } from "@/services/supabaseData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("all");
  const [doctorSearchQuery, setDoctorSearchQuery] = useState("");

  // Fetch data using react-query
  const { data: doctors = [], isLoading: isDoctorsLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: supabaseData.getDoctors,
  });

  const { data: appointments = [], isLoading: isAppointmentsLoading } = useQuery({
    queryKey: ['all-appointments'],
    queryFn: () => supabaseData.getAllAppointments(),
  });

  const { data: patients = [], isLoading: isPatientsLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: () => supabaseData.getPatients(),
  });

  // Stats
  const activeUsers = patients.filter(user => user.isActive).length;
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'scheduled').length;
  const activeDoctors = doctors.filter(doc => doc.isActive).length;

  // Filter users based on search query and status
  const filteredPatients = patients.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesStatus = userStatusFilter === "all" || 
                          (userStatusFilter === "active" && user.isActive) || 
                          (userStatusFilter === "inactive" && !user.isActive);
    return matchesSearch && matchesStatus;
  });

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(doctorSearchQuery.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(doctorSearchQuery.toLowerCase())
  );

  const handleToggleUserStatus = (userId: string, currentStatus: boolean) => {
    // This would call the update user status in a real implementation
    toast.success(`User status ${currentStatus ? 'deactivated' : 'activated'} successfully`);
  };

  const handleToggleDoctorStatus = (doctorId: string, currentStatus: boolean) => {
    // This would call the update doctor status in a real implementation
    toast.success(`Doctor ${currentStatus ? 'deactivated' : 'activated'} successfully`);
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  System Alerts
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>System Alerts</DialogTitle>
                  <DialogDescription>
                    Recent system alerts and notifications
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-700 text-sm">
                      Database backup scheduled for tonight at 2:00 AM
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">
                      System update completed successfully
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-3xl font-bold">{isPatientsLoading ? "..." : patients.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-500 font-medium">{activeUsers} active</span> users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Doctors</p>
                  <p className="text-3xl font-bold">{isDoctorsLoading ? "..." : activeDoctors}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Out of {doctors.length} registered doctors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Appointments</p>
                  <p className="text-3xl font-bold">{isAppointmentsLoading ? "..." : totalAppointments}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CalendarClock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-amber-500 font-medium">{pendingAppointments} pending</span> appointments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Message Interactions</p>
                  <p className="text-3xl font-bold">1,245</p>
                </div>
                <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-pink-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-500 font-medium">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Manage Patients</TabsTrigger>
            <TabsTrigger value="doctors">Manage Doctors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Hospital Activity Overview</CardTitle>
                <CardDescription>
                  Monitor recent activities across the hospital system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Recent Logins</h3>
                    <div className="space-y-3">
                      {patients.slice(0, 5).map((patient, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{patient.name}</p>
                              <p className="text-xs text-muted-foreground">{patient.email}</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Today, 09:15 AM</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Recent Appointments</h3>
                    <div className="space-y-3">
                      {appointments.slice(0, 5).map((appointment, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              {doctors.find(d => d.id === appointment.doctorId)?.name || 'Unknown Doctor'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {appointment.date}, {appointment.time}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            appointment.status === 'completed' ? 'bg-green-100 text-green-700' : 
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Patients</CardTitle>
                <CardDescription>
                  View and manage all patient accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search patients..." 
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={userStatusFilter}
                    onValueChange={setUserStatusFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_1fr_auto_auto] gap-4 p-4 font-medium border-b">
                    <div>Patient</div>
                    <div className="hidden sm:block">Email</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  
                  {isPatientsLoading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading patients...</div>
                  ) : filteredPatients.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No patients found matching your criteria</div>
                  ) : (
                    filteredPatients.map((patient, i) => (
                      <div key={i} className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_1fr_auto_auto] gap-4 p-4 border-b last:border-0 items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{patient.name}</div>
                        </div>
                        <div className="hidden sm:block text-sm text-muted-foreground truncate">
                          {patient.email}
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            patient.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {patient.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div>
                          <Button
                            size="sm"
                            variant={patient.isActive ? "destructive" : "default"}
                            onClick={() => handleToggleUserStatus(patient.id, patient.isActive)}
                          >
                            {patient.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Doctors</CardTitle>
                <CardDescription>
                  View and manage all doctor accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search doctors..." 
                      value={doctorSearchQuery}
                      onChange={(e) => setDoctorSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_1fr_auto_auto] gap-4 p-4 font-medium border-b">
                    <div>Doctor</div>
                    <div className="hidden sm:block">Specialty</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  
                  {isDoctorsLoading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading doctors...</div>
                  ) : filteredDoctors.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No doctors found matching your criteria</div>
                  ) : (
                    filteredDoctors.map((doctor, i) => (
                      <div key={i} className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_1fr_auto_auto] gap-4 p-4 border-b last:border-0 items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={doctor.avatar} />
                            <AvatarFallback>{doctor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{doctor.name}</div>
                        </div>
                        <div className="hidden sm:block text-sm text-muted-foreground">
                          {doctor.specialty}
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doctor.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {doctor.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div>
                          <Button
                            size="sm"
                            variant={doctor.isActive ? "destructive" : "default"}
                            onClick={() => handleToggleDoctorStatus(doctor.id, doctor.isActive)}
                          >
                            {doctor.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
