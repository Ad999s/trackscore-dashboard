
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon,
  Filter,
  Download,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import AverageDeliveryTime from '@/components/Reports/AverageDeliveryTime';
import OrderShare from '@/components/Reports/OrderShare';
import PaymentShare from '@/components/Reports/PaymentShare';
import ProductSplit from '@/components/Reports/ProductSplit';
import CustomerMetrics from '@/components/Reports/CustomerMetrics';
import DeliveryMetrics from '@/components/Reports/DeliveryMetrics';
import TimeframeFilter from '@/components/Reports/TimeframeFilter';
import AdvancedFilters from '@/components/Reports/AdvancedFilters';

const Reports = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Reports</h1>
          <p className="text-slate-500 mt-1">
            Analyze your business performance with detailed metrics and insights
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <TimeframeFilter value={timeframe} onValueChange={setTimeframe} />
          
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
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
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metrics</SelectItem>
                  <SelectItem value="orders">Order Volume</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="delivery">Delivery Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              {/* This div will be filled with the PerformanceOverview component */}
              <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center text-slate-500">
                Complex performance graph will appear here
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AverageDeliveryTime />
        <OrderShare />
        <PaymentShare />
        <ProductSplit />
        <CustomerMetrics />
        <DeliveryMetrics />
      </div>
    </div>
  );
};

export default Reports;
