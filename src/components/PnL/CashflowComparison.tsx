
import React, { useState } from 'react';
import { Info, Calendar, TrendingUp, TrendingDown, CircleCheck } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';
import {
  TooltipProvider,
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

// Format currency to K, Lakhs, or Crores
const formatCurrency = (value: number) => {
  const absValue = Math.abs(value);
  if (absValue >= 10000000) { // 1 Crore = 10,000,000
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (absValue >= 100000) { // 1 Lakh = 100,000
    return `₹${(value / 100000).toFixed(2)} L`;
  } else if (absValue >= 1000) { // 1 Thousand = 1,000
    return `₹${(value / 1000).toFixed(1)}K`;
  } else {
    return `₹${value}`;
  }
};

type ShippingMode = 'normal' | 'trackscore';

// Generate mock data for 30 days with remittance pattern based on COD business
const generateCashflowData = () => {
  const data = [];
  let normalBalance = 0;
  let trackscoreBalance = 0;
  
  // Initial investment
  normalBalance = -20000;
  trackscoreBalance = -10000;
  
  for (let day = 1; day <= 30; day++) {
    // Daily expenses (negative cashflow)
    normalBalance -= 10000;
    trackscoreBalance -= 8000;
    
    // Tuesday and Friday remittances (D+2 settlement)
    if ((day - 2) % 7 === 0 || (day - 5) % 7 === 0) {
      // Remittance for orders from 2 days ago
      if (day > 2) {
        normalBalance += 70000;
        trackscoreBalance += 90000;
      }
    }
    
    // Add some variability
    const normalVar = Math.random() * 5000 - 2500;
    const trackscoreVar = Math.random() * 3000 - 1500;
    
    data.push({
      day,
      normal: Math.round(normalBalance + normalVar),
      trackscore: Math.round(trackscoreBalance + trackscoreVar),
      isRemittanceDay: (day - 2) % 7 === 0 || (day - 5) % 7 === 0
    });
  }
  
  return data;
};

const cashflowData = generateCashflowData();

// Performance metrics for comparison
const performanceMetrics = [
  {
    metric: 'Breakeven Day',
    normal: '18 days',
    trackscore: '14 days',
    info: 'Number of days to recover initial investment'
  },
  {
    metric: 'Inventory Required',
    normal: '₹200,000',
    trackscore: '₹120,000',
    info: 'Capital tied up in inventory'
  },
  {
    metric: 'Net Profit (15 days)',
    normal: '₹-80,000',
    trackscore: '₹-20,000',
    info: 'Profit/loss after 15 days'
  },
  {
    metric: 'Net Profit (30 days)',
    normal: '₹450,000',
    trackscore: '₹630,000',
    info: 'Profit/loss after 30 days'
  },
];

interface CashflowComparisonProps {
  className?: string;
}

const CashflowComparison: React.FC<CashflowComparisonProps> = ({ className }) => {
  const [activeMode, setActiveMode] = useState<ShippingMode>('normal');
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dayData = cashflowData.find(d => d.day === label);
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-md shadow-md">
          <p className="font-semibold">Day {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name === 'normal' ? 'All Shipping: ' : 'With TrackScore: '}
              <span className="font-medium">{formatCurrency(entry.value)}</span>
            </p>
          ))}
          {dayData?.isRemittanceDay && (
            <p className="text-xs mt-1 text-blue-600 font-medium">COD Remittance Day</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={cn("glass-card p-6", className)}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-trackscore-text">Cashflow Comparison</h2>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger className="ml-2">
                <Info className="w-4 h-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Compare cashflow patterns between all orders and optimized orders with TrackScore.
                  COD remittances occur on Tuesdays and Fridays (D+2).
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-slate-400 mr-2" />
            <span className="text-sm font-medium">30 Days</span>
          </div>
        </div>
      </div>
      
      <div className="h-96 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={cashflowData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              label={{ value: 'Days', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis 
              label={{ value: 'Cashflow (₹)', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="normal"
              stroke="#0EA5E9"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
              name="All"
            />
            <Line
              type="monotone"
              dataKey="trackscore"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
              name="With TrackScore"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-lg mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#0EA5E9]" />
          <span className="text-sm font-medium">All</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#F97316]" />
          <span className="text-sm font-medium">With TrackScore</span>
        </div>
      </div>
      
      <div className="bg-slate-50 p-3 rounded-lg mb-6">
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
          <div className="p-1 border-r">Week</div>
          <div className="p-1">Mon</div>
          <div className="p-1 bg-blue-50">Tue</div>
          <div className="p-1">Wed</div>
          <div className="p-1">Thu</div>
          <div className="p-1 bg-blue-50">Fri</div>
          <div className="p-1">Sat</div>
        </div>
        <div className="mt-1 flex justify-between px-4">
          <div className="text-xs text-blue-600">
            <span className="font-medium">Tuesday:</span> D+2 COD Remittance
          </div>
          <div className="text-xs text-blue-600">
            <span className="font-medium">Friday:</span> D+2 COD Remittance
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900">
                Metric
              </th>
              <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-slate-700">
                ALL
              </th>
              <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-orange-500">
                WITH TRACKSCORE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {performanceMetrics.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-slate-900 flex items-center">
                  {item.metric}
                  {item.info && (
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger className="ml-2">
                          <Info className="w-4 h-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{item.info}</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-center text-slate-600">
                  {item.normal}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-center font-medium text-orange-500 bg-orange-50/50">
                  <div className="flex items-center justify-center">
                    {item.trackscore}
                    {['Breakeven Day', 'Inventory Required'].includes(item.metric) ? (
                      <TrendingDown className="w-4 h-4 text-green-500 ml-1" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-center">
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 max-w-md text-center">
            <h4 className="font-semibold text-orange-500 mb-2">TrackScore Shipping Advantage</h4>
            <p className="text-sm text-slate-600">
              With TrackScore, you break even 4 days earlier than normal shipping with 40% less inventory 
              requirement and generate 40% more profit by the end of the 30-day period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashflowComparison;
