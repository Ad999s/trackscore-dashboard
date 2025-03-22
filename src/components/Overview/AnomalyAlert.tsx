
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, Truck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface AlertCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  filterParam: string;
}

const AlertCard: React.FC<AlertCardProps> = ({ title, count, icon, color, filterParam }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/orders?issue=${filterParam}`);
  };
  
  return (
    <Card 
      className={`border hover:shadow-md transition-all cursor-pointer ${color}`}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold mt-1">{count}</p>
          </div>
          <div className="p-3 rounded-full bg-white/50">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AnomalyAlert: React.FC = () => {
  // Mock data - would be replaced with real data from an API
  const anomalies = {
    delayedParcels: 10,
    delayedPickups: 8,
    ndrs: 5
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Alerts</h2>
        <p className="text-muted-foreground text-sm">Orders requiring attention</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AlertCard 
          title="Delayed Parcels" 
          count={anomalies.delayedParcels}
          icon={<Truck className="h-5 w-5 text-orange-700" />}
          color="bg-orange-100"
          filterParam="delayed-parcels"
        />
        
        <AlertCard 
          title="Delayed Pickups" 
          count={anomalies.delayedPickups}
          icon={<Clock className="h-5 w-5 text-yellow-700" />}
          color="bg-yellow-100"
          filterParam="delayed-pickups"
        />
        
        <AlertCard 
          title="NDRs" 
          count={anomalies.ndrs}
          icon={<AlertTriangle className="h-5 w-5 text-red-700" />}
          color="bg-red-100"
          filterParam="ndrs"
        />
      </div>
    </div>
  );
};

export default AnomalyAlert;
