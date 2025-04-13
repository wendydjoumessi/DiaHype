import { supabase } from "@/lib/supabase";
import { doctors, timeSlots } from "@/data/doctors"; // We'll keep using this mock data initially

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  experience: string;
  nextAvailable: string;
  about: string;
  isActive?: boolean;
}

interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Patient {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  conditions?: string[];
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  timeOfDay: ("morning" | "noon" | "evening" | "night")[];
  withFood: boolean;
  withWater: boolean;
  refillDate?: string;
  timesPerDay: number;
}

interface DailyDose {
  id: string;
  medicationId: string;
  time: string;
  taken: boolean;
  timeOfDay: "morning" | "noon" | "evening" | "night";
}

interface WeightRecord {
  id: string;
  userId: string;
  weight: number;
  unit: string;
  notes?: string;
  timestamp: string;
}

interface BloodSugarRecord {
  id: string;
  userId: string;
  glucoseLevel: number;
  unit: string;
  measuredAt: string;
  mealContext: string;
  notes?: string;
}

interface BloodPressureRecord {
  id: string;
  userId: string;
  systolic: number;
  diastolic: number;
  pulseRate?: number;
  measuredAt: string;
  notes?: string;
}

// Simulated appointments data
const appointments: Appointment[] = [
  {
    id: 'appt-1',
    doctorId: 'dr-williams',
    patientId: 'user-123',
    date: '2023-09-15',
    time: '10:00 AM',
    status: 'scheduled'
  },
  {
    id: 'appt-2',
    doctorId: 'dr-patel',
    patientId: 'user-123',
    date: '2023-09-20',
    time: '2:30 PM',
    status: 'scheduled'
  },
  {
    id: 'appt-3',
    doctorId: 'dr-chen',
    patientId: 'user-456',
    date: '2023-09-18',
    time: '1:00 PM',
    status: 'completed'
  },
  {
    id: 'appt-4',
    doctorId: 'dr-rodriguez',
    patientId: 'user-789',
    date: '2023-09-22',
    time: '11:30 AM',
    status: 'scheduled'
  },
  {
    id: 'appt-5',
    doctorId: 'dr-williams',
    patientId: 'user-123',
    date: '2023-09-25',
    time: '9:30 AM',
    status: 'scheduled'
  }
];

// Simulated patients data
const patients: Patient[] = [
  {
    id: 'user-123',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    isActive: true,
    conditions: ['diabetes', 'hypertension']
  },
  {
    id: 'user-456',
    name: 'Michael Smith',
    email: 'michael.smith@example.com',
    isActive: true,
    conditions: ['diabetes']
  },
  {
    id: 'user-789',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    isActive: false,
    conditions: ['hypertension']
  },
  {
    id: 'user-101',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    isActive: true,
    conditions: ['diabetes', 'asthma']
  },
  {
    id: 'user-102',
    name: 'Jennifer Brown',
    email: 'jennifer.brown@example.com',
    isActive: true,
    conditions: ['diabetes']
  }
];

// Simulated conversations data
const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'dr-williams',
    participantName: 'Dr. Sarah Williams',
    participantAvatar: '/placeholder.svg',
    lastMessage: 'Your latest blood glucose readings look good.',
    lastMessageTime: '10:30 AM',
    unreadCount: 2
  },
  {
    id: 'conv-2',
    participantId: 'dr-patel',
    participantName: 'Dr. Raj Patel',
    participantAvatar: '/placeholder.svg',
    lastMessage: 'Please remember to take your blood pressure readings daily.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'conv-3',
    participantId: 'dr-rodriguez',
    participantName: 'Dr. Elena Rodriguez',
    participantAvatar: '/placeholder.svg',
    lastMessage: 'We need to discuss adjusting your diet plan.',
    lastMessageTime: 'Tuesday',
    unreadCount: 0
  }
];

