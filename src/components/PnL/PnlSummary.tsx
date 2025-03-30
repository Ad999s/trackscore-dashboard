
import React from 'react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PnlSummaryProps {
  currentDate: Date;
}

const PnlSummary: React.FC<PnlSummaryProps> = ({ currentDate }) => {
  // Calculate month statistics based on TrackScore activation
  // In a real app, this would come from an API
  const calculateMonthStats = () => {
    // Sample data for March 2025
    if (currentDate.getMonth() === 2 && currentDate.getFullYear() === 2025) {
      return {
        totalExtraProfit: 64000,
        inventorySaved: 240,
        deliveryRateImprovement: 9,
        deliveryRateWithout: 56,
        deliveryRateWith: 72,
        monthlyProfitWithout: 420000, // 4.2L
        monthlyProfitWith: 550000, // 5.5L
        profitPerOrderWithout: 217,
        profitPerOrderWith: 230
      };
    }
    
    // Default fallback data for other months
    return {
      totalExtraProfit: 50000,
      inventorySaved: 200,
      deliveryRateImprovement: 8,
      deliveryRateWithout: 56,
      deliveryRateWith: 72,
      monthlyProfitWithout: 420000, // 4.2L
      monthlyProfitWith: 550000, // 5.5L
      profitPerOrderWithout: 217,
      profitPerOrderWith: 230
    };
  };
  
  const monthStats = calculateMonthStats();
  
  // Format a number to lakh representation
  const formatToLakh = (num: number) => {
    if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    }
    return num.toLocaleString();
  };
  
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          PnL Impact
        </h2>
        <p className="text-slate-500 mt-1">
          See live impact on your pnl sheet
        </p>
      </div>
      
      <h3 className="text-xl font-semibold text-trackscore-text">
        Performance with and without TrackScore
      </h3>
      
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center border-r border-slate-200 pr-4">
            <div className="flex items-center mb-3">
              <h4 className="text-sm font-medium text-slate-500 mr-1">Delivery Rate %age</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="cursor-pointer hover:bg-slate-100 rounded p-1" type="button">
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px] p-3">
                    <p className="text-sm">
                      <span className="font-semibold">Left value (56%):</span> Delivery rate recorded before TrackScore activation
                      <br />
                      <span className="font-semibold">Right value (72%):</span> Delivery rate recorded after TrackScore activation
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-slate-600">{monthStats.deliveryRateWithout}%</span>
              <TrendingUp className="w-4 h-4 mx-2 text-green-500" />
              <span className="text-xl font-semibold text-green-600">{monthStats.deliveryRateWith}%</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center border-r border-slate-200 px-4">
            <div className="flex items-center mb-3">
              <h4 className="text-sm font-medium text-slate-500 mr-1">Monthly Net Profit</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="cursor-pointer hover:bg-slate-100 rounded p-1" type="button">
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px] p-3">
                    <p className="text-sm">
                      <span className="font-semibold">Left value (₹4.2L):</span> Monthly profit recorded before TrackScore activation
                      <br />
                      <span className="font-semibold">Right value (₹5.5L):</span> Monthly profit recorded after TrackScore activation
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-slate-600">₹{formatToLakh(monthStats.monthlyProfitWithout)}</span>
              <TrendingUp className="w-4 h-4 mx-2 text-green-500" />
              <span className="text-xl font-semibold text-green-600">₹{formatToLakh(monthStats.monthlyProfitWith)}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center pl-4">
            <div className="flex items-center mb-3">
              <h4 className="text-sm font-medium text-slate-500 mr-1">Profit Per Order (Avg)</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="cursor-pointer hover:bg-slate-100 rounded p-1" type="button">
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px] p-3">
                    <p className="text-sm">
                      <span className="font-semibold">Left value (₹217):</span> Average profit per order recorded before TrackScore activation
                      <br />
                      <span className="font-semibold">Right value (₹230):</span> Average profit per order recorded after TrackScore activation
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-slate-600">₹{monthStats.profitPerOrderWithout}</span>
              <TrendingUp className="w-4 h-4 mx-2 text-green-500" />
              <span className="text-xl font-semibold text-green-600">₹{monthStats.profitPerOrderWith}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnlSummary;
