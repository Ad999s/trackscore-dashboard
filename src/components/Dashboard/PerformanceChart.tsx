
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import ComparisonTable from './ComparisonTable';

type ShippingMode = 'all' | 'custom' | 'auto';

interface PerformanceData {
  metric: string;
  all: string | number;
  custom: string | number;
  auto: string | number;
  info?: string;
}

const performanceData: PerformanceData[] = [
  { 
    metric: 'Total Orders Shipped', 
    all: 156, 
    custom: 130, 
    auto: 120,
    info: 'The total number of orders processed in the selected period'
  },
  { 
    metric: 'Est. Delivery Percentage (%)', 
    all: '55%', 
    custom: '70%', 
    auto: '78%',
    info: 'Estimated percentage of orders that will be successfully delivered'
  },
  { 
    metric: 'Undelivered Orders', 
    all: 36, 
    custom: 15, 
    auto: 10,
    info: 'Orders that failed to deliver and were returned'
  },
  { 
    metric: 'Inventory Saved', 
    all: 0, 
    custom: 11, 
    auto: 17,
    info: 'Amount of inventory saved by not shipping risky orders'
  },
  { 
    metric: 'Total Upfront Cost', 
    all: 9000, 
    custom: 7000, 
    auto: 5000,
    info: 'Initial capital required to fulfill the orders'
  },
  { 
    metric: 'Total Net Profit', 
    all: 10240, 
    custom: 11720, 
    auto: 12450,
    info: 'Estimated net profit after accounting for returns and costs'
  },
  { 
    metric: 'Capital Efficiency', 
    all: 1.36, 
    custom: 1.49, 
    auto: 1.79,
    info: 'Return on capital invested (higher is better)'
  },
  { 
    metric: 'Breakeven Days', 
    all: 16, 
    custom: 14, 
    auto: 13,
    info: 'Number of days until the investment is recovered'
  },
  { 
    metric: 'Capital Saved', 
    all: 0, 
    custom: 2100, 
    auto: 2100,
    info: 'Amount of capital not tied up in risky orders'
  },
];

interface PerformanceChartProps {
  className?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ className }) => {
  const [activeMode, setActiveMode] = useState<ShippingMode>('all');
  const [showComparison, setShowComparison] = useState<boolean>(true);
  
  const formatValue = (value: string | number) => {
    if (typeof value === 'number') {
      // Add currency formatting for financial metrics
      if (['Total Upfront Cost', 'Total Net Profit', 'Capital Saved'].includes(performanceData.find(d => d.all === value || d.custom === value || d.auto === value)?.metric || '')) {
        return `₹${value.toLocaleString()}`;
      }
      return value.toLocaleString();
    }
    return value;
  };
  
  const getBestMode = (metric: string): ShippingMode => {
    const data = performanceData.find(d => d.metric === metric);
    if (!data) return 'all';
    
    // For metrics where higher is better
    if (['Est. Delivery Percentage (%)', 'Inventory Saved', 'Total Net Profit', 'Capital Efficiency', 'Capital Saved'].includes(metric)) {
      const all = typeof data.all === 'string' ? parseFloat(data.all) : data.all;
      const custom = typeof data.custom === 'string' ? parseFloat(data.custom) : data.custom;
      const auto = typeof data.auto === 'string' ? parseFloat(data.auto) : data.auto;
      
      if (auto >= custom && auto >= all) return 'auto';
      if (custom >= all && custom >= auto) return 'custom';
      return 'all';
    }
    
    // For metrics where lower is better
    if (['Undelivered Orders', 'Total Upfront Cost', 'Breakeven Days'].includes(metric)) {
      const all = typeof data.all === 'string' ? parseFloat(data.all) : data.all;
      const custom = typeof data.custom === 'string' ? parseFloat(data.custom) : data.custom;
      const auto = typeof data.auto === 'string' ? parseFloat(data.auto) : data.auto;
      
      if (auto <= custom && auto <= all) return 'auto';
      if (custom <= all && custom <= auto) return 'custom';
      return 'all';
    }
    
    return 'all';
  };
  
  return (
    <div className={cn("glass-card p-6 animate-scale-in", className)}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-trackscore-text">Performance Chart</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="ml-2">
                <Info className="w-4 h-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Compare performance metrics across different shipping strategies.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="py-1.5 px-3 text-sm font-medium rounded-md border border-slate-200 hover:bg-slate-50 transition-colors duration-200">
            ADD FORMULA
          </button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="ml-1">
                <Info className="w-4 h-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Create custom performance metrics</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle px-6">
          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
                    Metric
                  </th>
                  <th 
                    scope="col" 
                    className={cn(
                      "px-3 py-3.5 text-center text-sm font-semibold sm:table-cell cursor-pointer",
                      activeMode === 'all' ? "text-trackscore-blue" : "text-slate-900"
                    )}
                    onClick={() => setActiveMode('all')}
                  >
                    ALL SHIPPING
                    <div className="text-xs font-normal text-slate-500">(minimum optimization)</div>
                  </th>
                  <th 
                    scope="col" 
                    className={cn(
                      "px-3 py-3.5 text-center text-sm font-semibold sm:table-cell cursor-pointer",
                      activeMode === 'custom' ? "text-trackscore-blue" : "text-slate-900"
                    )}
                    onClick={() => setActiveMode('custom')}
                  >
                    CUSTOM*
                    <div className="text-xs font-normal text-slate-500">(manual selection)</div>
                  </th>
                  <th 
                    scope="col" 
                    className={cn(
                      "px-3 py-3.5 text-center text-sm font-semibold sm:table-cell cursor-pointer",
                      activeMode === 'auto' ? "text-trackscore-blue" : "text-slate-900"
                    )}
                    onClick={() => setActiveMode('auto')}
                  >
                    AUTO*
                    <div className="text-xs font-normal text-slate-500">(system optimization)</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {performanceData.map((item, index) => {
                  const bestMode = getBestMode(item.metric);
                  
                  return (
                    <tr key={index} className="hover:bg-slate-50 transition-colors duration-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6 flex items-center">
                        {item.metric}
                        {item.info && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="ml-2">
                                <Info className="w-4 h-4 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">{item.info}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </td>
                      <td className={cn(
                        "whitespace-nowrap px-3 py-4 text-sm text-center",
                        activeMode === 'all' && "bg-slate-50",
                        bestMode === 'all' && "font-semibold text-slate-900",
                        bestMode !== 'all' && "text-slate-500"
                      )}>
                        {formatValue(item.all)}
                      </td>
                      <td className={cn(
                        "whitespace-nowrap px-3 py-4 text-sm text-center",
                        activeMode === 'custom' && "bg-slate-50",
                        bestMode === 'custom' && "font-semibold text-slate-900",
                        bestMode !== 'custom' && "text-slate-500"
                      )}>
                        {formatValue(item.custom)}
                      </td>
                      <td className={cn(
                        "whitespace-nowrap px-3 py-4 text-sm text-center",
                        activeMode === 'auto' && "bg-slate-50",
                        bestMode === 'auto' && "font-semibold text-trackscore-blue",
                        bestMode !== 'auto' && "text-slate-500"
                      )}>
                        {formatValue(item.auto)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-trackscore-text">Business Impact</h2>
        <button 
          className="py-1.5 px-3 text-sm font-medium rounded-md border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
          onClick={() => setShowComparison(!showComparison)}
        >
          {showComparison ? 'HIDE DETAILS' : 'SHOW DETAILS'}
        </button>
      </div>
      
      {showComparison && <ComparisonTable />}
    </div>
  );
};

export default PerformanceChart;
