
import React from 'react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { TrendingUp } from 'lucide-react';

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
            <h4 className="text-sm font-medium text-slate-500 mb-3">Delivery Rate %age</h4>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-slate-600">{monthStats.deliveryRateWithout}%</span>
              <TrendingUp className="w-4 h-4 mx-2 text-green-500" />
              <span className="text-xl font-semibold text-green-600">{monthStats.deliveryRateWith}%</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center border-r border-slate-200 px-4">
            <h4 className="text-sm font-medium text-slate-500 mb-3">Monthly Net Profit</h4>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-slate-600">₹{formatToLakh(monthStats.monthlyProfitWithout)}</span>
              <TrendingUp className="w-4 h-4 mx-2 text-green-500" />
              <span className="text-xl font-semibold text-green-600">₹{formatToLakh(monthStats.monthlyProfitWith)}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center pl-4">
            <h4 className="text-sm font-medium text-slate-500 mb-3">Profit Per Order (Avg)</h4>
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
