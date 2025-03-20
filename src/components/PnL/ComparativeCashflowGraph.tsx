
import React, { useState, useEffect } from 'react';
import { Info, Calendar } from 'lucide-react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

// Generate mock data for comparison cashflow
const generateComparativeCashflowData = () => {
  const now = new Date();
  const currentDay = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
  // Generate data for all days in the current month
  const data = [];
  for (let day = 1; day <= daysInMonth; day++) {
    // Generate realistic cashflow patterns with random variations
    let withoutTrackscoreValue;
    let withTrackscoreValue;
    
    if (day < 8) {
      // First week: mostly negative cashflow (initial investments, beginning of month costs)
      withoutTrackscoreValue = -50000 + (day * 5000) + (Math.random() * 20000 - 10000);
      // With TrackScore performs better - less negative cashflow in beginning
      withTrackscoreValue = withoutTrackscoreValue * 0.85;
    } else if (day < 15) {
      // Second week: some recovery, mixed cashflow
      withoutTrackscoreValue = -10000 + (day * 3000) + (Math.random() * 30000 - 15000);
      // TrackScore recovers faster
      withTrackscoreValue = withoutTrackscoreValue + 15000;
    } else if (day < 22) {
      // Third week: good performance, positive cashflow
      withoutTrackscoreValue = 30000 + (day * 2000) + (Math.random() * 40000 - 20000);
      // TrackScore performs better in positive periods
      withTrackscoreValue = withoutTrackscoreValue * 1.2;
    } else {
      // Fourth week: peak performance, high positive cashflow
      withoutTrackscoreValue = 70000 + (day * 1000) + (Math.random() * 50000 - 25000);
      // TrackScore maintains advantage
      withTrackscoreValue = withoutTrackscoreValue * 1.3;
    }
    
    // Add COD remittance days (typically twice a week)
    const isRemittanceDay = day % 3 === 2 || day % 7 === 5;
    
    // Add higher value for remittance days
    if (isRemittanceDay) {
      withoutTrackscoreValue += 40000 + (Math.random() * 20000);
      // TrackScore has more successful orders, so COD remittances are higher
      withTrackscoreValue += 55000 + (Math.random() * 25000);
    }
    
    data.push({
      day,
      withoutTrackscore: Math.round(withoutTrackscoreValue),
      withTrackscore: Math.round(withTrackscoreValue),
      isRemittanceDay
    });
  }
  
  return data;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dayData = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-md shadow-md">
        <p className="font-semibold">Day {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.dataKey === 'withoutTrackscore' ? 'Without TrackScore: ' : 'With TrackScore: '}
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

const ComparativeCashflowGraph: React.FC = () => {
  const [cashflowData, setCashflowData] = useState(generateComparativeCashflowData());
  const [currentDate] = useState(new Date());
  const currentDay = currentDate.getDate();
  
  // Colors
  const withoutTrackscoreColor = "#ea384c";
  const withTrackscoreColor = "#33C3F0";
  
  useEffect(() => {
    // In a real app, this would fetch actual cashflow data
    setCashflowData(generateComparativeCashflowData());
  }, []);
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-trackscore-text">Live Cashflow Comparison</h2>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger className="ml-2">
                <Info className="w-4 h-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Real-time view of your daily cashflow comparing performance with and without TrackScore.
                  A vertical line shows today's date.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-slate-400 mr-2" />
            <span className="text-sm font-medium">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="h-96 mb-6">
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
              label={{ value: 'Day of Month', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis 
              label={{ value: 'Cashflow (₹)', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
            {/* Vertical reference line for current day */}
            <ReferenceLine 
              x={currentDay} 
              stroke="#FF5722" 
              strokeWidth={2} 
              label={{ 
                value: 'Today', 
                position: 'top', 
                fill: '#FF5722', 
                fontSize: 12 
              }} 
            />
            <Line
              type="monotone"
              dataKey="withoutTrackscore"
              stroke={withoutTrackscoreColor}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
              name="Without TrackScore"
            />
            <Line
              type="monotone"
              dataKey="withTrackscore"
              stroke={withTrackscoreColor}
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
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: withoutTrackscoreColor }} />
          <span className="text-sm font-medium">Without TrackScore</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: withTrackscoreColor }} />
          <span className="text-sm font-medium">With TrackScore</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5722" }} />
          <span className="text-sm font-medium">Current Day</span>
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
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Cashflow Patterns</CardTitle>
          <CardDescription>
            Typical patterns observed in your daily cashflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-2">Peak Days</h4>
              <p className="text-sm text-slate-600">
                Your cashflow typically peaks on COD remittance days (Tuesdays and Fridays), 
                with an average increase of ₹40K-60K compared to non-remittance days.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-medium text-amber-700 mb-2">End of Month</h4>
              <p className="text-sm text-slate-600">
                The last week of the month shows the strongest positive cashflow, 
                with daily averages 3x higher than the first week of the month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparativeCashflowGraph;