// Simulated messages data
const messages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'dr-williams',
    receiverId: 'user-123',
    content: 'Your latest blood glucose readings look good. Keep up with the current medication schedule.',
    timestamp: '2023-09-25T10:30:00',
    isRead: false
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'user-123',
    receiverId: 'dr-williams',
    content: 'Thank you, doctor. I\'ve been following the diet plan as well.',
    timestamp: '2023-09-25T10:32:00',
    isRead: true
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'dr-williams',
    receiverId: 'user-123',
    content: 'That\'s excellent! Let\'s schedule a follow-up appointment next month.',
    timestamp: '2023-09-25T10:35:00',
    isRead: false
  },
  {
    id: 'msg-4',
    conversationId: 'conv-2',
    senderId: 'dr-patel',
    receiverId: 'user-123',
    content: 'Please remember to take your blood pressure readings daily. It helps us monitor your condition better.',
    timestamp: '2023-09-24T14:20:00',
    isRead: true
  },
  {
    id: 'msg-5',
    conversationId: 'conv-2',
    senderId: 'user-123',
    receiverId: 'dr-patel',
    content: 'I\'ll make sure to do that. My readings have been stable lately.',
    timestamp: '2023-09-24T14:25:00',
    isRead: true
  }
];

// Simulated medications data
const medications: Medication[] = [
  {
    id: 'med-1',
    name: 'Metformin',
    dosage: '500mg',
    instructions: 'Take with food to minimize stomach upset',
    frequency: 'Twice daily',
    startDate: '2023-08-01',
    timeOfDay: ['morning', 'evening'],
    withFood: true,
    withWater: true,
    refillDate: '2023-10-01',
    timesPerDay: 2
  },
  {
    id: 'med-2',
    name: 'Lisinopril',
    dosage: '10mg',
    instructions: 'Take at the same time each day',
    frequency: 'Once daily',
    startDate: '2023-07-15',
    timeOfDay: ['morning'],
    withFood: false,
    withWater: true,
    timesPerDay: 1
  },
  {
    id: 'med-3',
    name: 'Multivitamin',
    dosage: '1 tablet',
    instructions: '',
    frequency: 'Once daily',
    startDate: '2023-05-10',
    timeOfDay: ['morning'],
    withFood: true,
    withWater: true,
    timesPerDay: 1
  }
];

// Simulated daily doses data
const dailyDoses: DailyDose[] = [
  {
    id: 'dose-1',
    medicationId: 'med-1',
    time: '8:00 AM',
    taken: true,
    timeOfDay: 'morning'
  },
  {
    id: 'dose-2',
    medicationId: 'med-1',
    time: '8:00 PM',
    taken: false,
    timeOfDay: 'evening'
  },
  {
    id: 'dose-3',
    medicationId: 'med-2',
    time: '9:00 AM',
    taken: true,
    timeOfDay: 'morning'
  },
  {
    id: 'dose-4',
    medicationId: 'med-3',
    time: '9:00 AM',
    taken: true,
    timeOfDay: 'morning'
  }
];

// Enhanced doctors data with active status
const enhancedDoctors = doctors.map(doctor => ({
  ...doctor,
  isActive: Math.random() > 0.2 // Randomly set most doctors as active
}));

