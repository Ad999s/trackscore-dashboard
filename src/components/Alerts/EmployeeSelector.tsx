
import React, { useState } from 'react';
import { Check, ChevronDown, User, UserPlus, X } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Employee {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

interface EmployeeSelectorProps {
  onAssign: (employee: Employee | null) => void;
  assignedEmployee?: Employee | null;
}

const EMPLOYEES: Employee[] = [
  { id: 'emp1', name: 'John Doe', initials: 'JD', avatar: '/lovable-uploads/2f4b3d70-1de4-4786-a91f-c305716aa4b6.png' },
  { id: 'emp2', name: 'Sarah Chen', initials: 'SC', avatar: '/lovable-uploads/2f4b3d70-1de4-4786-a91f-c305716aa4b6.png' },
  { id: 'emp3', name: 'Mike Johnson', initials: 'MJ', avatar: '/lovable-uploads/2f4b3d70-1de4-4786-a91f-c305716aa4b6.png' },
  { id: 'emp4', name: 'Elena Rodriguez', initials: 'ER', avatar: '/lovable-uploads/2f4b3d70-1de4-4786-a91f-c305716aa4b6.png' },
  { id: 'emp5', name: 'Alex Kim', initials: 'AK', avatar: '/lovable-uploads/2f4b3d70-1de4-4786-a91f-c305716aa4b6.png' },
];

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({ onAssign, assignedEmployee }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAssign = (employee: Employee) => {
    onAssign(employee);
    setIsOpen(false);
  };

  const handleRemoveAssignment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAssign(null);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {assignedEmployee ? (
          <Badge 
            variant="outline" 
            className="flex items-center gap-1 pl-1 pr-2 py-1 cursor-pointer bg-slate-50 hover:bg-slate-100"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignedEmployee.avatar} alt={assignedEmployee.name} />
              <AvatarFallback className="text-xs">{assignedEmployee.initials}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{assignedEmployee.name}</span>
            <X 
              className="h-3 w-3 text-slate-500 hover:text-slate-800" 
              onClick={handleRemoveAssignment}
            />
          </Badge>
        ) : (
          <Button variant="outline" size="sm" className="text-xs px-2">
            <UserPlus className="h-3.5 w-3.5 mr-1" />
            Assign
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-52 p-2">
        <div className="space-y-1">
          {EMPLOYEES.map((employee) => (
            <div 
              key={employee.id}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 cursor-pointer"
              onClick={() => handleAssign(employee)}
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="text-xs">{employee.initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium flex-grow">{employee.name}</span>
              {assignedEmployee?.id === employee.id && (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmployeeSelector;
