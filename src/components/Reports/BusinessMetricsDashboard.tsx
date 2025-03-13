
import React from 'react';
import { 
  Truck, 
  CreditCard, 
  Clock, 
  Calendar, 
  IndianRupee, 
  RotateCcw, 
  MessageCircle, 
  AlertTriangle,
  PackageX
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

interface BusinessMetricsDashboardProps {
  onMetricCardClick: (type: string) => void;
}

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  color = "bg-blue-100 text-blue-600",
  onClick
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  color?: string;
  onClick?: () => void;
}) => {
  return (
    <Card 
      className={`border hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BusinessMetricsDashboard: React.FC<BusinessMetricsDashboardProps> = ({ onMetricCardClick }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Business Overview</h2>
        <p className="text-muted-foreground text-sm">Key metrics for your business operations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard 
          title="COD Orders in Transit" 
          value="42" 
          icon={<Truck className="h-5 w-5" />} 
          color="bg-blue-100 text-blue-600" 
        />
        
        <MetricCard 
          title="Prepaid Orders in Transit" 
          value="28" 
          icon={<CreditCard className="h-5 w-5" />} 
          color="bg-purple-100 text-purple-600" 
        />
        
        <MetricCard 
          title="Est. Time to Deliver All" 
          value="3 days" 
          icon={<Clock className="h-5 w-5" />} 
          color="bg-green-100 text-green-600" 
        />
        
        <MetricCard 
          title="Next COD Remittance" 
          value="Jun 12, ₹14,500" 
          icon={<Calendar className="h-5 w-5" />} 
          color="bg-yellow-100 text-yellow-600" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard 
          title="Prepaid Remittance" 
          value="Jun 15, ₹22,750" 
          icon={<IndianRupee className="h-5 w-5" />} 
          color="bg-indigo-100 text-indigo-600" 
        />
        
        <MetricCard 
          title="Refund Requests" 
          value="8" 
          icon={<RotateCcw className="h-5 w-5" />} 
          color="bg-orange-100 text-orange-600" 
          onClick={() => onMetricCardClick('refund')}
        />
        
        <MetricCard 
          title="Complaints Raised" 
          value="12" 
          icon={<MessageCircle className="h-5 w-5" />} 
          color="bg-red-100 text-red-600" 
          onClick={() => onMetricCardClick('complaint')}
        />
        
        <MetricCard 
          title="Total Cancellations" 
          value="16" 
          icon={<AlertTriangle className="h-5 w-5" />} 
          color="bg-slate-100 text-slate-600" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard 
          title="Estimated RTO" 
          value="7" 
          icon={<PackageX className="h-5 w-5" />} 
          color="bg-rose-100 text-rose-600" 
        />
        
        <MetricCard 
          title="Return Requests" 
          value="14" 
          icon={<RotateCcw className="h-5 w-5" />} 
          color="bg-teal-100 text-teal-600" 
          onClick={() => onMetricCardClick('return')}
        />
        
        <MetricCard 
          title="Average Delivery Time" 
          value="2.4 days" 
          icon={<Truck className="h-5 w-5" />} 
          color="bg-emerald-100 text-emerald-600" 
        />
        
        <MetricCard 
          title="Delivery Exceptions" 
          value="3" 
          icon={<AlertTriangle className="h-5 w-5" />} 
          color="bg-amber-100 text-amber-600" 
        />
      </div>
    </div>
  );
};

export default BusinessMetricsDashboard;
