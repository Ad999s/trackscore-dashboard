
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, subMonths, addMonths } from 'date-fns';
import PnlTable from '@/components/PnL/PnlTable';
import PnlSummary from '@/components/PnL/PnlSummary';
import { Card } from '@/components/ui/card';

const PnlRecord = () => {
  // Set default date to March 2025
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // Month is 0-indexed, so 2 = March
  
  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Profit & Loss Tracker</h1>
          <p className="text-slate-500 mt-1">
            Track daily performance and compare predictions with actual results
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePreviousMonth}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-soft">
            <Calendar className="w-4 h-4 text-slate-400 mr-2" />
            <span className="text-sm font-medium text-slate-600">
              {format(currentDate, 'MMMM yyyy')}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextMonth}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
      
      <Card className="mb-6 p-4">
        <PnlSummary currentDate={currentDate} />
      </Card>
      
      <Card className="p-0">
        <PnlTable currentDate={currentDate} />
      </Card>
    </div>
  );
};

export default PnlRecord;
