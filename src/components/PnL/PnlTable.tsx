
import React from 'react';
import { format, getDaysInMonth, isBefore, subDays } from 'date-fns';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const PnlTable: React.FC<PnlTableProps> = ({ currentDate }) => {
  const dates = getDatesInMonth(currentDate);
  const today = new Date();
  
  // Mock data generation - in a real app this would come from an API
  const generateData = (date: Date) => {
    const dayNumber = date.getDate();
    const isVerified = isBefore(date, subDays(today, 7)); // Assume data is verified after 7 days
    
    // Simulate different data based on date
    const baseDeliveryRate = 56;
    const trackscorePrediction = Math.min(95, Math.round(78 + (dayNumber % 10) - 5));
    
    return {
      date,
      blindShipping: {
        totalShipped: 100 + dayNumber,
        deliveryRate: baseDeliveryRate
      },
      actualData: isVerified ? {
        totalDelivered: Math.round((80 + dayNumber) * 0.9),
        deliveryRate: baseDeliveryRate + Math.round((dayNumber % 15) - 3)
      } : null,
      trackscoreDay1: {
        totalToShip: 100 + dayNumber - Math.round(dayNumber * 0.3),
        deliveryRate: trackscorePrediction
      },
      isVerified
    };
  };
  
  const tableData = dates.map(date => generateData(date));
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Blind Shipping
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actual Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                TrackScore Day 1 Estimation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
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
                  <div>Total: {data.blindShipping.totalShipped}</div>
                  <div>Delivery: {data.blindShipping.deliveryRate}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {data.actualData ? (
                    <>
                      <div>Total: {data.actualData.totalDelivered}</div>
                      <div>Delivery: {data.actualData.deliveryRate}%</div>
                    </>
                  ) : (
                    <span className="text-slate-400">Yet to arrive</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <div>Total: {data.trackscoreDay1.totalToShip}</div>
                  <div>Delivery: {data.trackscoreDay1.deliveryRate}%</div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PnlTable;
