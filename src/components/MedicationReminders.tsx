
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertCircle } from "lucide-react";
import { HealthCondition } from "@/pages/UserDashboard";

interface MedicationRemindersProps {
  conditions?: HealthCondition[];
}

export function MedicationReminders({ conditions = [] }: MedicationRemindersProps) {
  // Define condition-specific medications
  const diabetesMeds = [
    { id: 1, name: "Metformin", dosage: "500mg", time: "8:00 AM", taken: true },
    { id: 2, name: "Metformin", dosage: "500mg", time: "8:00 PM", taken: false },
  ];
  
  const hypertensionMeds = [
    { id: 3, name: "Lisinopril", dosage: "10mg", time: "9:00 AM", taken: true },
  ];
  
  const generalMeds = [
    { id: 4, name: "Multivitamin", dosage: "1 tablet", time: "9:00 AM", taken: true },
  ];
  
  // Combine medications based on conditions
  let medications = [...generalMeds];
  
  if (conditions.includes("diabetes")) {
    medications = [...medications, ...diabetesMeds];
  }
  
  if (conditions.includes("hypertension")) {
    medications = [...medications, ...hypertensionMeds];
  }
  
  // Sort by time
  medications.sort((a, b) => {
    const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
    const timeB = new Date(`1970/01/01 ${b.time}`).getTime();
    return timeA - timeB;
  });

  if (medications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-muted-foreground text-sm mb-4">
          No medication reminders found. Either select health conditions or add medications to your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {medications.map((med) => (
        <div key={med.id} className="flex items-center p-3 border rounded-lg bg-slate-50">
          <div className={`w-3 h-3 rounded-full mr-3 ${med.taken ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <div className="flex-1">
            <div className="font-medium">{med.name} ({med.dosage})</div>
            <div className="flex items-center text-muted-foreground text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {med.time}
            </div>
          </div>
          <Button size="sm" variant={med.taken ? "ghost" : "outline"} className="ml-2 h-8">
            {med.taken ? <Check className="h-4 w-4 text-green-600" /> : "Take"}
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full">
        View All Medications
      </Button>
    </div>
  );
}
