export interface HealthCondition {
    id: string;
    name: string;
    status: 'active' | 'managed' | 'resolved';
    diagnosisDate: string;
    lastUpdated: string;
    severity: 'mild' | 'moderate' | 'severe';
    description?: string;
    medications?: string[];
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
  