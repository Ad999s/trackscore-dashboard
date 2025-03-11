
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

type ShippingMode = 'normal' | 'custom' | 'auto';

// Generate mock data for 30 days with remittance pattern
const generateCashflowData = () => {
  const data = [];
  let normalBalance = 0;
  let customBalance = 0;
  let autoBalance = 0;
  
  // Initial investment
  normalBalance = -10000;
  customBalance = -7500;
  autoBalance = -5000;
  
  for (let day = 1; day <= 30; day++) {
    // Daily sales expenses (negative cashflow)
    normalBalance -= 800;
    customBalance -= 600;
    autoBalance -= 400;
    
    // Tuesday and Friday remittances (D+7 settlement)
    if ((day - 2) % 7 === 0 || (day - 5) % 7 === 0) {
      // Remittance for orders from 7 days ago
      if (day > 7) {
        normalBalance += 1200;
        customBalance += 1400;
        autoBalance += 1600;
      }
    }
    
    // Prepaid settlements (smaller but regular)
    if (day % 3 === 0) {
      normalBalance += 300;
      customBalance += 400;
      autoBalance += 500;
    }
    
    // Add some variability
    const normalVar = Math.random() * 200 - 100;
    const customVar = Math.random() * 150 - 75;
    const autoVar = Math.random() * 100 - 50;
    
    data.push({
      day,
      normal: Math.round(normalBalance + normalVar),
      custom: Math.round(customBalance + customVar),
      auto: Math.round(autoBalance + autoVar),
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
    normal: '24 days',
    custom: '18 days',
    auto: '15 days',
    info: 'Number of days to recover initial investment'
  },
  {
    metric: 'Inventory Required',
    normal: '₹12,000',
    custom: '₹9,000',
    auto: '₹6,500',
    info: 'Capital tied up in inventory'
  },
  {
    metric: 'Prepaid Remittance',
    normal: '₹3,600',
    custom: '₹4,800',
    auto: '₹6,000',
    info: 'Total prepaid remittance in 30 days'
  },
  {
    metric: 'COD Remittance',
    normal: '₹7,200',
    custom: '₹8,400',
    auto: '₹9,600',
    info: 'Total COD remittance in 30 days'
  },
  {
    metric: 'Net Profit (15 days)',
    normal: '₹-4,800',
    custom: '₹-1,200',
    auto: '₹1,500',
    info: 'Profit/loss after 15 days'
  },
  {
    metric: 'Net Profit (30 days)',
    normal: '₹2,200',
    custom: '₹6,800',
    auto: '₹10,400',
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
              {entry.name === 'normal' ? 'Normal: ' : entry.name === 'custom' ? 'Custom: ' : 'Auto: '}
              <span className="font-medium">₹{entry.value.toLocaleString()}</span>
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
                  Compare the cashflow patterns between Normal, Custom, and Auto shipping modes.
                  COD remittances occur on Tuesdays and Fridays (D+7).
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
          <button className="py-1.5 px-3 text-sm font-medium rounded-md border border-slate-200 hover:bg-slate-50 transition-colors duration-200">
            ADD FORMULA
          </button>
        </div>
      </div>
      
      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={cashflowData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              label={{ value: 'Days', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis 
              label={{ value: 'Cashflow (₹)', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => `₹${value/1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="normal"
              stroke="#333"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
              name="Normal"
            />
            <Line
              type="monotone"
              dataKey="custom"
              stroke="#6E59A5"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
              name="Custom"
            />
            <Line
              type="monotone"
              dataKey="auto"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
              name="Auto"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-lg mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-700" />
          <span className="text-sm font-medium">Normal Shipping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#6E59A5]" />
          <span className="text-sm font-medium">Custom Selection</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
          <span className="text-sm font-medium">Auto (System)</span>
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
            <span className="font-medium">Tuesday:</span> Shipping Remittance
          </div>
          <div className="text-xs text-blue-600">
            <span className="font-medium">Friday:</span> Shipping Remittance
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
                NORMAL
              </th>
              <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-slate-700">
                CUSTOM
              </th>
              <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-trackscore-blue">
                AUTO
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
                <td className="whitespace-nowrap px-4 py-3 text-sm text-center text-slate-600">
                  {item.custom}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-center font-medium text-trackscore-blue bg-blue-50/50">
                  <div className="flex items-center justify-center">
                    {item.auto}
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
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-md text-center">
            <h4 className="font-semibold text-trackscore-blue mb-2">Auto Shipping Advantage</h4>
            <p className="text-sm text-slate-600">
              Auto mode breaks even 9 days earlier than normal shipping with 45% less inventory 
              requirement and generates 372% more profit at the 15-day mark.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashflowComparison;
