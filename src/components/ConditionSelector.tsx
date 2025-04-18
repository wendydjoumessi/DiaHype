import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Update the prop types to match the usage
interface ConditionSelectorProps {
  conditions?: string[]; // Change to match the actual prop type
  selectedCondition?: string | null; // Make this optional
  onSelect?: (condition: string) => void; // Change type to match expected usage
}

export function ConditionSelector({
  conditions = [], // Provide a default empty array
  selectedCondition,
  onSelect = () => {}, // Provide a no-op default function
}: ConditionSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCondition || "Select condition..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search conditions..." />
          <CommandEmpty>No condition found.</CommandEmpty>
          <CommandGroup>
            {conditions.map((condition) => (
              <CommandItem
                key={condition}
                value={condition}
                onSelect={() => {
                  onSelect(condition);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCondition === condition
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {condition}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
