
import React from 'react';
import { 
  Calendar as CalendarIcon,
  Filter
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AverageDeliveryTime from '@/components/Reports/AverageDeliveryTime';
import OrderShare from '@/components/Reports/OrderShare';
import PaymentShare from '@/components/Reports/PaymentShare';
import ProductSplit from '@/components/Reports/ProductSplit';
import CustomerMetrics from '@/components/Reports/CustomerMetrics';
import DeliveryMetrics from '@/components/Reports/DeliveryMetrics';

const Reports = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-trackscore-text">Reports</h1>
        <p className="text-slate-500 mt-1">
          Analyze your business performance with detailed metrics and insights
        </p>
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
