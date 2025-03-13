
import React from 'react';
import AlertBoard from '@/components/Alerts/AlertBoard';

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Alert Center</h1>
        <p className="text-muted-foreground">
          Manage and assign alerts about your orders, payments, and business operations.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border h-[calc(100vh-200px)]">
        <AlertBoard />
      </div>
    </div>
  );
};

export default Alerts;
