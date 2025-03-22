
import React from 'react';
import { AlertTriangle, Clock, Truck, TrendingUp, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface AnomalyAlertProps {
  onClick: () => void;
}

const AnomalyAlert: React.FC<AnomalyAlertProps> = ({ onClick }) => {
  // Mock data - would be replaced with real data from an API
  const anomalies = {
    pickupPending: 8,
    longInTransit: 10,
    total: 18,
    averageDeliveryDays: 5
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Anomaly Detection</h2>
        <p className="text-muted-foreground text-sm">Order anomalies that require your attention</p>
      </div>
      
      <Card className="border cursor-pointer hover:shadow-md transition-all bg-orange-50" onClick={onClick}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {anomalies.total} Anomalies Detected
                </h3>
                <p className="text-sm text-slate-600">Orders requiring immediate attention</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-orange-600 border-orange-200">
              <span>View All</span>
              <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert className="bg-orange-100 border-orange-200 text-orange-800">
              <Clock className="h-4 w-4" />
              <AlertTitle>Pickup Pending Too Long</AlertTitle>
              <AlertDescription>
                {anomalies.pickupPending} orders have been pending pickup for more than 24 hours
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-orange-100 border-orange-200 text-orange-800">
              <Truck className="h-4 w-4" />
              <AlertTitle>Extended Transit Time</AlertTitle>
              <AlertDescription>
                {anomalies.longInTransit} orders in transit for more than {anomalies.averageDeliveryDays} days (avg. delivery time)
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Impact on Business</h3>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-red-500" />
            <span className="text-slate-700">Estimated additional RTO risk: +12%</span>
          </div>
          <p className="text-sm text-slate-600">
            Orders with anomalies have a higher risk of returns. Addressing these issues promptly can help reduce potential losses and improve customer satisfaction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnomalyAlert;
