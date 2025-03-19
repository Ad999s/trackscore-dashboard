
import React, { useState, useEffect } from 'react';
import { ChevronUp, TrendingUp, Package, BadgeDollarSign, AlertTriangle, ChevronDown } from 'lucide-react';
import MetricCard from '@/components/Dashboard/MetricCard';
import WarningAlert from '@/components/Dashboard/WarningAlert';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import CutOffQuality from '@/components/Dashboard/CutOffQuality';
import ProfitGraph from '@/components/Dashboard/ProfitGraph';
import BusinessImpactCard from '@/components/Dashboard/BusinessImpactCard';
import ComparisonTable from '@/components/Dashboard/ComparisonTable';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    const previousDeliveryRate = metrics.previousDeliveryRate;
    
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
  }, [threshold, metrics.previousDeliveryRate]);
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {showWarning && (
        <WarningAlert 
          message="Order volume is too low. Consider increasing threshold above 50%."
          className="mb-6"
          onClose={() => setShowWarning(false)}
        />
      )}
      
      <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-6">
        <div className="p-6 pb-0">
          <h2 className="text-xl font-semibold text-slate-900">Performance Overview</h2>
          <p className="text-slate-500 mb-4">Track your delivery rates and order quality</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
            />
            <MetricCard 
              title="Flagged" 
              value={metrics.flaggedOrders} 
              variant="warning"
              showInfoButton={true}
              infoText="Orders identified as risky by TrackScore AI"
            />
            <MetricCard 
              title="New Delivery %" 
              value={metrics.deliveryRate} 
              suffix="%"
              variant="success"
              icon={<TrendingUp className="h-5 w-5" />}
              change={metrics.deliveryRate - metrics.previousDeliveryRate}
              previousValue={metrics.previousDeliveryRate}
            />
          </div>
        </div>
        
        <div className="px-6">
          <Collapsible open={isPerformanceOpen} onOpenChange={setIsPerformanceOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-center w-full py-2 text-sm text-slate-600 hover:text-slate-900">
                {isPerformanceOpen ? (
                  <>
                    <span>Hide performance chart</span>
                    <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Show performance chart</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-6">
              <PerformanceChart />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    
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
      
      <div className="mb-6">
        <BusinessImpactCard flaggedOrders={metrics.flaggedOrders} />
      </div>
      
      <div className="mb-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Detailed P&L Sheet</h2>
          <ComparisonTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardV2;
