export interface HealthCondition {
    id: string;
    user_id: string;
    condition_name: string;
    status: 'active' | 'managed' | 'under treatement';
    diagnosis_date: string;
    updated_at: string;
    severity: 'mild' | 'moderate' | 'severe';
    notes?: string;
  }
  
  export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    condition?: string;
    instructions?: string;
    sideEffects?: string[];
    refillDate?: string;
  }
  
  export interface VitalReading {
    id: string;
    type: 'blood_pressure' | 'blood_glucose' | 'heart_rate' | 'weight' | 'temperature' | 'oxygen';
    value: string | number;
    unit: string;
    timestamp: string;
    notes?: string;
  }
  