export const supabaseData = {
  // Get all doctors
  getDoctors: async (): Promise<Doctor[]> => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*');
      
      if (error) {
        console.error('Error fetching doctors:', error);
        return enhancedDoctors; // Fallback to mock data
      }
      
      return data;
    } catch (error) {
      console.error('Error in getDoctors:', error);
      return enhancedDoctors; // Fallback to mock data
    }
  },
  
  // Get doctor by ID
  getDoctorById: async (doctorId: string): Promise<Doctor | null> => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', doctorId)
        .single();
      
      if (error) {
        console.error('Error fetching doctor:', error);
        return enhancedDoctors.find(d => d.id === doctorId) || null; // Fallback to mock data
      }
      
      return data;
    } catch (error) {
      console.error('Error in getDoctorById:', error);
      return enhancedDoctors.find(d => d.id === doctorId) || null; // Fallback to mock data
    }
  },
  
  // Get available appointment slots for a doctor
  getAvailableSlots: async (doctorId: string, date: string): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from('available_slots')
        .select('time')
        .eq('doctor_id', doctorId)
        .eq('date', date);
      
      if (error) {
        console.error('Error fetching available slots:', error);
        return timeSlots; // Fallback to mock data
      }
      
      return data.map(slot => slot.time);
    } catch (error) {
      console.error('Error in getAvailableSlots:', error);
      return timeSlots; // Fallback to mock data
    }
  },
  
  // Book an appointment
  bookAppointment: async (doctorId: string, patientId: string, date: string, time: string): Promise<Appointment> => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          { doctor_id: doctorId, patient_id: patientId, date, time, status: 'scheduled' }
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        doctorId: data.doctor_id,
        patientId: data.patient_id,
        date: data.date,
        time: data.time,
        status: data.status
      };
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Create a mock appointment as fallback
      return {
        id: `appt-${Math.random().toString(36).substring(2, 9)}`,
        doctorId,
        patientId,
        date,
        time,
        status: 'scheduled'
      };
    }
  },
  
  // Get appointments for a patient
  getPatientAppointments: async (patientId: string): Promise<Appointment[]> => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patientId);
      
      if (error) throw error;
      
      return data.map(appointment => ({
        id: appointment.id,
        doctorId: appointment.doctor_id,
        patientId: appointment.patient_id,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      }));
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      // Return empty array as fallback
      return [];
    }
  },
  
  // Get all appointments
  getAllAppointments: async (): Promise<Appointment[]> => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*');
      
      if (error) throw error;
      
      return data.map(appointment => ({
        id: appointment.id,
        doctorId: appointment.doctor_id,
        patientId: appointment.patient_id,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      }));
    } catch (error) {
      console.error('Error fetching all appointments:', error);
      return []; // Return empty array as fallback
    }
  },
  
  // Cancel an appointment
  cancelAppointment: async (appointmentId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      return false;
    }
  },
  
  // Get all patients
  getPatients: async (): Promise<Patient[]> => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*');
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      return []; // Return empty array as fallback
    }
  },
  
  // Get patient by ID
  getPatientById: async (patientId: string): Promise<Patient | null> => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching patient:', error);
      return null;
    }
  },
  
  // Get conversations for a user
  getConversations: async (userId: string): Promise<Conversation[]> => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);
      
      if (error) throw error;
      
      return data.map(conv => ({
        id: conv.id,
        participantId: conv.sender_id === userId ? conv.receiver_id : conv.sender_id,
        participantName: conv.sender_id === userId ? conv.receiver_name : conv.sender_name,
        participantAvatar: conv.sender_id === userId ? conv.receiver_avatar : conv.sender_avatar,
        lastMessage: conv.last_message,
        lastMessageTime: conv.last_message_time,
        unreadCount: conv.unread_count
      }));
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return conversations; // Fallback to mock data
    }
  },
  
  // Get messages for a conversation
  getMessages: async (conversationId: string): Promise<Message[]> => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });
      
      if (error) throw error;
      
      return data.map(msg => ({
        id: msg.id,
        conversationId: msg.conversation_id,
        senderId: msg.sender_id,
        receiverId: msg.receiver_id,
        content: msg.content,
        timestamp: msg.timestamp,
        isRead: msg.is_read
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      return messages.filter(m => m.conversationId === conversationId); // Fallback to mock data
    }
  },
  
  // Send a message
  sendMessage: async (conversationId: string, senderId: string, receiverId: string, content: string): Promise<Message> => {
    try {
      const newMessage = {
        conversation_id: conversationId,
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        timestamp: new Date().toISOString(),
        is_read: false
      };
      
      const { data, error } = await supabase
        .from('messages')
        .insert([newMessage])
        .select()
        .single();
      
      if (error) throw error;
      
      // Update conversation last message
      await supabase
        .from('conversations')
        .update({
          last_message: content,
          last_message_time: 'Just now',
          unread_count: supabase.rpc('increment_unread', { conversation_id: conversationId })
        })
        .eq('id', conversationId);
      
      return {
        id: data.id,
        conversationId: data.conversation_id,
        senderId: data.sender_id,
        receiverId: data.receiver_id,
        content: data.content,
        timestamp: data.timestamp,
        isRead: data.is_read
      };
    } catch (error) {
      console.error('Error sending message:', error);
      // Create a mock message as fallback
      const newMessage: Message = {
        id: `msg-${Math.random().toString(36).substring(2, 9)}`,
        conversationId,
        senderId,
        receiverId,
        content,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      messages.push(newMessage);
      
      // Update conversation last message in mock data
      const conversationIndex = conversations.findIndex(c => c.id === conversationId);
      if (conversationIndex !== -1) {
        conversations[conversationIndex].lastMessage = content;
        conversations[conversationIndex].lastMessageTime = 'Just now';
        // Increment unread count if message is from the other participant
        if (senderId !== 'user-123') { // Assuming user-123 is the current user
          conversations[conversationIndex].unreadCount += 1;
        }
      }
      
      return newMessage;
    }
  },
  
  // Get medications for a user
  getMedications: async (userId: string): Promise<Medication[]> => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      return data.map(med => ({
        id: med.id,
        name: med.name,
        dosage: med.dosage,
        instructions: med.instructions,
        frequency: med.frequency,
        startDate: med.start_date,
        endDate: med.end_date,
        timeOfDay: med.time_of_day,
        withFood: med.with_food,
        withWater: med.with_water,
        refillDate: med.refill_date,
        timesPerDay: med.times_per_day
      }));
    } catch (error) {
      console.error('Error fetching medications:', error);
      return medications; // Fallback to mock data
    }
  },
  
  // Get daily doses for a user
  getDailyDoses: async (userId: string): Promise<DailyDose[]> => {
    try {
      const { data, error } = await supabase
        .from('daily_doses')
        .select('*, medications!inner(*)')
        .eq('medications.user_id', userId);
      
      if (error) throw error;
      
      return data.map(dose => ({
        id: dose.id,
        medicationId: dose.medication_id,
        time: dose.time,
        taken: dose.taken,
        timeOfDay: dose.time_of_day
      }));
    } catch (error) {
      console.error('Error fetching daily doses:', error);
      return dailyDoses; // Fallback to mock data
    }
  },
  
  // Mark a dose as taken
  markDoseTaken: async (doseId: string, taken: boolean): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('daily_doses')
        .update({ taken })
        .eq('id', doseId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error marking dose as taken:', error);
      
      // Update in mock data as fallback
      const doseIndex = dailyDoses.findIndex(d => d.id === doseId);
      if (doseIndex !== -1) {
        dailyDoses[doseIndex].taken = taken;
        return true;
      }
      
      return false;
    }
  },
  
  // Create a new conversation
  createConversation: async (
    userId: string, 
    participantId: string, 
    participantName: string, 
    participantAvatar: string
  ): Promise<Conversation> => {
    try {
      const newConversation = {
        sender_id: userId,
        receiver_id: participantId,
        sender_name: 'Current User', // In a real app, you'd get the current user's name
        receiver_name: participantName,
        sender_avatar: '/placeholder.svg', // In a real app, you'd get the current user's avatar
        receiver_avatar: participantAvatar,
        last_message: "New conversation started",
        last_message_time: "Just now",
        unread_count: 0
      };
      
      const { data, error } = await supabase
        .from('conversations')
        .insert([newConversation])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        participantId,
        participantName,
        participantAvatar,
        lastMessage: data.last_message,
        lastMessageTime: data.last_message_time,
        unreadCount: data.unread_count
      };
    } catch (error) {
      console.error('Error creating conversation:', error);
      
      // Create a mock conversation as fallback
      const newConversation: Conversation = {
        id: `conv-${Math.random().toString(36).substring(2, 9)}`,
        participantId,
        participantName,
        participantAvatar,
        lastMessage: "New conversation started",
        lastMessageTime: "Just now",
        unreadCount: 0
      };
      
      conversations.push(newConversation);
      
      return newConversation;
    }
  },
  
  // Log weight measurement
  logWeight: async (userId: string, weight: number, unit: string, notes?: string): Promise<WeightRecord | null> => {
    try {
      const record = {
        user_id: userId,
        weight,
        unit,
        notes,
        timestamp: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('weight_records')
        .insert([record])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        userId: data.user_id,
        weight: data.weight,
        unit: data.unit,
        notes: data.notes,
        timestamp: data.timestamp
      };
    } catch (error) {
      console.error('Error logging weight:', error);
      return null;
    }
  },
  
  // Get weight records for a user
  getWeightRecords: async (userId: string): Promise<WeightRecord[]> => {
    try {
      const { data, error } = await supabase
        .from('weight_records')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      
      return data.map(record => ({
        id: record.id,
        userId: record.user_id,
        weight: record.weight,
        unit: record.unit,
        notes: record.notes,
        timestamp: record.timestamp
      }));
    } catch (error) {
      console.error('Error fetching weight records:', error);
      return [];
    }
  },
  
  // Log blood sugar measurement
  logBloodSugar: async (
    userId: string, 
    glucoseLevel: number, 
    unit: string, 
    mealContext: string, 
    notes?: string
  ): Promise<BloodSugarRecord | null> => {
    try {
      const record = {
        user_id: userId,
        glucose_level: glucoseLevel,
        unit,
        measured_at: new Date().toISOString(),
        meal_context: mealContext,
        notes
      };
      
      const { data, error } = await supabase
        .from('blood_sugar_records')
        .insert([record])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        userId: data.user_id,
        glucoseLevel: data.glucose_level,
        unit: data.unit,
        measuredAt: data.measured_at,
        mealContext: data.meal_context,
        notes: data.notes
      };
    } catch (error) {
      console.error('Error logging blood sugar:', error);
      return null;
    }
  },
  
  // Get blood sugar records for a user
  getBloodSugarRecords: async (userId: string): Promise<BloodSugarRecord[]> => {
    try {
      const { data, error } = await supabase
        .from('blood_sugar_records')
        .select('*')
        .eq('user_id', userId)
        .order('measured_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(record => ({
        id: record.id,
        userId: record.user_id,
        glucoseLevel: record.glucose_level,
        unit: record.unit,
        measuredAt: record.measured_at,
        mealContext: record.meal_context,
        notes: record.notes
      }));
    } catch (error) {
      console.error('Error fetching blood sugar records:', error);
      return [];
    }
  },
  
  // Log blood pressure measurement
  logBloodPressure: async (
    userId: string, 
    systolic: number, 
    diastolic: number, 
    pulseRate?: number, 
    notes?: string
  ): Promise<BloodPressureRecord | null> => {
    try {
      const record = {
        user_id: userId,
        systolic,
        diastolic,
        pulse_rate: pulseRate,
        measured_at: new Date().toISOString(),
        notes
      };
      
      const { data, error } = await supabase
        .from('blood_pressure_records')
        .insert([record])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        userId: data.user_id,
        systolic: data.systolic,
        diastolic: data.diastolic,
        pulseRate: data.pulse_rate,
        measuredAt: data.measured_at,
        notes: data.notes
      };
    } catch (error) {
      console.error('Error logging blood pressure:', error);
      return null;
    }
  },
  
  // Get blood pressure records for a user
  getBloodPressureRecords: async (userId: string): Promise<BloodPressureRecord[]> => {
    try {
      const { data, error } = await supabase
        .from('blood_pressure_records')
        .select('*')
        .eq('user_id', userId)
        .order('measured_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(record => ({
        id: record.id,
        userId: record.user_id,
        systolic: record.systolic,
        diastolic: record.diastolic,
        pulseRate: record.pulse_rate,
        measuredAt: record.measured_at,
        notes: record.notes
      }));
    } catch (error) {
      console.error('Error fetching blood pressure records:', error);
      return [];
    }
  }
};
