
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimeframeFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

const timeframes = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'ytd', label: 'Year to date' },
  { value: 'custom', label: 'Custom range' }
];

const TimeframeFilter: React.FC<TimeframeFilterProps> = ({ value, onValueChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const selectedTimeframe = timeframes.find(t => t.value === value) || timeframes[1];
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 min-w-40 justify-between"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{selectedTimeframe.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <div className="flex flex-col">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm hover:bg-accent transition-colors",
                value === timeframe.value && "bg-accent font-medium"
              )}
              onClick={() => {
                onValueChange(timeframe.value);
                setIsOpen(false);
              }}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimeframeFilter;
