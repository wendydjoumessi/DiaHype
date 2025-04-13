
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Droplet } from "lucide-react";

interface LogBloodSugarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogBloodSugarDialog({ open, onOpenChange }: LogBloodSugarDialogProps) {
  const [glucoseValue, setGlucoseValue] = useState("");
  const [measurementContext, setMeasurementContext] = useState("before-breakfast");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the database
    console.log("Logged blood sugar:", {
      value: glucoseValue,
      context: measurementContext,
      notes,
      timestamp: new Date().toISOString()
    });
    
    toast({
      title: "Blood sugar logged",
      description: `${glucoseValue} mg/dL recorded successfully.`,
    });
    
    // Reset form and close dialog
    setGlucoseValue("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Droplet className="mr-2 h-5 w-5 text-health-primary" />
            Log Blood Sugar
          </DialogTitle>
          <DialogDescription>
            Record your blood glucose reading below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="glucose-value">Blood Glucose (mg/dL)</Label>
              <Input
                id="glucose-value"
                type="number"
                value={glucoseValue}
                onChange={(e) => setGlucoseValue(e.target.value)}
                placeholder="Enter your reading (e.g., 120)"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="measurement-context">Measurement Context</Label>
              <Select 
                value={measurementContext} 
                onValueChange={setMeasurementContext}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select context" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="before-breakfast">Before Breakfast</SelectItem>
                  <SelectItem value="after-breakfast">After Breakfast</SelectItem>
                  <SelectItem value="before-lunch">Before Lunch</SelectItem>
                  <SelectItem value="after-lunch">After Lunch</SelectItem>
                  <SelectItem value="before-dinner">Before Dinner</SelectItem>
                  <SelectItem value="after-dinner">After Dinner</SelectItem>
                  <SelectItem value="bedtime">Before Bedtime</SelectItem>
                  <SelectItem value="night">Middle of Night</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information (e.g., meals, activity, stress)"
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
