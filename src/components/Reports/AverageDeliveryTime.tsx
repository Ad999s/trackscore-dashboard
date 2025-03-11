
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const AverageDeliveryTime = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{
    pincode: string | null;
    city: string | null;
    courier: string | null;
  }>({
    pincode: null,
    city: null,
    courier: null,
  });

  const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];
  const couriers = ['All Couriers', 'FedEx', 'DHL', 'BlueDart', 'DTDC', 'Delhivery'];
  const pincodes = ['All Pincodes', '400001', '110001', '560001', '500001', '600001'];
  
  const applyFilter = () => {
    setIsFilterOpen(false);
    // In a real application, this would trigger data fetching with the selected filters
    console.log('Applied filters:', filters);
  };

  const resetFilters = () => {
    setFilters({
      pincode: null,
      city: null,
      courier: null,
    });
  };

  const removeFilter = (filterKey: 'pincode' | 'city' | 'courier') => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: null
    }));
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Average Delivery Time</CardTitle>
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
              <h4 className="font-medium">Filter Delivery Time</h4>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select 
                  value={filters.city || 'All Cities'} 
                  onValueChange={(v) => setFilters(prev => ({ ...prev, city: v === 'All Cities' ? null : v }))}
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Select 
                  value={filters.pincode || 'All Pincodes'} 
                  onValueChange={(v) => setFilters(prev => ({ ...prev, pincode: v === 'All Pincodes' ? null : v }))}
                >
                  <SelectTrigger id="pincode">
                    <SelectValue placeholder="Select pincode" />
                  </SelectTrigger>
                  <SelectContent>
                    {pincodes.map(pincode => (
                      <SelectItem key={pincode} value={pincode}>{pincode}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="courier">Courier</Label>
                <Select 
                  value={filters.courier || 'All Couriers'} 
                  onValueChange={(v) => setFilters(prev => ({ ...prev, courier: v === 'All Couriers' ? null : v }))}
                >
                  <SelectTrigger id="courier">
                    <SelectValue placeholder="Select courier" />
                  </SelectTrigger>
                  <SelectContent>
                    {couriers.map(courier => (
                      <SelectItem key={courier} value={courier}>{courier}</SelectItem>
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
        <div className="text-3xl font-bold">7.5 days</div>
        
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.city && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                {filters.city}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('city')}
                />
              </Badge>
            )}
            {filters.pincode && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                {filters.pincode}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('pincode')}
                />
              </Badge>
            )}
            {filters.courier && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                {filters.courier}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('courier')}
                />
              </Badge>
            )}
          </div>
        )}
        
        <div className="text-xs text-muted-foreground mt-1">
          {hasActiveFilters 
            ? 'Showing filtered delivery time data'
            : 'Filter by pincode, city, courier'
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default AverageDeliveryTime;
