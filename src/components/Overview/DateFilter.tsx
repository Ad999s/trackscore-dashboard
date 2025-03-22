
import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { format, addDays, subDays } from 'date-fns';

interface DateFilterProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ selectedDate, onDateChange }) => {
  const goToPreviousDay = () => {
    onDateChange(subDays(selectedDate, 1));
  };
  
  const goToNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };
  
  const goToToday = () => {
    onDateChange(new Date());
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={goToPreviousDay}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={goToToday}
      >
        <Calendar className="h-4 w-4" />
        <span>{format(selectedDate, 'MMM d, yyyy')}</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={goToNextDay}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DateFilter;
