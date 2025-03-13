
import React from 'react';
import AlertList from '@/components/Alerts/AlertList';

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Alert Center</h1>
        <p className="text-muted-foreground">
          Monitor important notifications about your orders, payments, and business operations.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border">
        <AlertList />
      </div>
    </div>
  );
};

export default Alerts;
