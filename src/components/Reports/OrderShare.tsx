
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const initialData = [
  { name: 'Tier 1', value: 35 },
  { name: 'Tier 2', value: 40 },
  { name: 'Tier 3', value: 25 },
];

const filteredData = {
  'North': [
    { name: 'Tier 1', value: 45 },
    { name: 'Tier 2', value: 35 },
    { name: 'Tier 3', value: 20 },
  ],
  'South': [
    { name: 'Tier 1', value: 25 },
    { name: 'Tier 2', value: 45 },
    { name: 'Tier 3', value: 30 },
  ],
  'East': [
    { name: 'Tier 1', value: 30 },
    { name: 'Tier 2', value: 40 },
    { name: 'Tier 3', value: 30 },
  ],
  'West': [
    { name: 'Tier 1', value: 40 },
    { name: 'Tier 2', value: 35 },
    { name: 'Tier 3', value: 25 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const OrderShare = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState<{
    region: string | null;
    paymentMethod: string | null;
  }>({
    region: null,
    paymentMethod: null,
  });

  const regions = ['All Regions', 'North', 'South', 'East', 'West'];
  const paymentMethods = ['All Methods', 'COD', 'Prepaid', 'UPI', 'Card'];
  
  const applyFilter = () => {
    setIsFilterOpen(false);
    
    // In a real application, this would fetch data based on the filters
    if (filters.region && filters.region !== 'All Regions') {
      setData(filteredData[filters.region as keyof typeof filteredData]);
    } else {
      setData(initialData);
    }
    
    console.log('Applied filters:', filters);
  };

  const resetFilters = () => {
    setFilters({
      region: null,
      paymentMethod: null,
    });
    setData(initialData);
  };

  const removeFilter = (filterKey: 'region' | 'paymentMethod') => {
    setFilters(prev => ({ ...prev, [filterKey]: null }));
    
    if (filterKey === 'region') {
      setData(initialData);
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Order Share</CardTitle>
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 ${hasActiveFilters ? 'bg-blue-100 text-blue-600' : ''}`}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Filter Order Share</h4>
              
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select 
                  value={filters.region || 'All Regions'} 
                  onValueChange={(v) => setFilters(prev => ({ ...prev, region: v === 'All Regions' ? null : v }))}
                >
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select 
                  value={filters.paymentMethod || 'All Methods'} 
                  onValueChange={(v) => setFilters(prev => ({ ...prev, paymentMethod: v === 'All Methods' ? null : v }))}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(method => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
                <Button size="sm" onClick={applyFilter}>
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.region && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                {filters.region}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('region')}
                />
              </Badge>
            )}
            {filters.paymentMethod && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                {filters.paymentMethod}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('paymentMethod')}
                />
              </Badge>
            )}
          </div>
        )}
        
        <div className="text-xs text-muted-foreground mt-1">
          {hasActiveFilters 
            ? 'Showing filtered order share data'
            : 'Filter by pincode, city, tier'
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderShare;
