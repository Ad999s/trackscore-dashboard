
import React, { useState } from 'react';
import { Filter, Calendar, Check, X } from 'lucide-react';
import OrdersTable from '@/components/Orders/OrdersTable';
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
    tierCity: string[];
    deliveryTime: string[];
    verificationStatus: string[];
    tags: string[];
    scoreRange: [number, number];
    searchQuery: string;
  }>({
    dateRange: { from: undefined, to: undefined },
    datePreset: 'today',
    onlyBelowThreshold: false,
    onlyAboveThreshold: false,
    orderStatus: [],
    tierCity: [],
    deliveryTime: [],
    verificationStatus: [],
    tags: [],
    scoreRange: [0, 100],
    searchQuery: '',
  });

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

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Order Management</h1>
          <p className="text-slate-500 mt-1">
            View, filter, and manage all your orders with TrackScore quality ratings
          </p>
        </div>
      </div>
      
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
