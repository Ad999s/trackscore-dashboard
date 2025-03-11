
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import OrdersTable from '@/components/Orders/OrdersTable';
import OrdersSummary from '@/components/Orders/OrdersSummary';
import OrdersFilters from '@/components/Orders/OrdersFilters';

const Orders = () => {
  const [threshold, setThreshold] = useState(75);
  const [appliedFilters, setAppliedFilters] = useState<{
    dateRange: { from: Date | undefined; to: Date | undefined };
    onlyBelowThreshold: boolean;
    onlyAboveThreshold: boolean;
    orderStatus: string[];
    verificationStatus: string[];
    tags: string[];
  }>({
    dateRange: { from: undefined, to: undefined },
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Orders</h1>
          <p className="text-slate-500 mt-1">
            View and manage all your orders with TrackScore quality ratings
          </p>
        </div>
        
        <button 
          onClick={toggleFilters}
          className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-soft hover:bg-slate-50 transition-colors duration-200"
        >
          <Filter className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-600">Filters</span>
        </button>
      </div>

      {showFilters && (
        <OrdersFilters 
          threshold={threshold}
          filters={appliedFilters}
          onFilterChange={setAppliedFilters}
        />
      )}
      
      <OrdersSummary threshold={threshold} />
      
      <div className="mt-6">
        <OrdersTable 
          threshold={threshold} 
          filters={appliedFilters}
        />
      </div>
    </div>
  );
};

export default Orders;
