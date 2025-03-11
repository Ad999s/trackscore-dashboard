
import React, { useState } from 'react';
import { format, getDaysInMonth } from 'date-fns';
import { Check, Circle, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import PnlDetails from './PnlDetails';

interface PnlTableProps {
  currentDate: Date;
}

// Helper function to get dates for the current month
const getDatesInMonth = (date: Date) => {
  const daysInMonth = getDaysInMonth(date);
  const year = date.getFullYear();
  const month = date.getMonth();
  
  return Array.from({ length: daysInMonth }, (_, i) => {
    return new Date(year, month, i + 1);
  });
};

// Mock data generation - in a real app this would come from an API
const generateData = (date: Date) => {
  const dayNumber = date.getDate();
  
  // Make dates verified through March 30th
  const isVerified = date.getDate() <= 30 && date.getMonth() === 2; // March is month 2 (0-indexed)
  
  // RTO percentage values for each column
  const blindRtoRate = Math.max(20, 25 - (dayNumber % 5)); // Highest RTO rate
  const actualRtoRate = isVerified ? Math.min(10, 12 - (dayNumber % 4)) : null; // Lowest RTO rate
  const estimatedRtoRate = actualRtoRate ? Math.max(actualRtoRate - 1, 8) : 11 - (dayNumber % 3); // Slightly less than actual
  
  // Calculate delivery percentages (100% - RTO%)
  const blindDeliveryRate = 100 - blindRtoRate;
  const actualDeliveryRate = actualRtoRate !== null ? 100 - actualRtoRate : null;
  const estimatedDeliveryRate = 100 - estimatedRtoRate;
  
  // Generate detailed mock data for the full PnL view
  const detailedData = {
    ordersShipped: 1000 + (dayNumber * 10),
    deliveredOrders: isVerified ? Math.round((1000 + (dayNumber * 10)) * (1 - blindRtoRate/100)) : null,
    rtoOrders: isVerified ? Math.round((1000 + (dayNumber * 10)) * (blindRtoRate/100)) : null,
    deliveryPercentage: isVerified ? 100 - blindRtoRate : null,
    rtoRate: blindRtoRate,
    mrp: 1000,
    productCost: 200,
    shippingCost: 80,
    packagingCost: 20,
    costOfRto: 60,
    totalRevenue: (1000 + (dayNumber * 10)) * 1000,
    totalProductCost: (1000 + (dayNumber * 10)) * 200,
    totalShippingCost: (1000 + (dayNumber * 10)) * 80,
    totalPackagingCost: (1000 + (dayNumber * 10)) * 20,
    totalCostOfRto: isVerified ? Math.round((1000 + (dayNumber * 10)) * (blindRtoRate/100)) * 60 : null,
    totalCogs: isVerified ? 
      ((1000 + (dayNumber * 10)) * 200) + 
      ((1000 + (dayNumber * 10)) * 80) + 
      ((1000 + (dayNumber * 10)) * 20) + 
      (Math.round((1000 + (dayNumber * 10)) * (blindRtoRate/100)) * 60) : null,
    grossProfit: isVerified ? 
      ((1000 + (dayNumber * 10)) * 1000) - 
      (((1000 + (dayNumber * 10)) * 200) + 
      ((1000 + (dayNumber * 10)) * 80) + 
      ((1000 + (dayNumber * 10)) * 20) + 
      (Math.round((1000 + (dayNumber * 10)) * (blindRtoRate/100)) * 60)) : null,
    netProfit: isVerified ? 
      ((1000 + (dayNumber * 10)) * 1000) - 
      (((1000 + (dayNumber * 10)) * 200) + 
      ((1000 + (dayNumber * 10)) * 80) + 
      ((1000 + (dayNumber * 10)) * 20) + 
      (Math.round((1000 + (dayNumber * 10)) * (blindRtoRate/100)) * 60)) : null,
    netProfitPerOrder: isVerified ? 
      (((1000 + (dayNumber * 10)) * 1000) - 
      (((1000 + (dayNumber * 10)) * 200) + 
      ((1000 + (dayNumber * 10)) * 80) + 
      ((1000 + (dayNumber * 10)) * 20) + 
      (Math.round((1000 + (dayNumber * 10)) * (blindRtoRate/100)) * 60))) / (1000 + (dayNumber * 10)) : null,
  };
  
  return {
    date,
    blindShipping: {
      deliveryRate: blindDeliveryRate,
      rtoRate: blindRtoRate
    },
    actualData: isVerified ? {
      deliveryRate: actualDeliveryRate,
      rtoRate: actualRtoRate
    } : null,
    trackscoreDay1: {
      deliveryRate: estimatedDeliveryRate,
      rtoRate: estimatedRtoRate
    },
    isVerified,
    detailedData
  };
};

const PnlTable: React.FC<PnlTableProps> = ({ currentDate }) => {
  const dates = getDatesInMonth(currentDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Generate table data and sort in descending order by date (latest first)
  const tableData = dates
    .map(date => generateData(date))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  const handleShowPnl = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleClosePnl = () => {
    setSelectedDate(null);
  };
  
  return (
    <>
      {selectedDate && (
        <PnlDetails 
          data={tableData.find(data => data.date.getTime() === selectedDate.getTime())?.detailedData} 
          date={selectedDate}
          onClose={handleClosePnl}
        />
      )}
      
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Blind Delivery Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actual Delivery Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  TrackScore Estimated Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {tableData.map((data) => (
                <tr key={format(data.date, 'yyyy-MM-dd')} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {format(data.date, 'dd MMM yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="font-medium text-green-500">
                      {data.blindShipping.deliveryRate}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {data.actualData ? (
                      <div className="font-medium text-green-500">
                        {data.actualData.deliveryRate}%
                      </div>
                    ) : (
                      <span className="text-slate-400">Yet to arrive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="font-medium text-blue-500">
                      {data.trackscoreDay1.deliveryRate}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center">
                            {data.isVerified ? (
                              <Circle className={cn("w-4 h-4 text-green-500 fill-green-500")} />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300" />
                            )}
                            <span className="ml-2">{data.isVerified ? 'Verified' : 'Pending'}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{data.isVerified ? 'Data verified with actual shipping results' : 'Waiting for delivery confirmation'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleShowPnl(data.date)}
                      disabled={!data.isVerified}
                      className="flex items-center text-blue-600"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Show Full PnL
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PnlTable;
