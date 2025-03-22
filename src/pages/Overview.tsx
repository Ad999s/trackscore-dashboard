
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStatusMetrics from '@/components/Overview/OrderStatusMetrics';
import RemittanceCheck from '@/components/Overview/RemittanceCheck';
import AnomalyAlert from '@/components/Overview/AnomalyAlert';
import DateFilter from '@/components/Overview/DateFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  
  const handleAnomalyClick = () => {
    navigate('/orders?filter=anomalies');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-trackscore-text">Overview</h1>
        <p className="text-slate-500 mt-1">One look, full control.</p>
      </div>
      
      <Tabs defaultValue="status" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="status">Order Status</TabsTrigger>
          <TabsTrigger value="remittance">Remittance</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <div className="flex justify-end mb-4">
          <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>
        
        <TabsContent value="status" className="space-y-6">
          <OrderStatusMetrics selectedDate={selectedDate} />
        </TabsContent>
        
        <TabsContent value="remittance" className="space-y-6">
          <RemittanceCheck />
        </TabsContent>
        
        <TabsContent value="anomalies" className="space-y-6">
          <AnomalyAlert onClick={handleAnomalyClick} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Overview;
