
import React, { useState, useEffect } from 'react';
import { ChevronUp, TrendingUp, Package, BadgeDollarSign, AlertTriangle, ChevronDown } from 'lucide-react';
import MetricCard from '@/components/Dashboard/MetricCard';
import WarningAlert from '@/components/Dashboard/WarningAlert';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import CutOffQuality from '@/components/Dashboard/CutOffQuality';
import ProfitGraph from '@/components/Dashboard/ProfitGraph';
import BusinessImpactCard from '@/components/Dashboard/BusinessImpactCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const DashboardV2 = () => {
  const [threshold, setThreshold] = useState(75);
  const [showWarning, setShowWarning] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(true);
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
    
    // Updated logic:
    // At max threshold (100), ordersToShip equals totalOrders, deliveryRate equals previousDeliveryRate
    // At min threshold (0), ordersToShip equals 1, deliveryRate equals 100%
    const previousDeliveryRate = 56;
    
    let ordersToShip = 1;
    let deliveryRate = 100;
    
    if (threshold > 0) {
      // Linear scaling of orders to ship based on threshold
      ordersToShip = Math.max(1, Math.round((threshold / 100) * totalOrders));
      
      // For delivery rate, we invert the relationship with threshold
      // Lower threshold = higher delivery rate
      deliveryRate = Math.round(previousDeliveryRate + ((100 - threshold) / 100) * (100 - previousDeliveryRate));
    }
    
    const flaggedOrders = totalOrders - ordersToShip;
    
    // Show warning when threshold is less than 50%
    setShowWarning(threshold < 50);
    
    setMetrics({
      totalOrders,
      flaggedOrders,
      ordersToShip,
      deliveryRate,
      previousDeliveryRate
    });
  }, [threshold]);
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Order Optimization Dashboard 2.0</h1>
          <p className="text-slate-500 mt-1">
            Optimize your order selection to maximize profits and reduce RTOs
          </p>
        </div>
        
        <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-soft">
          <span className="text-sm font-medium text-slate-600">30</span>
          <span className="text-sm text-slate-500 ml-1">days</span>
        </div>
      </div>
      
      {showWarning && (
        <WarningAlert 
          message="Order volume is too less. Consider increasing threshold above 50%."
          className="mb-6"
          onClose={() => setShowWarning(false)}
        />
      )}
      
      {/* Cut-Off Quality and Profit Graph components with adjusted grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <CutOffQuality 
            initialValue={threshold} 
            onValueChange={setThreshold} 
          />
        </div>
        <div className="md:col-span-3">
          <ProfitGraph 
            threshold={threshold} 
            onAutoThresholdChange={setThreshold} 
          />
        </div>
      </div>
      
      {/* Metric Cards - Ordered as requested */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        <MetricCard 
          title="Total Orders" 
          value={metrics.totalOrders} 
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
          title="Flagged" 
          value={metrics.flaggedOrders} 
          variant="warning"
          showInfoButton={true}
          infoText="Orders identified as risky by TrackScore AI"
          onClick={() => console.log("Show flagged orders info")}
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
      
      {/* Collapsible Detailed PnL Breakdown */}
      <div className="mb-6">
        <Collapsible 
          open={isPerformanceOpen} 
          onOpenChange={setIsPerformanceOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="flex w-full justify-between items-center p-4 bg-slate-50 rounded-t-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-trackscore-text">Detailed PnL Breakdown</h2>
            {isPerformanceOpen ? 
              <ChevronUp className="h-5 w-5 text-slate-500" /> : 
              <ChevronDown className="h-5 w-5 text-slate-500" />
            }
          </CollapsibleTrigger>
          <CollapsibleContent className="border border-t-0 border-slate-200 rounded-b-lg">
            <PerformanceChart className="w-full" />
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* Business Impact moved to bottom */}
      <div className="mb-6">
        <BusinessImpactCard />
      </div>
    </div>
  );
};

export default DashboardV2;
