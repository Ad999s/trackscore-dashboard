
import React from 'react';
import { Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AverageDeliveryTime = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Average Delivery Time</CardTitle>
        <Filter className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">7.5 days</div>
        <div className="text-xs text-muted-foreground mt-1">
          Filter by pincode, city, courier
        </div>
      </CardContent>
    </Card>
  );
};

export default AverageDeliveryTime;
