
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface ProfitGraphProps {
  threshold: number;
  onAutoThresholdChange: (value: number) => void;
}

const ProfitGraph: React.FC<ProfitGraphProps> = ({ threshold, onAutoThresholdChange }) => {
  // Generate data based on a bell curve to simulate profit optimization
  const [data, setData] = useState<{ orders: number; profit: number; }[]>([]);
  const [optimalThreshold, setOptimalThreshold] = useState(120);
  
  useEffect(() => {
    const generateData = () => {
      const totalOrders = 156;
      const peak = 120; // Optimal threshold
      const newData = [];
      
      // Create a smoother bell curve for profit
      for (let i = 0; i <= totalOrders; i += 5) {
        let profit;
        
        // Using a more mathematical bell curve formula for smoothness
        // This is a modified Gaussian function
        const standardDeviation = 50;
        const amplitude = 100;
        profit = Math.round(amplitude * Math.exp(-Math.pow(i - peak, 2) / (2 * Math.pow(standardDeviation, 2))));
        
        newData.push({ orders: i, profit });
      }
      
      setData(newData);
      setOptimalThreshold(peak);
    };
    
    generateData();
  }, []); // We don't want the graph to regenerate when threshold changes
  
  const calculateThresholdPosition = () => {
    const totalOrders = 156;
    return Math.round(threshold * totalOrders / 100);
  };
  
  // Get maximum profit value from the data array
  const getMaxProfit = () => {
    if (data.length === 0) return 0;
    return Math.max(...data.map(item => item.profit));
  };
  
  return (
    <div className="glass-card p-6 h-full flex flex-col animate-scale-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm text-slate-500 font-medium uppercase tracking-wide">Profit vs Orders Shipped Graph</h3>
          <p className="text-sm text-slate-600 mt-1">
            Sorted orders from highest to lowest quality
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-sm text-slate-600">High Quality</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="ml-2 text-sm text-slate-600">Low Quality</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className="ml-2 text-sm text-slate-600">Current Threshold</span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow" style={{ minHeight: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#F97316" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ea384c" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="colorProfitFill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#F97316" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ea384c" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="orders" 
              label={{ 
                value: 'Orders Shipped', 
                position: 'insideBottomRight', 
                offset: -5 
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ 
                value: 'Profit', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, 'Profit']}
              labelFormatter={(value) => `Orders: ${value}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            {/* Horizontal reference line at the peak - Maximum profit */}
            <ReferenceLine 
              y={getMaxProfit()} 
              stroke="#10B981" 
              strokeWidth={1.5}
              strokeDasharray="5 5"
              label={{ 
                value: 'Maximum Profit', 
                position: 'right',
                fill: '#10B981',
                fontSize: 12
              }} 
            />
            
            {/* Horizontal reference line at 50% of the peak - All shipping profit */}
            <ReferenceLine 
              y={getMaxProfit() * 0.5} 
              stroke="#64748B" 
              strokeWidth={1.5}
              strokeDasharray="5 5"
              label={{ 
                value: 'All Shipping Profit', 
                position: 'right',
                fill: '#64748B',
                fontSize: 12
              }} 
            />
            
            {/* Vertical reference line at the optimal threshold */}
            <ReferenceLine 
              x={optimalThreshold} 
              stroke="#10B981" 
              strokeWidth={2} 
              label={{ 
                value: 'OPTIMAL', 
                position: 'top',
                fill: '#10B981',
                fontSize: 12
              }} 
            />
            
            {/* Vertical reference line at the current threshold */}
            <ReferenceLine 
              x={calculateThresholdPosition()} 
              stroke="#F97316" 
              strokeWidth={2} 
              strokeDasharray="3 3"
            />
            
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="url(#colorProfit)" 
              fillOpacity={1} 
              fill="url(#colorProfitFill)" 
              strokeWidth={2}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitGraph;
