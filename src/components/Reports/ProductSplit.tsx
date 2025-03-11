
import React, { useState } from 'react';
import { Filter, ArrowUpDown, InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const initialData = [
  { name: 'Product 1', value: 100, prevValue: 80 },
  { name: 'Product 2', value: 80, prevValue: 90 },
  { name: 'Product 3', value: 60, prevValue: 40 },
  { name: 'Product 4', value: 40, prevValue: 35 },
  { name: 'Product 5', value: 30, prevValue: 20 },
  { name: 'Product 6', value: 20, prevValue: 25 },
];

const ProductSplit = () => {
  const [data, setData] = useState(initialData);
  const [sortBy, setSortBy] = useState<'value' | 'name'>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [view, setView] = useState<'volume' | 'growth'>('volume');

  const handleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    
    const sortedData = [...data].sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? b.name.localeCompare(a.name) 
          : a.name.localeCompare(b.name);
      } else {
        return sortDirection === 'asc' 
          ? b.value - a.value 
          : a.value - b.value;
      }
    });
    
    setData(sortedData);
  };

  const handleViewChange = (newView: 'volume' | 'growth') => {
    setView(newView);
    if (newView === 'growth') {
      // Calculate growth percentages
      const growthData = initialData.map(item => ({
        name: item.name,
        value: Math.round(((item.value - item.prevValue) / item.prevValue) * 100)
      }));
      setData(growthData);
    } else {
      setData(initialData);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Product Split</CardTitle>
        <div className="flex items-center gap-2">
          <Select 
            defaultValue="volume" 
            onValueChange={(value) => handleViewChange(value as 'volume' | 'growth')}
          >
            <SelectTrigger className="h-8 w-[110px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="growth">Growth %</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSort} 
            className="h-8 w-8"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => view === 'growth' ? `${value}%` : value.toString()}
              />
              <Tooltip 
                formatter={(value) => [
                  view === 'growth' ? `${value}%` : value, 
                  view === 'growth' ? 'Growth' : 'Orders'
                ]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
                }}
              />
              <Bar 
                dataKey="value" 
                fill={view === 'growth' ? '#10B981' : '#8884d8'} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
          <InfoIcon className="h-3 w-3" />
          {view === 'volume' 
            ? 'Showing total orders per product. Filter by payment method or region.' 
            : 'Showing growth compared to previous period.'}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSplit;
