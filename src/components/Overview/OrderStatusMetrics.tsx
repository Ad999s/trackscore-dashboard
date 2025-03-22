
import React from 'react';
import { Package, Truck, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';

interface OrderStatusMetricsProps {
  selectedDate: Date;
}

interface StatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, icon, color }) => {
  return (
    <Card className="border hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold mt-1">{count}</p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const OrderStatusMetrics: React.FC<OrderStatusMetricsProps> = ({ selectedDate }) => {
  // Mock data - would be replaced with real data from an API
  const orderStats = {
    pickupPending: 24,
    unbooked: 16,
    inTransit: 58,
    delivered: 143,
    returned: 7
  };
  
  const formattedDate = format(selectedDate, 'MMMM d, yyyy');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Order Status: {formattedDate}</h2>
        <p className="text-muted-foreground text-sm">Showing order status metrics for the selected date</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatusCard 
          title="Pickup Pending" 
          count={orderStats.pickupPending}
          icon={<Clock className="h-5 w-5" />}
          color="bg-yellow-100 text-yellow-600"
        />
        
        <StatusCard 
          title="Unbooked" 
          count={orderStats.unbooked}
          icon={<Package className="h-5 w-5" />}
          color="bg-blue-100 text-blue-600"
        />
        
        <StatusCard 
          title="In Transit" 
          count={orderStats.inTransit}
          icon={<Truck className="h-5 w-5" />}
          color="bg-purple-100 text-purple-600"
        />
        
        <StatusCard 
          title="Delivered" 
          count={orderStats.delivered}
          icon={<CheckCircle className="h-5 w-5" />}
          color="bg-green-100 text-green-600"
        />
        
        <StatusCard 
          title="Returned" 
          count={orderStats.returned}
          icon={<AlertTriangle className="h-5 w-5" />}
          color="bg-red-100 text-red-600"
        />
      </div>
    </div>
  );
};

export default OrderStatusMetrics;
