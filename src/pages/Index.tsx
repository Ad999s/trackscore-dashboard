
import React, { useState, useEffect } from 'react';
import { ChevronUp, TrendingUp, Package, BadgeDollarSign, AlertTriangle, ChevronDown, Calendar } from 'lucide-react';
import MetricCard from '@/components/Dashboard/MetricCard';
import WarningAlert from '@/components/Dashboard/WarningAlert';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import CutOffQuality from '@/components/Dashboard/CutOffQuality';
import ProfitGraph from '@/components/Dashboard/ProfitGraph';
import BusinessImpactCard from '@/components/Dashboard/BusinessImpactCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { format } from "date-fns";

const Index = () => {
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
  
  // Calculate monthly savings
  const [monthlySavings, setMonthlySavings] = useState(0);
  
  useEffect(() => {
    // Calculate accumulated savings since first of the month
    const today = new Date();
    const daysInMonth = today.getDate();
    
    // Get daily savings from BusinessImpactCard
    const dailySavings = 27000; // This value should match the total savings in BusinessImpactCard
    
    // Calculate total savings for current month (daily savings × days passed)
    const calculatedMonthlySavings = dailySavings * daysInMonth;
    setMonthlySavings(calculatedMonthlySavings);
  }, []);
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
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
      {/* Header Section - Updated headline and subheadline */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Instantly scale your business, without new orders</h1>
          <p className="text-slate-500 mt-1">
            We help you make more profit from the same number of orders
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Running Monthly Savings */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center bg-gradient-to-r from-slate-50 to-white rounded-lg px-4 py-3 border border-slate-200 shadow-soft cursor-pointer transition-all hover:shadow-md">
                <span className="text-sm font-medium text-slate-600 mr-2">Running monthly savings:</span>
                <span className="text-base font-bold text-blue-600">{formatCurrency(monthlySavings)}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Monthly Savings Breakdown</h4>
                <p className="text-xs text-slate-500">
                  Total accumulated savings from {format(new Date(new Date().setDate(1)), "MMMM d, yyyy")} to today.
                </p>
                <div className="pt-2">
                  <div className="flex justify-between text-xs">
                    <span>Daily savings:</span>
                    <span className="font-medium">₹27,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Days in current month:</span>
                    <span className="font-medium">{new Date().getDate()} days</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t mt-2">
                    <span>Total savings:</span>
                    <span className="text-blue-600">{formatCurrency(monthlySavings)}</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-soft">
            <Calendar className="h-4 w-4 text-slate-500 mr-2" />
            <span className="text-sm font-medium text-slate-600">30</span>
            <span className="text-sm text-slate-500 ml-1">days</span>
          </div>
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
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
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
        />
      </div>
      
      {/* Business Impact section - moved up */}
      <div className="mb-6">
        <BusinessImpactCard />
      </div>
      
      {/* Collapsible Detailed PnL Breakdown - renamed and moved down */}
      <div className="mb-6">
        <Collapsible 
          open={isPerformanceOpen} 
          onOpenChange={setIsPerformanceOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="flex w-full justify-between items-center p-4 bg-slate-50 rounded-t-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-trackscore-text">Detailed PnL Sheet</h2>
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
    </div>
  );
};

export default Index;
