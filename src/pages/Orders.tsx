
import React, { useState } from 'react';
import { Filter, Calendar, Check, X } from 'lucide-react';
import OrdersTable from '@/components/Orders/OrdersTable';
import OrdersFilters from '@/components/Orders/OrdersFilters';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const Orders = () => {
  const { toast } = useToast();
  const [threshold, setThreshold] = useState(75);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<{
    dateRange: { from: Date | undefined; to: Date | undefined };
    datePreset: string;
    onlyBelowThreshold: boolean;
    onlyAboveThreshold: boolean;
    orderStatus: string[];
    verificationStatus: string[];
    tags: string[];
  }>({
    dateRange: { from: undefined, to: undefined },
    datePreset: 'today',
    onlyBelowThreshold: false,
    onlyAboveThreshold: false,
    orderStatus: [],
    verificationStatus: [],
    tags: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleDatePresetChange = (value: string) => {
    const today = new Date();
    let fromDate: Date | undefined;
    let toDate: Date | undefined = today;
    
    switch(value) {
      case 'today':
        fromDate = today;
        break;
      case 'yesterday':
        fromDate = new Date();
        fromDate.setDate(today.getDate() - 1);
        toDate = new Date(fromDate);
        break;
      case 'last7':
        fromDate = new Date();
        fromDate.setDate(today.getDate() - 7);
        break;
      case 'last30':
        fromDate = new Date();
        fromDate.setDate(today.getDate() - 30);
        break;
      case 'lifetime':
        fromDate = undefined;
        toDate = undefined;
        break;
      default:
        fromDate = undefined;
        toDate = undefined;
    }
    
    setAppliedFilters({
      ...appliedFilters,
      datePreset: value,
      dateRange: { from: fromDate, to: toDate }
    });
  };

  const handleCancelOrders = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No orders selected",
        description: "Please select orders to cancel",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: `${selectedOrders.length} orders cancelled`,
      description: "Selected orders have been cancelled successfully"
    });
    
    setSelectedOrders([]);
  };

  // Format dates for display
  const getDateRangeDisplay = () => {
    if (appliedFilters.datePreset === 'today') {
      return format(new Date(), "d MMMM, yyyy");
    } else if (appliedFilters.datePreset === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return format(yesterday, "d MMMM, yyyy");
    } else if (appliedFilters.datePreset === 'last7') {
      return "Last 7 days";
    } else if (appliedFilters.datePreset === 'last30') {
      return "Last 30 days";
    } else if (appliedFilters.datePreset === 'lifetime') {
      return "Lifetime";
    } else if (appliedFilters.dateRange.from && appliedFilters.dateRange.to) {
      return `${format(appliedFilters.dateRange.from, "d MMM, yyyy")} - ${format(appliedFilters.dateRange.to, "d MMM, yyyy")}`;
    } else if (appliedFilters.dateRange.from) {
      return `From ${format(appliedFilters.dateRange.from, "d MMM, yyyy")}`;
    } else if (appliedFilters.dateRange.to) {
      return `Until ${format(appliedFilters.dateRange.to, "d MMM, yyyy")}`;
    }
    return "";
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Order List</h1>
          <p className="text-slate-500 mt-1">
            View and manage all your orders with TrackScore quality ratings
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select 
            defaultValue="today"
            value={appliedFilters.datePreset}
            onValueChange={handleDatePresetChange}
          >
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="lifetime">Lifetime</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={toggleFilters}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Filter className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-600">Filters</span>
          </Button>
        </div>
      </div>

      {/* Date Range Display */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-center py-2 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
          {getDateRangeDisplay()}
        </h2>
      </div>

      {showFilters && (
        <OrdersFilters 
          threshold={threshold}
          filters={appliedFilters}
          onFilterChange={setAppliedFilters}
        />
      )}
      
      {selectedOrders.length > 0 && (
        <div className="mb-6 flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-center">
            <Check className="text-green-500 w-5 h-5 mr-2" />
            <span className="font-medium">{selectedOrders.length} orders selected</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedOrders([])}
            >
              Clear selection
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleCancelOrders}
            >
              <X className="mr-1 w-4 h-4" /> Cancel orders
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <OrdersTable 
          threshold={threshold} 
          filters={appliedFilters}
          selectedOrders={selectedOrders}
          onSelectOrders={setSelectedOrders}
        />
      </div>
    </div>
  );
};

export default Orders;
