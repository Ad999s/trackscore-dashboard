
import React, { useState, useEffect } from 'react';
import QualityScoreGauge from '@/components/Dashboard/QualityScoreGauge';
import ProfitGraph from '@/components/Dashboard/ProfitGraph';
import MetricCard from '@/components/Dashboard/MetricCard';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import WarningAlert from '@/components/Dashboard/WarningAlert';
import ComparisonTable from '@/components/Dashboard/ComparisonTable';
import { Clock } from 'lucide-react';

const Index = () => {
  const [threshold, setThreshold] = useState(75);
  const [showWarning, setShowWarning] = useState(true);
  const [metrics, setMetrics] = useState({
    totalOrders: 156,
    flaggedOrders: 36,
    ordersToShip: 120,
    deliveryRate: 78,
    previousDeliveryRate: 56
  });
  
  // Update metrics when threshold changes
  useEffect(() => {
    // Simple logic to simulate how threshold affects metrics
    const totalOrders = 156;
    const flaggedPercent = 100 - threshold;
    const flaggedOrders = Math.round((flaggedPercent / 100) * totalOrders);
    const ordersToShip = totalOrders - flaggedOrders;
    // Higher threshold = higher delivery rate up to a cap
    const deliveryRate = Math.min(95, Math.round(55 + (threshold / 100) * 35));
    const previousDeliveryRate = 56; // Fixed previous delivery rate
    
    setMetrics({
      totalOrders,
      flaggedOrders,
      ordersToShip,
      deliveryRate,
      previousDeliveryRate
    });
  }, [threshold]);
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Order Optimization Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Optimize your order selection to maximize profits and reduce RTOs
          </p>
        </div>
        
        <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-soft">
          <Clock className="w-4 h-4 text-slate-400 mr-2" />
          <span className="text-sm font-medium text-slate-600">30</span>
          <span className="text-sm text-slate-500 ml-1">days</span>
        </div>
      </div>
      
      {showWarning && (
        <WarningAlert 
          message="Bad orders reach 23% of total orders. Consider increasing threshold."
          className="mb-6"
          onClose={() => setShowWarning(false)}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <QualityScoreGauge 
            initialScore={threshold} 
            optimizedScore={85}
            onScoreChange={setThreshold} 
          />
        </div>
        <div className="md:col-span-3">
          <ProfitGraph 
            threshold={threshold} 
            onAutoThresholdChange={(autoThreshold) => {
              // This would update the threshold if in auto mode
              // For demo purposes, we'll just log it
              console.log(`Auto threshold calculated: ${autoThreshold}%`);
            }} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        <MetricCard 
          title="Total Orders" 
          value={metrics.totalOrders} 
        />
        <MetricCard 
          title="Flagged" 
          value={metrics.flaggedOrders} 
          variant="warning"
          showInfoButton={true}
          infoText="Orders identified as risky by TrackScore AI"
          onClick={() => console.log("Show flagged orders info")}
        />
        <MetricCard 
          title="Orders to Ship" 
          value={metrics.ordersToShip}
          variant="highlight" 
          showInfoButton={true}
          infoText="Orders that passed quality threshold and will be shipped"
          onClick={() => console.log("Show orders to ship info")}
        />
        <MetricCard 
          title="TrackScore Delivery %" 
          value={metrics.deliveryRate} 
          suffix="%"
          variant="success"
        />
        <MetricCard 
          title="Previous Delivery %" 
          value={metrics.previousDeliveryRate} 
          suffix="%"
          variant="default"
          showInfoButton={true}
          infoText="Delivery rate before using TrackScore AI"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ComparisonTable />
        <PerformanceChart />
      </div>
    </div>
  );
};

export default Index;
