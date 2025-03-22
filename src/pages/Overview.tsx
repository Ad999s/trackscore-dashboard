
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStatusMetrics from '@/components/Overview/OrderStatusMetrics';
import RemittanceCheck from '@/components/Overview/RemittanceCheck';
import AnomalyAlert from '@/components/Overview/AnomalyAlert';

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-trackscore-text">One look, Full control</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <OrderStatusMetrics selectedDate={selectedDate} />
        <RemittanceCheck />
        <AnomalyAlert />
      </div>
    </div>
  );
};

export default Overview;
