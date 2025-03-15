
import React, { useState } from 'react';
import { Info, Calendar, Target, TrendingUp, TrendingDown, ArrowUp } from 'lucide-react';
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Generate mock data for 30 days with remittance pattern based on COD business
const generateGoalBasedCashflowData = (ordersPerDay: number) => {
  const data = [];
  let normalBalance = 0;
  let goalBalance = 0;
  
  // Initial investment
  normalBalance = -20000;
  goalBalance = -20000 * (ordersPerDay / 100); // Scale initial investment by order goal
  
  for (let day = 1; day <= 30; day++) {
    // Daily expenses (negative cashflow)
    normalBalance -= 10000;
    goalBalance -= 10000 * (ordersPerDay / 100);
    
    // Tuesday and Friday remittances (D+2 settlement)
    if ((day - 2) % 7 === 0 || (day - 5) % 7 === 0) {
      // Remittance for orders from 2 days ago
      if (day > 2) {
        normalBalance += 70000;
        goalBalance += 70000 * (ordersPerDay / 100);
      }
    }
    
    // Add some variability
    const normalVar = Math.random() * 5000 - 2500;
    const goalVar = Math.random() * (5000 * ordersPerDay / 100) - (2500 * ordersPerDay / 100);
    
    data.push({
      day,
      normal: Math.round(normalBalance + normalVar),
      goal: Math.round(goalBalance + goalVar),
      isRemittanceDay: (day - 2) % 7 === 0 || (day - 5) % 7 === 0
    });
  }
  
  return data;
};

// Calculate key metrics based on goal
const calculateGoalMetrics = (ordersPerDay: number) => {
  const breakeven = Math.max(10, Math.round(18 - (ordersPerDay - 100) / 50));
  const inventoryRequired = Math.round(200000 * (ordersPerDay / 100));
  const profit15Days = Math.round(-80000 * (ordersPerDay / 100));
  const profit30Days = Math.round(450000 * (ordersPerDay / 100));
  
  return [
    {
      metric: 'Breakeven Day',
      normal: '18 days',
      goal: `${breakeven} days`,
      improvement: 18 - breakeven,
      info: 'Number of days to recover initial investment'
    },
    {
      metric: 'Inventory Required',
      normal: '₹200,000',
      goal: `₹${inventoryRequired.toLocaleString()}`,
      improvement: inventoryRequired - 200000,
      info: 'Capital tied up in inventory'
    },
    {
      metric: 'Net Profit (15 days)',
      normal: '₹-80,000',
      goal: `₹${profit15Days.toLocaleString()}`,
      improvement: profit15Days - (-80000),
      info: 'Profit/loss after 15 days'
    },
    {
      metric: 'Net Profit (30 days)',
      normal: '₹${profit30Days.toLocaleString()}',
      goal: `₹${profit30Days.toLocaleString()}`,
      improvement: profit30Days - 450000,
      info: 'Profit/loss after 30 days'
    },
  ];
};

const CashflowGoalForecast: React.FC = () => {
  const [ordersPerDay, setOrdersPerDay] = useState<number>(100);
  const [tempOrdersPerDay, setTempOrdersPerDay] = useState<string>("100");
  const [cashflowData, setCashflowData] = useState(generateGoalBasedCashflowData(100));
  const [metrics, setMetrics] = useState(calculateGoalMetrics(100));
  
  const handleOrdersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempOrdersPerDay(e.target.value);
  };
  
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setOrdersPerDay(newValue);
    setTempOrdersPerDay(newValue.toString());
    setCashflowData(generateGoalBasedCashflowData(newValue));
    setMetrics(calculateGoalMetrics(newValue));
  };
  
  const applyOrdersGoal = () => {
    const newValue = parseInt(tempOrdersPerDay) || 100;
    const clampedValue = Math.max(50, Math.min(1000, newValue));
    setOrdersPerDay(clampedValue);
    setTempOrdersPerDay(clampedValue.toString());
    setCashflowData(generateGoalBasedCashflowData(clampedValue));
    setMetrics(calculateGoalMetrics(clampedValue));
  };
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dayData = cashflowData.find(d => d.day === label);
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-md shadow-md">
          <p className="font-semibold">Day {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name === 'normal' ? 'Current: ' : 'Goal Forecast: '}
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
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-trackscore-text">Goal-Based Cashflow Forecast</h2>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger className="ml-2">
                <Info className="w-4 h-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Set a daily order goal to see how it impacts your cashflow. The forecast is based on your current patterns but scaled to meet your goal.
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
      
      {/* Goal Setting Controls */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Target className="w-4 h-4 mr-2 text-orange-500" />
            Set Order Goal
          </CardTitle>
          <CardDescription>
            Define your daily orders target to see the projected cashflow impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 w-full md:w-1/3">
                <Input
                  type="number"
                  value={tempOrdersPerDay}
                  onChange={handleOrdersChange}
                  className="w-full"
                  min={50}
                  max={1000}
                />
                <span className="text-sm whitespace-nowrap">orders/day</span>
                <Button 
                  onClick={applyOrdersGoal} 
                  size="sm" 
                  className="whitespace-nowrap"
                >
                  Apply
                </Button>
              </div>
              
              <div className="w-full md:w-2/3 px-2">
                <Slider
                  value={[ordersPerDay]}
                  onValueChange={handleSliderChange}
                  min={50}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>50</span>
                  <span>500</span>
                  <span>1000</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-orange-50 border border-orange-100 rounded-md">
              <p className="text-sm text-orange-700 flex items-center">
                <ArrowUp className="w-4 h-4 mr-2 text-orange-500" />
                <span>
                  Current goal is set to <strong>{ordersPerDay} orders per day</strong>, which is <strong>{Math.round(ordersPerDay/100*100)}%</strong> of your baseline (100 orders/day).
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
              tickFormatter={(value) => `₹${value/1000}k`}
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
              name="Current"
            />
            <Line
              type="monotone"
              dataKey="goal"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
              name="Goal Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-lg mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#0EA5E9]" />
          <span className="text-sm font-medium">Current (100 orders/day)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#F97316]" />
          <span className="text-sm font-medium">Goal ({ordersPerDay} orders/day)</span>
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
                CURRENT
              </th>
              <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-orange-500">
                GOAL FORECAST
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {metrics.map((item, index) => (
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
                    {item.goal}
                    {item.metric === 'Breakeven Day' ? (
                      <TrendingDown className="w-4 h-4 text-green-500 ml-1" />
                    ) : item.metric === 'Inventory Required' ? (
                      <TrendingUp className="w-4 h-4 text-blue-500 ml-1" />
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
            <h4 className="font-semibold text-orange-500 mb-2">Goal-Based Forecast Impact</h4>
            <p className="text-sm text-slate-600">
              Setting a goal of {ordersPerDay} orders per day would {ordersPerDay > 100 ? 'increase' : 'decrease'} your profit after 30 days 
              to approximately ₹{Math.round(450000 * (ordersPerDay / 100)).toLocaleString()}, which is {ordersPerDay > 100 ? `${Math.round((ordersPerDay - 100))}% more than` : `${Math.round((100 - ordersPerDay))}% less than`} your current projection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashflowGoalForecast;
