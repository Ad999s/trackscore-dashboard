
import React, { useState } from 'react';
import { Calendar, RefreshCw, Download, Filter, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from 'recharts';
import AdvancedFilters from '@/components/Reports/AdvancedFilters';
import TimeframeFilter from '@/components/Reports/TimeframeFilter';

// Sample data for all graphs
const generateDailyData = (days = 30) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate base metrics
    const baseProfit = 5000 + Math.random() * 2000;
    const baseInventory = 80 + Math.random() * 20;
    const baseUpfrontCost = 8000 + Math.random() * 2000;
    const baseDeliveryRate = 70 + Math.random() * 10;
    
    // Generate improved metrics (with TrackScore impact)
    const improvedProfit = baseProfit * (1 + 0.15 + Math.random() * 0.1); // 15-25% better
    const improvedInventory = baseInventory * (0.7 - Math.random() * 0.15); // 15-30% less
    const improvedUpfrontCost = baseUpfrontCost * (0.7 - Math.random() * 0.1); // 20-30% less
    const improvedDeliveryRate = Math.min(98, baseDeliveryRate * (1 + 0.15 + Math.random() * 0.1)); // 15-25% better
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date,
      baseProfit: Math.round(baseProfit),
      improvedProfit: Math.round(improvedProfit),
      baseCost: Math.round(baseUpfrontCost),
      improvedCost: Math.round(improvedUpfrontCost),
      baseInventory: Math.round(baseInventory),
      improvedInventory: Math.round(improvedInventory),
      baseDelivery: Math.round(baseDeliveryRate * 10) / 10,
      improvedDelivery: Math.round(improvedDeliveryRate * 10) / 10,
    });
  }
  
  return data;
};

// Fix type definitions for tooltip content
interface TooltipPayload {
  value: number;
  name: string;
  dataKey: string;
  color: string;
}

