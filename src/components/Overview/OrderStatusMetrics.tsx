
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, Clock, TruckDelivery, RefreshCcw, Timer } from 'lucide-react';
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
  filterParam: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, icon, color, filterParam }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/orders?status=${filterParam}`);
  };
  
  return (
    <Card 
      className="border hover:shadow-md transition-all cursor-pointer"
      onClick={handleClick}
    >
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
    unbooked: 16,
    pickupPending: 24,
    inTransit: 58,
    outForDelivery: 12,
    rtoInTransit: 5,
    averageDeliveryTime: 4.2
  };
  
  const formattedDate = format(selectedDate, 'MMMM d, yyyy');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Order Status</h2>
        <p className="text-muted-foreground text-sm">Order status metrics for {formattedDate}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard 
          title="Unbooked" 
          count={orderStats.unbooked}
          icon={<Package className="h-5 w-5" />}
          color="bg-blue-100 text-blue-600"
          filterParam="unbooked"
        />
        
        <StatusCard 
          title="Pickup Pending" 
          count={orderStats.pickupPending}
          icon={<Clock className="h-5 w-5" />}
          color="bg-yellow-100 text-yellow-600"
          filterParam="pickup-pending"
        />
        
        <StatusCard 
          title="In Transit" 
          count={orderStats.inTransit}
          icon={<Truck className="h-5 w-5" />}
          color="bg-purple-100 text-purple-600"
          filterParam="in-transit"
        />
        
        <StatusCard 
          title="Out For Delivery" 
          count={orderStats.outForDelivery}
          icon={<TruckDelivery className="h-5 w-5" />}
          color="bg-green-100 text-green-600"
          filterParam="out-for-delivery"
        />
        
        <StatusCard 
          title="RTO In Transit" 
          count={orderStats.rtoInTransit}
          icon={<RefreshCcw className="h-5 w-5" />}
          color="bg-red-100 text-red-600"
          filterParam="rto-in-transit"
        />
        
        <StatusCard 
          title="Average Delivery Time" 
          count={orderStats.averageDeliveryTime}
          icon={<Timer className="h-5 w-5" />}
          color="bg-indigo-100 text-indigo-600"
          filterParam="average-delivery-time"
        />
      </div>
    </div>
  );
};

export default OrderStatusMetrics;
