export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          date: string
          doctor_id: string | null
          id: string
          patient_id: string | null
          status: string | null
          time: string
        }
        Insert: {
          date: string
          doctor_id?: string | null
          id?: string
          patient_id?: string | null
          status?: string | null
          time: string
        }
        Update: {
          date?: string
          doctor_id?: string | null
          id?: string
          patient_id?: string | null
          status?: string | null
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_pressure_records: {
        Row: {
          diastolic: number | null
          id: string
          measured_at: string | null
          notes: string | null
          pulse_rate: number | null
          systolic: number | null
          user_id: string | null
        }
        Insert: {
          diastolic?: number | null
          id?: string
          measured_at?: string | null
          notes?: string | null
          pulse_rate?: number | null
          systolic?: number | null
          user_id?: string | null
        }
        Update: {
          diastolic?: number | null
          id?: string
          measured_at?: string | null
          notes?: string | null
          pulse_rate?: number | null
          systolic?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blood_pressure_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_sugar_records: {
        Row: {
          glucose_level: number | null
          id: string
          meal_context: string | null
          measured_at: string | null
          notes: string | null
          unit: string | null
          user_id: string | null
        }
        Insert: {
          glucose_level?: number | null
          id?: string
          meal_context?: string | null
          measured_at?: string | null
          notes?: string | null
          unit?: string | null
          user_id?: string | null
        }
        Update: {
          glucose_level?: number | null
          id?: string
          meal_context?: string | null
          measured_at?: string | null
          notes?: string | null
          unit?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          id: string
          last_message: string | null
          last_message_time: string | null
          participant_avatar: string | null
          participant_id: string | null
          participant_name: string | null
          unread_count: number | null
        }
        Insert: {
          id?: string
          last_message?: string | null
          last_message_time?: string | null
          participant_avatar?: string | null
          participant_id?: string | null
          participant_name?: string | null
          unread_count?: number | null
        }
        Update: {
          id?: string
          last_message?: string | null
          last_message_time?: string | null
          participant_avatar?: string | null
          participant_id?: string | null
          participant_name?: string | null
          unread_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_doses: {
        Row: {
          id: string
          medication_id: string | null
          taken: boolean | null
          time: string | null
          time_of_day: string | null
        }
        Insert: {
          id?: string
          medication_id?: string | null
          taken?: boolean | null
          time?: string | null
          time_of_day?: string | null
        }
        Update: {
          id?: string
          medication_id?: string | null
          taken?: boolean | null
          time?: string | null
          time_of_day?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_doses_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          about: string | null
          avatar: string | null
          experience: string | null
          id: string
          is_active: boolean | null
          name: string | null
          next_available: string | null
          rating: number | null
          specialty: string | null
          user_id: string | null
        }
        Insert: {
          about?: string | null
          avatar?: string | null
          experience?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          next_available?: string | null
          rating?: number | null
          specialty?: string | null
          user_id?: string | null
        }
        Update: {
          about?: string | null
          avatar?: string | null
          experience?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          next_available?: string | null
          rating?: number | null
          specialty?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      health_conditions: {
        Row: {
          condition_name: string
          created_at: string | null
          diagnosis_date: string | null
          id: string
          notes: string | null
          severity: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          condition_name: string
          created_at?: string | null
          diagnosis_date?: string | null
          id?: string
          notes?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          condition_name?: string
          created_at?: string | null
          diagnosis_date?: string | null
          id?: string
          notes?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      health_measurements: {
        Row: {
          created_at: string | null
          id: string
          measured_at: string | null
          measurement_type: string
          notes: string | null
          user_id: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          id?: string
          measured_at?: string | null
          measurement_type: string
          notes?: string | null
          user_id?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          measured_at?: string | null
          measurement_type?: string
          notes?: string | null
          user_id?: string | null
          value?: Json
        }
        Relationships: []
      }
      medication_logs: {
        Row: {
          id: string
          medication_id: string | null
          notes: string | null
          status: string | null
          taken_at: string | null
        }
        Insert: {
          id?: string
          medication_id?: string | null
          notes?: string | null
          status?: string | null
          taken_at?: string | null
        }
        Update: {
          id?: string
          medication_id?: string | null
          notes?: string | null
          status?: string | null
          taken_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medication_logs_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          dosage: string | null
          end_date: string | null
          frequency: string | null
          id: string
          instructions: string | null
          name: string
          refill_date: string | null
          start_date: string | null
          time_of_day: string[] | null
          times_per_day: number | null
          user_id: string | null
          with_food: boolean | null
          with_water: boolean | null
        }
        Insert: {
          dosage?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          name: string
          refill_date?: string | null
          start_date?: string | null
          time_of_day?: string[] | null
          times_per_day?: number | null
          user_id?: string | null
          with_food?: boolean | null
          with_water?: boolean | null
        }
        Update: {
          dosage?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          name?: string
          refill_date?: string | null
          start_date?: string | null
          time_of_day?: string[] | null
          times_per_day?: number | null
          user_id?: string | null
          with_food?: boolean | null
          with_water?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "medications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          id: string
          is_read: boolean | null
          receiver_id: string | null
          sender_id: string | null
          timestamp: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          timestamp?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          conditions: string[] | null
          created_at: string | null
          doctorid: string | null
          email: string
          id: string
          isactive: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          conditions?: string[] | null
          created_at?: string | null
          doctorid?: string | null
          email: string
          id?: string
          isactive?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          conditions?: string[] | null
          created_at?: string | null
          doctorid?: string | null
          email?: string
          id?: string
          isactive?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_doctorid_fkey"
            columns: ["doctorid"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          business_license: string | null
          country: string | null
          created_at: string
          email: string | null
          first_name: string | null
          hospital_name: string | null
          id: string
          lab_name: string | null
          last_name: string | null
          medical_license: string | null
          phone: string | null
          updated_at: string
          user_type: string
        }
        Insert: {
          business_license?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          hospital_name?: string | null
          id: string
          lab_name?: string | null
          last_name?: string | null
          medical_license?: string | null
          phone?: string | null
          updated_at?: string
          user_type?: string
        }
        Update: {
          business_license?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          hospital_name?: string | null
          id?: string
          lab_name?: string | null
          last_name?: string | null
          medical_license?: string | null
          phone?: string | null
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string
          role: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name: string
          role: string
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          role?: string
        }
        Relationships: []
      }
      weight_records: {
        Row: {
          id: string
          notes: string | null
          timestamp: string | null
          unit: string | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          id?: string
          notes?: string | null
          timestamp?: string | null
          unit?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          id?: string
          notes?: string | null
          timestamp?: string | null
          unit?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
