
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface LogBloodPressureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogBloodPressureDialog({ open, onOpenChange }: LogBloodPressureDialogProps) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [armUsed, setArmUsed] = useState("left");
  const [bodyPosition, setBodyPosition] = useState("sitting");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the database
    console.log("Logged blood pressure:", {
      systolic,
      diastolic,
      pulse,
      armUsed,
      bodyPosition,
      notes,
      timestamp: new Date().toISOString()
    });
    
    toast({
      title: "Blood pressure logged",
      description: `${systolic}/${diastolic} mmHg recorded successfully.`,
    });
    
    // Reset form and close dialog
    setSystolic("");
    setDiastolic("");
    setPulse("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5 text-health-primary" />
            Log Blood Pressure
          </DialogTitle>
          <DialogDescription>
            Record your blood pressure reading below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="systolic">Systolic (mmHg)</Label>
                <Input
                  id="systolic"
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  placeholder="Top number (e.g., 120)"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                <Input
                  id="diastolic"
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  placeholder="Bottom number (e.g., 80)"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="pulse">Pulse (bpm)</Label>
              <Input
                id="pulse"
                type="number"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                placeholder="Enter heart rate (e.g., 72)"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="arm">Arm Used</Label>
                <Select value={armUsed} onValueChange={setArmUsed}>
                  <SelectTrigger id="arm">
                    <SelectValue placeholder="Select arm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left Arm</SelectItem>
                    <SelectItem value="right">Right Arm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="position">Body Position</Label>
                <Select value={bodyPosition} onValueChange={setBodyPosition}>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sitting">Sitting</SelectItem>
                    <SelectItem value="standing">Standing</SelectItem>
                    <SelectItem value="lying">Lying Down</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="bp-notes">Notes</Label>
              <Input
                id="bp-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-health-primary hover:bg-health-accent">Save Reading</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
