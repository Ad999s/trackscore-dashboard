
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AverageDeliveryTime from '@/components/Reports/AverageDeliveryTime';
import OrderShare from '@/components/Reports/OrderShare';
import PaymentShare from '@/components/Reports/PaymentShare';
import ProductSplit from '@/components/Reports/ProductSplit';
import CustomerMetrics from '@/components/Reports/CustomerMetrics';
import DeliveryMetrics from '@/components/Reports/DeliveryMetrics';
import TimeframeFilter from '@/components/Reports/TimeframeFilter';
import AdvancedFilters from '@/components/Reports/AdvancedFilters';
import SuggestionTab from '@/components/Reports/SuggestionTab';
import PerformanceOverview from '@/components/Reports/PerformanceOverview';

const Reports = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Business Reports</h1>
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
      
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="dashboard" className="flex items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>AI Suggestions</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <div className="mb-8">
            <PerformanceOverview />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AverageDeliveryTime />
            <OrderShare />
            <PaymentShare />
            <ProductSplit />
            <CustomerMetrics />
            <DeliveryMetrics />
          </div>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <SuggestionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
