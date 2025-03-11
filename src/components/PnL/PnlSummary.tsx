
import React from 'react';
import { ArrowUp, Box, TrendingUp, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface PnlSummaryProps {
  currentDate: Date;
}

const PnlSummary: React.FC<PnlSummaryProps> = ({ currentDate }) => {
  // Mock data generation - in a real app would be calculated from actual data
  const mockMetrics = {
    rtoReduction: 12.5,
    totalSavings: 85000,
    inventorySaved: 850,
    netProfitPercentage: 18.5
  };
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Summary for {format(currentDate, 'MMMM yyyy')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm text-slate-500 font-medium uppercase tracking-wide">
              Reduction in Returns (RTO)
            </h4>
            <TrendingUp className="w-5 h-5 text-trackscore-success" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {mockMetrics.rtoReduction}
            </span>
            <span className="text-lg text-trackscore-success font-medium">%</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            From previous month's average
          </p>
        </div>
        
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm text-slate-500 font-medium uppercase tracking-wide">
              Total Cost Savings
            </h4>
            <DollarSign className="w-5 h-5 text-trackscore-success" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              ₹{mockMetrics.totalSavings.toLocaleString()}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            RTO costs + freed capital
          </p>
        </div>
        
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm text-slate-500 font-medium uppercase tracking-wide">
              Inventory Saved for Scaling
            </h4>
            <Box className="w-5 h-5 text-trackscore-blue" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {mockMetrics.inventorySaved}
            </span>
            <span className="text-lg text-slate-500">units</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Due to improved order selection
          </p>
        </div>
        
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm text-slate-500 font-medium uppercase tracking-wide">
              Net Profit Growth
            </h4>
            <ArrowUp className="w-5 h-5 text-trackscore-success" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {mockMetrics.netProfitPercentage}
            </span>
            <span className="text-lg text-trackscore-success font-medium">%</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Improved margin per order
          </p>
        </div>
      </div>
    </div>
  );
};

export default PnlSummary;
