
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DoctorSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const DoctorSearch = ({ searchTerm, setSearchTerm }: DoctorSearchProps) => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <Input 
        placeholder="Search by doctor name or specialty..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="md:w-2/3"
      />
      <Select defaultValue="all">
        <SelectTrigger className="md:w-1/3">
          <SelectValue placeholder="Filter by specialty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Specialties</SelectItem>
          <SelectItem value="endocrinology">Endocrinology</SelectItem>
          <SelectItem value="cardiology">Cardiology</SelectItem>
          <SelectItem value="nutrition">Nutrition</SelectItem>
          <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