const ImpactGraph = ({ 
  title, 
  data, 
  baseKey, 
  improvedKey, 
  color = "#8B5CF6", 
  areaColor = "#E5DEFF",
  improvedColor = "#33C3F0",
  yAxisFormatter = (value: number) => `${value}`,
  tooltipFormatter = (value: number) => `${value}`,
  unit = "",
  invertCompare = false // if true, lower is better (like for costs)
}) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
            >
              <defs>
                <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
                <linearGradient id={`colorImproved${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={improvedColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={improvedColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6E7191', fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#E4E4E4' }}
              />
              <YAxis 
                tick={{ fill: '#6E7191', fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={yAxisFormatter}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const baseValue = (payload[0] as TooltipPayload).value;
                    const improvedValue = (payload[1] as TooltipPayload).value;
                    
                    return (
                      <div className="bg-white p-3 border border-gray-100 shadow-md rounded-md">
                        <p className="text-sm font-medium">{label}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs flex items-center">
                            <span className="w-3 h-3 inline-block mr-2 rounded-full" style={{ backgroundColor: color }}></span>
                            <span className="text-gray-500">Standard: </span>
                            <span className="font-medium ml-2">{tooltipFormatter(baseValue)}{unit}</span>
                          </p>
                          <p className="text-xs flex items-center">
                            <span className="w-3 h-3 inline-block mr-2 rounded-full" style={{ backgroundColor: improvedColor }}></span>
                            <span className="text-gray-500">With TrackScore: </span>
                            <span className="font-medium ml-2">{tooltipFormatter(improvedValue)}{unit}</span>
                          </p>
                          {(typeof baseValue === 'number' && typeof improvedValue === 'number') && (
                            <p className="text-xs mt-1 pt-1 border-t border-gray-100">
                              <span className="text-gray-500">Impact: </span>
                              <span className={`font-medium ${invertCompare 
                                ? improvedValue < baseValue ? 'text-green-500' : 'text-red-500'
                                : improvedValue > baseValue ? 'text-green-500' : 'text-red-500'}`}>
                                {invertCompare
                                  ? improvedValue < baseValue 
                                    ? `${Math.round((1 - improvedValue / baseValue) * 100)}% lower`
                                    : `${Math.round((improvedValue / baseValue - 1) * 100)}% higher`
                                  : improvedValue > baseValue 
                                    ? `${Math.round((improvedValue / baseValue - 1) * 100)}% higher`
                                    : `${Math.round((1 - improvedValue / baseValue) * 100)}% lower`
                                }
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey={baseKey} 
                name="Standard" 
                stroke={color} 
                fill={`url(#color${title.replace(/\s+/g, '')})`} 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: color, strokeWidth: 1, fill: 'white' }}
              />
              <Area 
                type="monotone" 
                dataKey={improvedKey} 
                name="With TrackScore" 
                stroke={improvedColor} 
                fill={`url(#colorImproved${title.replace(/\s+/g, '')})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: improvedColor, strokeWidth: 1, fill: 'white' }}
              />
              <Legend verticalAlign="top" height={36} content={renderLegend} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Custom legend component
const renderLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <div className="flex items-center justify-end mb-2">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center ml-4">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const Impact = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [filterOpen, setFilterOpen] = useState(false);
  const [timeView, setTimeView] = useState('daily');
  const data = generateDailyData(timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90);
  
  const formatCurrency = (value: number) => `₹${(value/1000).toFixed(1)}K`;
  const formatPercentage = (value: number) => `${value}%`;
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Business Impact</h1>
          <p className="text-slate-500 mt-1">
            Visualize how TrackScore improves your business metrics
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <TimeframeFilter value={timeframe} onValueChange={setTimeframe} />
          
          <Tabs value={timeView} onValueChange={setTimeView} className="h-9">
            <TabsList className="h-9">
              <TabsTrigger value="daily" className="h-9 px-3">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="h-9 px-3">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="h-9 px-3">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <AdvancedFilters onClose={() => setFilterOpen(false)} />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ImpactGraph 
          title="Profit Impact" 
          data={data} 
          baseKey="baseProfit" 
          improvedKey="improvedProfit" 
          color="#8B5CF6"
          improvedColor="#33C3F0"
          yAxisFormatter={formatCurrency}
          tooltipFormatter={formatCurrency}
          unit=""
        />
        
        <ImpactGraph 
          title="Upfront Cost Savings" 
          data={data} 
          baseKey="baseCost" 
          improvedKey="improvedCost" 
          color="#F97316"
          improvedColor="#33C3F0"
          yAxisFormatter={formatCurrency}
          tooltipFormatter={formatCurrency}
          unit=""
          invertCompare={true}
        />
        
        <ImpactGraph 
          title="Inventory Usage" 
          data={data} 
          baseKey="baseInventory" 
          improvedKey="improvedInventory" 
          color="#D946EF"
          improvedColor="#33C3F0"
          yAxisFormatter={(value) => `${value.toString()}%`}
          tooltipFormatter={(value) => value}
          unit="%"
          invertCompare={true}
        />
        
        <ImpactGraph 
          title="Delivery Rate" 
          data={data} 
          baseKey="baseDelivery" 
          improvedKey="improvedDelivery" 
          color="#0EA5E9"
          improvedColor="#33C3F0"
          yAxisFormatter={(value) => `${value.toString()}%`}
          tooltipFormatter={(value) => value}
          unit="%"
        />
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Metrics Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-sm text-slate-500">Avg. Profit Increase</div>
              <div className="text-2xl font-bold text-green-600">+21.8%</div>
              <div className="text-xs text-slate-400 mt-1">vs. Standard Operations</div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-sm text-slate-500">Upfront Cost Reduction</div>
              <div className="text-2xl font-bold text-green-600">-24.5%</div>
              <div className="text-xs text-slate-400 mt-1">₹1.8M savings in 30 days</div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-sm text-slate-500">Inventory Efficiency</div>
              <div className="text-2xl font-bold text-green-600">+27.2%</div>
              <div className="text-xs text-slate-400 mt-1">Better inventory utilization</div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-sm text-slate-500">Delivery Rate Improvement</div>
              <div className="text-2xl font-bold text-green-600">+18.3%</div>
              <div className="text-xs text-slate-400 mt-1">Higher customer satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Impact;
