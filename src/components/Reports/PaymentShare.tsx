
import React, { useState } from 'react';
import { Filter, PieChart as PieChartIcon, BarChartIcon, InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Sector } from 'recharts';

const initialData = [
  { name: 'COD', value: 60, color: '#8884d8' },
  { name: 'Prepaid', value: 40, color: '#82ca9d' },
];

// Extended data with payment methods breakdown
const extendedData = [
  { name: 'COD', value: 60, color: '#8884d8' },
  { name: 'Credit Card', value: 15, color: '#82ca9d' },
  { name: 'Debit Card', value: 10, color: '#ffc658' },
  { name: 'UPI', value: 10, color: '#ff8042' },
  { name: 'Net Banking', value: 5, color: '#0088fe' },
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <text x={cx} y={cy - 15} dy={8} textAnchor="middle" fill="#333" fontSize={16}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill="#999" fontSize={14}>
        {`${value} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const PaymentShare = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [dataLevel, setDataLevel] = useState<'basic' | 'detailed'>('basic');
  const [data, setData] = useState(initialData);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const handleDataLevelChange = (level: 'basic' | 'detailed') => {
    setDataLevel(level);
    setData(level === 'basic' ? initialData : extendedData);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
        <div className="flex items-center gap-2">
          <Select 
            defaultValue="basic" 
            onValueChange={(value) => handleDataLevelChange(value as 'basic' | 'detailed')}
          >
            <SelectTrigger className="h-8 w-[110px]">
              <SelectValue placeholder="Detail" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PieChartIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} orders`, 'Volume']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name} ({entry.value})</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
          <InfoIcon className="h-3 w-3" />
          {dataLevel === 'basic' 
            ? 'Showing COD vs Prepaid breakdown. Hover for details.' 
            : 'Showing detailed payment methods. Hover for details.'}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentShare;
