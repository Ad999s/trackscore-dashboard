
import React, { useState, useEffect } from 'react';
import { ChevronUp, TrendingUp, Package, BadgeDollarSign, AlertTriangle, ChevronDown, Calendar } from 'lucide-react';
import MetricCard from '@/components/Dashboard/MetricCard';
import WarningAlert from '@/components/Dashboard/WarningAlert';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import CutOffQuality from '@/components/Dashboard/CutOffQuality';
import ProfitGraph from '@/components/Dashboard/ProfitGraph';
import BusinessImpactCard from '@/components/Dashboard/BusinessImpactCard';
import BusinessComparisonTable from '@/components/Setup/BusinessComparisonTable';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { format } from "date-fns";
import PnlBreakdown from '@/components/Dashboard/PnlBreakdown';

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
  
  // Comparison table metrics state
  const [comparisonMetrics, setComparisonMetrics] = useState([]);
  
  // State for PnL breakdown visibility
  const [showPnlBreakdown, setShowPnlBreakdown] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('shippingAll');
  
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
    
    // Update comparison table metrics based on threshold
    updateComparisonMetrics(threshold, ordersToShip, flaggedOrders, totalOrders);
  }, [threshold]);
  
  // Function to update comparison metrics based on threshold
  const updateComparisonMetrics = (threshold, ordersToShip, flaggedOrders, totalOrders) => {
    // Calculate values based on threshold
    // The more selective we are (lower threshold), the fewer orders we ship but with higher profit per order
    
    // Base values (at threshold 75%)
    const baseProfit = 75000;
    const basePercentage = 25;
    const baseUpfrontCost = 70000;
    const baseCapitalEfficiency = 1.07;
    const baseRtoRate = 12;
    
    // Constants for cost calculations
    const forwardShippingCost = 80; // per inventory
    const reverseShippingCost = 60; // per inventory
    const packagingCost = 30; // per inventory
    
    // Calculate TrackScore values based on current threshold
    const trackscoreOrders = ordersToShip;
    const trackscoreProfit = Math.round(baseProfit * (1 - (threshold - 75) * 0.003));
    const trackscorePercentage = Math.round(basePercentage * (1 - (threshold - 75) * 0.004));
    const trackscoreUpfrontCost = Math.round(baseUpfrontCost * (1 + (threshold - 75) * 0.005));
    const trackscoreCapitalEfficiency = parseFloat((baseCapitalEfficiency * (1 - (threshold - 75) * 0.003)).toFixed(2));
    const trackscoreRtoRate = Math.round(baseRtoRate * (1 + (threshold - 75) * 0.01));
    
    // Ship All values (current business)
    const shipAllOrders = totalOrders;
    const shipAllProfit = 50000;
    const shipAllPercentage = 15;
    const shipAllUpfrontCost = 100000;
    const shipAllCapitalEfficiency = 0.5;
    const shipAllRtoRate = 25;
    
    // Scale Business values - Increased volume to make it greater than Ship All
    // Using the profit as the basis for calculation to ensure it matches TrackScore profit
    const profitRatio = trackscoreProfit / shipAllProfit;
    const scaleBusinessOrders = Math.ceil(shipAllOrders * 1.5); // 50% more volume than Ship All
    const scaleBusinessProfit = trackscoreProfit; // Match TrackScore profit
    const scaleBusinessPercentage = shipAllPercentage; // Same percentage as Ship All
    const scaleBusinessUpfrontCost = Math.round(shipAllUpfrontCost * 1.5); // 50% more upfront cost due to scale
    const scaleBusinessCapitalEfficiency = shipAllCapitalEfficiency; // Same efficiency as Ship All
    const scaleBusinessRtoRate = shipAllRtoRate; // Same RTO rate as Ship All
    
    // Create the updated metrics array
    const updatedMetrics = [
      {
        metric: 'Number of Orders/Day',
        description: 'Daily order processing volume',
        shippingAll: { value: shipAllOrders.toString(), trend: 'neutral', highlight: false },
        scalingBusiness: { value: scaleBusinessOrders.toString(), trend: 'up', highlight: false },
        shippingLess: { value: trackscoreOrders.toString(), trend: 'down', highlight: true }
      },
      {
        metric: 'Net Profit',
        description: 'Total profit after all costs',
        shippingAll: { value: `₹${shipAllProfit.toLocaleString('en-IN')}`, trend: 'neutral', highlight: false },
        scalingBusiness: { value: `₹${scaleBusinessProfit.toLocaleString('en-IN')}`, trend: 'up', highlight: false },
        shippingLess: { value: `₹${trackscoreProfit.toLocaleString('en-IN')}`, trend: 'up', highlight: true }
      },
      {
        metric: 'Net Profit %',
        description: 'Percentage of revenue as profit',
        shippingAll: { value: `${shipAllPercentage}%`, trend: 'neutral', highlight: false },
        scalingBusiness: { value: `${scaleBusinessPercentage}%`, trend: 'neutral', highlight: false },
        shippingLess: { value: `${trackscorePercentage}%`, trend: 'up', highlight: true }
      },
      {
        metric: 'Upfront Cost',
        description: 'Initial capital investment required',
        shippingAll: { value: `₹${shipAllUpfrontCost.toLocaleString('en-IN')}`, trend: 'neutral', highlight: false },
        scalingBusiness: { value: `₹${scaleBusinessUpfrontCost.toLocaleString('en-IN')}`, trend: 'up', highlight: false },
        shippingLess: { value: `₹${trackscoreUpfrontCost.toLocaleString('en-IN')}`, trend: 'down', highlight: true }
      },
      {
        metric: 'Capital Efficiency',
        description: 'Return on invested capital',
        shippingAll: { value: `${shipAllCapitalEfficiency}x`, trend: 'neutral', highlight: false },
        scalingBusiness: { value: `${scaleBusinessCapitalEfficiency}x`, trend: 'neutral', highlight: false },
        shippingLess: { value: `${trackscoreCapitalEfficiency}x`, trend: 'up', highlight: true }
      },
      {
        metric: 'RTO Rate',
        description: 'Percentage of returned orders',
        shippingAll: { value: `${shipAllRtoRate}%`, trend: 'neutral', highlight: false },
        scalingBusiness: { value: `${scaleBusinessRtoRate}%`, trend: 'neutral', highlight: false },
        shippingLess: { value: `${trackscoreRtoRate}%`, trend: 'down', highlight: true }
      }
    ];
    
    setComparisonMetrics(updatedMetrics);
  };
  
  // Get scale business orders number for the impact banner
  const getScaleBusinessOrders = () => {
    if (comparisonMetrics.length > 0) {
      const ordersMetric = comparisonMetrics.find(m => m.metric === 'Number of Orders/Day');
      if (ordersMetric) {
        return ordersMetric.scalingBusiness.value;
      }
    }
    return "150+"; // Fallback value
  };
  
  // Create detailed PnL data for the breakdown modal
  const getPnlBreakdownData = () => {
    if (comparisonMetrics.length === 0) return {};
    
    // Get base metrics from comparison table
    const getMetricValue = (metricName, columnKey) => {
      const metric = comparisonMetrics.find(m => m.metric === metricName);
      if (!metric) return 0;
      const value = metric[columnKey].value;
      // Parse number from string like "₹50,000" or "50%"
      return parseFloat(value.replace(/[₹,%x]/g, ''));
    };
    
    // Get order numbers from comparison metrics
    const shipAllOrders = parseInt(comparisonMetrics[0].shippingAll.value);
    const scaleBusinessOrders = parseInt(comparisonMetrics[0].scalingBusiness.value);
    const trackscoreOrders = parseInt(comparisonMetrics[0].shippingLess.value);
    
    // Average selling price (assuming same for all models)
    const avgPrice = 2000;
    
    // Calculate revenues
    const shipAllRevenue = shipAllOrders * avgPrice;
    const scaleBusinessRevenue = scaleBusinessOrders * avgPrice;
    const trackscoreRevenue = trackscoreOrders * avgPrice;
    
    // Get profits from comparison metrics (remove ₹ and commas)
    const shipAllProfit = getMetricValue('Net Profit', 'shippingAll');
    const scaleBusinessProfit = getMetricValue('Net Profit', 'scalingBusiness');
    const trackscoreProfit = getMetricValue('Net Profit', 'shippingLess');
    
    // Calculate costs (revenue - profit)
    const shipAllCosts = shipAllRevenue - shipAllProfit;
    const scaleBusinessCosts = scaleBusinessRevenue - scaleBusinessProfit;
    const trackscoeCosts = trackscoreRevenue - trackscoreProfit;
    
    // RTO rates
    const shipAllRtoRate = getMetricValue('RTO Rate', 'shippingAll') / 100;
    const scaleBusinessRtoRate = getMetricValue('RTO Rate', 'scalingBusiness') / 100;
    const trackscoreRtoRate = getMetricValue('RTO Rate', 'shippingLess') / 100;
    
    // Calculate RTO counts
    const shipAllRtoCount = Math.round(shipAllOrders * shipAllRtoRate);
    const scaleBusinessRtoCount = Math.round(scaleBusinessOrders * scaleBusinessRtoRate);
    const trackscoreRtoCount = Math.round(trackscoreOrders * trackscoreRtoRate);
    
    // Constants for cost calculations
    const forwardShippingCost = 80; // per inventory
    const reverseShippingCost = 60; // per inventory
    const packagingCost = 30; // per inventory
    const storageCost = 10; // per inventory per day
    const averageStorageDays = 15; // days in storage
    
    // Calculate detailed costs
    const calculateDetailedCosts = (orders, rtoCount, rtoRate) => {
      const inventoryCost = orders * 1200; // Cost price of goods
      const forwardShipping = orders * forwardShippingCost;
      const reverseShipping = rtoCount * reverseShippingCost;
      const packaging = orders * packagingCost;
      const storage = orders * storageCost * averageStorageDays;
      const marketingCost = orders * 200; // Marketing cost per order
      const operationsCost = orders * 150; // Operations overhead per order
      
      return {
        inventoryCost,
        forwardShipping,
        reverseShipping,
        packaging,
        storage,
        marketingCost,
        operationsCost,
        total: inventoryCost + forwardShipping + reverseShipping + packaging + storage + marketingCost + operationsCost
      };
    };
    
    const shipAllDetailedCosts = calculateDetailedCosts(shipAllOrders, shipAllRtoCount, shipAllRtoRate);
    const scaleBusinessDetailedCosts = calculateDetailedCosts(scaleBusinessOrders, scaleBusinessRtoCount, scaleBusinessRtoRate);
    const trackscoreDetailedCosts = calculateDetailedCosts(trackscoreOrders, trackscoreRtoCount, trackscoreRtoRate);
    
    return {
      shippingAll: {
        revenue: shipAllRevenue,
        orders: shipAllOrders,
        rtoCount: shipAllRtoCount,
        rtoRate: shipAllRtoRate * 100,
        costs: shipAllDetailedCosts,
        totalCosts: shipAllCosts,
        profit: shipAllProfit,
        profitMargin: getMetricValue('Net Profit %', 'shippingAll')
      },
      scalingBusiness: {
        revenue: scaleBusinessRevenue,
        orders: scaleBusinessOrders,
        rtoCount: scaleBusinessRtoCount,
        rtoRate: scaleBusinessRtoRate * 100,
        costs: scaleBusinessDetailedCosts,
        totalCosts: scaleBusinessCosts,
        profit: scaleBusinessProfit,
        profitMargin: getMetricValue('Net Profit %', 'scalingBusiness')
      },
      trackscoreShipping: {
        revenue: trackscoreRevenue,
        orders: trackscoreOrders,
        rtoCount: trackscoreRtoCount,
        rtoRate: trackscoreRtoRate * 100,
        costs: trackscoreDetailedCosts,
        totalCosts: trackscoeCosts,
        profit: trackscoreProfit,
        profitMargin: getMetricValue('Net Profit %', 'shippingLess')
      }
    };
  };
  
  const openPnlBreakdown = (column) => {
    setSelectedColumn(column);
    setShowPnlBreakdown(true);
  };
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section - Updated headline and subheadline */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Selective Shipping {'>'}  All Shipping</h1>
          <p className="text-slate-500 mt-1">
            It makes more money, uses less inventory, and scales aggressively
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Running Monthly Savings - Updated with gradient background */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <div 
                className="flex items-center rounded-lg px-4 py-3 border border-slate-200 shadow-soft cursor-pointer transition-all hover:shadow-md"
                style={{ 
                  background: 'linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)',
                  color: 'white' 
                }}
              >
                <span className="text-sm font-medium text-white mr-2">Running monthly savings:</span>
                <span className="text-base font-bold text-white">{formatCurrency(monthlySavings)}</span>
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
      
      {/* Business Impact section - Updated impact banner */}
      <div className="mb-6">
        <BusinessImpactCard 
          flaggedOrders={metrics.flaggedOrders} 
          scaleBusinessOrders={getScaleBusinessOrders()} 
        />
      </div>
      
      {/* Business Comparison Table with PnL breakdown button */}
      <div className="mb-6">
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-trackscore-text">Business Model Comparison</h2>
            <div className="flex gap-2">
              <button
                onClick={() => openPnlBreakdown('shippingAll')}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                Ship All PnL
              </button>
              <button
                onClick={() => openPnlBreakdown('scalingBusiness')}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                Scale Business PnL
              </button>
              <button
                onClick={() => openPnlBreakdown('trackscoreShipping')}
                className="text-sm px-3 py-1 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
              >
                TrackScore PnL
              </button>
            </div>
          </div>
          <BusinessComparisonTable metrics={comparisonMetrics.length > 0 ? comparisonMetrics : undefined} />
        </div>
      </div>
      
      {/* PnL Breakdown Modal */}
      {showPnlBreakdown && (
        <PnlBreakdown
          data={getPnlBreakdownData()}
          selectedColumn={selectedColumn}
          onClose={() => setShowPnlBreakdown(false)}
        />
      )}
    </div>
  );
};

export default Index;
