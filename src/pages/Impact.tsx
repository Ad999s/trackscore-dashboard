
import React, { useState } from 'react';
import { Calendar, RefreshCw, Download, Filter, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BusinessMetricsDashboard from '@/components/Reports/BusinessMetricsDashboard';
import BusinessImpactCard from '@/components/Dashboard/BusinessImpactCard';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Define tooltip payload type
interface TooltipPayload {
  name: string;
  value: number;
  payload?: {
    date: string;
    [key: string]: any;
  };
}

// Generate inventory usage data with pattern
const generateInventoryData = (timeframe: string) => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    const day = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    
    // Generate pattern for inventory usage reducing over time
    const baseUsage = 100 - (i * 0.8);
    const trackscoreUsage = baseUsage - ((i * 0.8) + 10);
    
    data.push({
      date: day,
      all: Math.max(30, Math.round(baseUsage)),
      withTrackscore: Math.max(10, Math.round(trackscoreUsage))
    });
  }
  
  return data;
};

// Generate delivery success rate data
const generateDeliveryData = (timeframe: string) => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    const day = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    
    // Success rate improving over time
    const baseRate = 80 + (i * 0.1);
    const trackscoreRate = baseRate + ((i * 0.15) + 5);
    
    data.push({
      date: day,
      all: Math.min(100, Math.round(baseRate)),
      withTrackscore: Math.min(100, Math.round(trackscoreRate))
    });
  }
  
  return data;
};

// Generate NPS scores data
const generateNpsData = (timeframe: string) => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    const day = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    
    // NPS increasing over time - TrackScore starts from a higher base
    const baseNps = 35 + (i * 0.4);
    const trackscoreNps = baseNps + ((i * 0.5) + 15);
    
    data.push({
      date: day,
      all: Math.min(100, Math.round(baseNps)),
      withTrackscore: Math.min(100, Math.round(trackscoreNps))
    });
  }
  
  return data;
};

// Generate Daily Cash Flow using a pattern
const generateDailyData = (days: number) => {
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    const day = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    
    // Pattern: cash flow starts negative then improves over time
    // TrackScore cash flow improves faster and higher
    let baseFlow;
    let trackscoreFlow;
    
    if (i < days * 0.2) {
      // First 20% of days - negative cash flow for both
      baseFlow = -5000 - (i * 200);
      trackscoreFlow = -3000 - (i * 100);
    } else if (i < days * 0.4) {
      // Next 20% - base remains negative, trackscore improves faster
      baseFlow = -6000 + (i * 100);
      trackscoreFlow = -2000 + (i * 300);
    } else if (i < days * 0.6) {
      // Next 20% - both improving, base becomes positive
      baseFlow = -2000 + (i * 300);
      trackscoreFlow = 5000 + (i * 500);
    } else {
      // Final 40% - both positive and growing
      baseFlow = 5000 + (i * 400);
      trackscoreFlow = 15000 + (i * 600);
    }
    
    // Add some randomness
    const randomBase = Math.random() * 2000 - 1000;
    const randomTrack = Math.random() * 2000 - 1000;
    
    data.push({
      date: day,
      all: Math.round(baseFlow + randomBase),
      withTrackscore: Math.round(trackscoreFlow + randomTrack)
    });
  }
  
  return data;
};

// Custom tooltip formatters
const inventoryTooltipFormatter = (value: number, name: string) => {
  return [`${value}%`, name === 'all' ? 'Without TrackScore' : 'With TrackScore'];
};

const deliveryTooltipFormatter = (value: number, name: string) => {
  return [`${value}%`, name === 'all' ? 'Without TrackScore' : 'With TrackScore'];
};

const npsTooltipFormatter = (value: number, name: string) => {
  return [`${value}`, name === 'all' ? 'Without TrackScore' : 'With TrackScore'];
};

const cashflowTooltipFormatter = (value: number, name: string) => {
  return [`₹${(value/1000).toFixed(1)}K`, name === 'all' ? 'Without TrackScore' : 'With TrackScore'];
};

const BusinessImpact = () => {
  const [timeframe, setTimeframe] = useState<string>('30d');
  const [activeMetricCard, setActiveMetricCard] = useState<string | null>(null);
  
  const inventoryData = generateInventoryData(timeframe);
  const deliveryData = generateDeliveryData(timeframe);
  const npsData = generateNpsData(timeframe);
  const cashflowData = generateDailyData(timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90);
  
  const formatCurrency = (value: number) => `₹${(value/1000).toFixed(1)}K`;
  const formatPercentage = (value: number) => `${value.toString()}%`;
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Business Impact</h1>
        <p className="text-muted-foreground">
          See how TrackScore is improving your business metrics across all areas
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <BusinessImpactCard />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Inventory Usage Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inventory Usage</CardTitle>
            <CardDescription>Percentage of inventory allocated to orders with TrackScore vs without</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                all: { label: 'Without TrackScore', color: '#94a3b8' },
                withTrackscore: { label: 'With TrackScore', color: '#f97316' }
              }}
              className="h-80"
            >
              <AreaChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value.toString()}%`} 
                  domain={[0, 100]}
                  style={{ fontSize: '0.75rem' }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={inventoryTooltipFormatter}
                />
                <Area 
                  type="monotone" 
                  dataKey="all" 
                  stackId="1" 
                  stroke="#94a3b8" 
                  fill="#94a3b8" 
                />
                <Area 
                  type="monotone" 
                  dataKey="withTrackscore" 
                  stackId="2" 
                  stroke="#f97316" 
                  fill="#f97316" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Delivery Success Rate Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Delivery Rate</CardTitle>
            <CardDescription>Percentage of successful deliveries with TrackScore vs without</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                all: { label: 'Without TrackScore', color: '#94a3b8' },
                withTrackscore: { label: 'With TrackScore', color: '#f97316' }
              }}
              className="h-80"
            >
              <LineChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value.toString()}%`} 
                  domain={[60, 100]}
                  style={{ fontSize: '0.75rem' }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={deliveryTooltipFormatter}
                />
                <Line 
                  type="monotone" 
                  dataKey="all" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="withTrackscore" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* NPS Score Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">NPS Score</CardTitle>
            <CardDescription>Net Promoter Score with TrackScore vs without</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                all: { label: 'Without TrackScore', color: '#94a3b8' },
                withTrackscore: { label: 'With TrackScore', color: '#f97316' }
              }}
              className="h-80"
            >
              <LineChart data={npsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  domain={[0, 100]}
                  style={{ fontSize: '0.75rem' }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={npsTooltipFormatter}
                />
                <Line 
                  type="monotone" 
                  dataKey="all" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="withTrackscore" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Cash Flow Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Daily Cash Flow</CardTitle>
            <CardDescription>Daily cash flow with TrackScore vs without (in thousands)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                all: { label: 'Without TrackScore', color: '#94a3b8' },
                withTrackscore: { label: 'With TrackScore', color: '#f97316' }
              }}
              className="h-80"
            >
              <LineChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  tickFormatter={(value) => `₹${Math.round(value/1000)}k`}
                  style={{ fontSize: '0.75rem' }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={cashflowTooltipFormatter}
                />
                <Line 
                  type="monotone" 
                  dataKey="all" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="withTrackscore" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <BusinessMetricsDashboard onMetricCardClick={setActiveMetricCard} />
    </div>
  );
};

export default BusinessImpact;
