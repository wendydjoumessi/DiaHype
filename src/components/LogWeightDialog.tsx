
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Weight } from "lucide-react";

interface LogWeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogWeightDialog({ open, onOpenChange }: LogWeightDialogProps) {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the database
    console.log("Logged weight:", {
      weight,
      unit,
      notes,
      timestamp: new Date().toISOString()
    });
    
    toast({
      title: "Weight logged",
      description: `${weight} ${unit} recorded successfully.`,
    });
    
    // Reset form and close dialog
    setWeight("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Weight className="mr-2 h-5 w-5 text-health-primary" />
            Log Weight
          </DialogTitle>
          <DialogDescription>
            Record your weight measurement below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-3">
                <Label htmlFor="weight-value">Weight</Label>
                <Input
                  id="weight-value"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  required
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="weight-unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="weight-unit">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="weight-notes">Notes</Label>
              <Input
                id="weight-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-health-primary hover:bg-health-accent">Save Measurement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
