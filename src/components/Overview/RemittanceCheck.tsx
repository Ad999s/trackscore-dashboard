
import React from 'react';
import { CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { format, addDays } from 'date-fns';

const RemittanceCheck: React.FC = () => {
  const today = new Date();
  
  // Mock data - would be replaced with real data from an API
  const lastRemittance = {
    plannedDate: new Date(2023, 5, 9), // June 9, 2023
    received: true,
    amount: 24500,
  };
  
  const nextRemittance = {
    plannedDate: addDays(today, 2),
    estimatedAmount: 18750,
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Remittance Status</h2>
        <p className="text-muted-foreground text-sm">Track your COD remittance status</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Last Remittance Received?</h3>
                {lastRemittance.received ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>Planned: {format(lastRemittance.plannedDate, 'MMM d, yyyy')}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Amount:</span>
                <span className="text-lg font-bold">₹{lastRemittance.amount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Next Remittance</h3>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>Planned: {format(nextRemittance.plannedDate, 'MMM d, yyyy')}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Estimated Amount:</span>
                <span className="text-lg font-bold">₹{nextRemittance.estimatedAmount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RemittanceCheck;
