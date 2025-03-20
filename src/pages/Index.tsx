import React, { useState, useEffect } from 'react';
import { ChevronUp, TrendingUp, Package, BadgeDollarSign, AlertTriangle, ChevronDown } from 'lucide-react';
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
  
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [comparisonMetrics, setComparisonMetrics] = useState([]);
  const [showPnlBreakdown, setShowPnlBreakdown] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<'shippingAll' | 'scalingBusiness' | 'trackscoreShipping'>('shippingAll');
  
  useEffect(() => {
    const today = new Date();
    const daysInMonth = today.getDate();
    
    const dailySavings = 27000;
    const calculatedMonthlySavings = dailySavings * daysInMonth;
    setMonthlySavings(calculatedMonthlySavings);
  }, []);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  useEffect(() => {
    const totalOrders = 156;
    
    let ordersToShip = 1;
    let deliveryRate = 100;
    
    if (threshold > 0) {
      ordersToShip = Math.max(1, Math.round((threshold / 100) * totalOrders));
      deliveryRate = Math.round(metrics.previousDeliveryRate + ((100 - threshold) / 100) * (100 - metrics.previousDeliveryRate));
    }
    
    const flaggedOrders = totalOrders - ordersToShip;
    
    setShowWarning(threshold < 50);
    
    setMetrics({
      totalOrders,
      flaggedOrders,
      ordersToShip,
      deliveryRate,
      previousDeliveryRate: metrics.previousDeliveryRate
    });
    
    updateComparisonMetrics(threshold, ordersToShip, flaggedOrders, totalOrders);
  }, [threshold, metrics.previousDeliveryRate]);
  
  const updateComparisonMetrics = (threshold, ordersToShip, flaggedOrders, totalOrders) => {
    const baseProfit = 75000;
    const basePercentage = 25;
    const baseUpfrontCost = 70000;
    const baseCapitalEfficiency = 1.07;
    const baseRtoRate = 12;
    
    const forwardShippingCost = 80;
    const reverseShippingCost = 60;
    const packagingCost = 30;
    
    const trackscoreOrders = ordersToShip;
    const trackscoreProfit = Math.round(baseProfit * (1 - (threshold - 75) * 0.003));
    const trackscorePercentage = Math.round(basePercentage * (1 - (threshold - 75) * 0.004));
    const trackscoreUpfrontCost = Math.round(baseUpfrontCost * (1 + (threshold - 75) * 0.005));
    const trackscoreCapitalEfficiency = parseFloat((baseCapitalEfficiency * (1 - (threshold - 75) * 0.003)).toFixed(2));
    const trackscoreRtoRate = Math.round(baseRtoRate * (1 + (threshold - 75) * 0.01));
    
    const shipAllOrders = totalOrders;
    const shipAllProfit = 50000;
    const shipAllPercentage = 15;
    const shipAllUpfrontCost = 100000;
    const shipAllCapitalEfficiency = 0.5;
    const shipAllRtoRate = 25;
    
    const profitRatio = trackscoreProfit / shipAllProfit;
    const scaleBusinessOrders = Math.ceil(shipAllOrders * 1.5);
    const scaleBusinessProfit = trackscoreProfit;
    const scaleBusinessPercentage = shipAllPercentage;
    const scaleBusinessUpfrontCost = Math.round(shipAllUpfrontCost * 1.5);
    const scaleBusinessCapitalEfficiency = shipAllCapitalEfficiency;
    const scaleBusinessRtoRate = shipAllRtoRate;
    
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
  
  const getScaleBusinessOrders = () => {
    if (comparisonMetrics.length > 0) {
      const ordersMetric = comparisonMetrics.find(m => m.metric === 'Number of Orders/Day');
      if (ordersMetric) {
        return ordersMetric.scalingBusiness.value;
      }
    }
    return "150+";
  };
  
  const getPnlBreakdownData = () => {
    if (comparisonMetrics.length === 0) return {};
    
    const getMetricValue = (metricName, columnKey) => {
      const metric = comparisonMetrics.find(m => m.metric === metricName);
      if (!metric) return 0;
      const value = metric[columnKey].value;
      return parseFloat(value.replace(/[₹,%x]/g, ''));
    };
    
    const shipAllOrders = parseInt(comparisonMetrics[0].shippingAll.value);
    const scaleBusinessOrders = parseInt(comparisonMetrics[0].scalingBusiness.value);
    const trackscoreOrders = parseInt(comparisonMetrics[0].shippingLess.value);
    
    const avgPrice = 2000;
    
    const shipAllRevenue = shipAllOrders * avgPrice;
    const scaleBusinessRevenue = scaleBusinessOrders * avgPrice;
    const trackscoreRevenue = trackscoreOrders * avgPrice;
    
    const shipAllProfit = getMetricValue('Net Profit', 'shippingAll');
    const scaleBusinessProfit = getMetricValue('Net Profit', 'scalingBusiness');
    const trackscoreProfit = getMetricValue('Net Profit', 'shippingLess');
    
    const shipAllCosts = shipAllRevenue - shipAllProfit;
    const scaleBusinessCosts = scaleBusinessRevenue - scaleBusinessProfit;
    const trackscoeCosts = trackscoreRevenue - trackscoreProfit;
    
    const shipAllRtoRate = getMetricValue('RTO Rate', 'shippingAll') / 100;
    const scaleBusinessRtoRate = getMetricValue('RTO Rate', 'scalingBusiness') / 100;
    const trackscoreRtoRate = getMetricValue('RTO Rate', 'shippingLess') / 100;
    
    const shipAllRtoCount = Math.round(shipAllOrders * shipAllRtoRate);
    const scaleBusinessRtoCount = Math.round(scaleBusinessOrders * scaleBusinessRtoRate);
    const trackscoreRtoCount = Math.round(trackscoreOrders * trackscoreRtoRate);
    
    const forwardShippingCost = 80;
    const reverseShippingCost = 60;
    const packagingCost = 30;
    const storageCost = 10;
    const averageStorageDays = 15;
    
    const calculateDetailedCosts = (orders, rtoCount, rtoRate) => {
      const inventoryCost = orders * 1200;
      const forwardShipping = orders * forwardShippingCost;
      const reverseShipping = rtoCount * reverseShippingCost;
      const packaging = orders * packagingCost;
      const storage = orders * storageCost * averageStorageDays;
      const marketingCost = orders * 200;
      const operationsCost = orders * 150;
      
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Selective Shipping {'>'}  All Shipping</h1>
          <p className="text-slate-500 mt-1">
            It makes more money, uses less inventory, and scales aggressively
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div 
                className="flex items-center rounded-lg px-4 py-3 border border-slate-200 shadow-soft cursor-pointer transition-all hover:shadow-md"
                style={{ 
                  background: 'linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)',
                }}
              >
                <span className="text-sm font-medium text-white mr-2 drop-shadow-sm">Extra monthly profits:</span>
                <span className="text-base font-bold text-white drop-shadow-sm">{formatCurrency(monthlySavings)}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Monthly Profits Breakdown</h4>
                <p className="text-xs text-slate-500">
                  Total accumulated extra profits from {format(new Date(new Date().setDate(1)), "MMMM d, yyyy")} to today.
                </p>
                <div className="pt-2">
                  <div className="flex justify-between text-xs">
                    <span>Daily profits:</span>
                    <span className="font-medium">₹27,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Days in current month:</span>
                    <span className="font-medium">{new Date().getDate()} days</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t mt-2">
                    <span>Total extra profits:</span>
                    <span className="text-blue-600">{formatCurrency(monthlySavings)}</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      
      {showWarning && (
        <WarningAlert 
          message="Order volume is too less. Consider increasing threshold above 50%."
          className="mb-6"
          onClose={() => setShowWarning(false)}
        />
      )}
      
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
          onClick={() => {}}
        >
          <button className="mt-2 py-1.5 px-3 bg-red-500 hover:bg-red-600 transition-colors text-white text-xs font-medium rounded-md">
            Cancel Orders
          </button>
        </MetricCard>
        <MetricCard 
          title="New Delivery %" 
          value={metrics.deliveryRate} 
          suffix="%"
          variant="success"
          icon={<TrendingUp className="h-5 w-5" />}
          change={metrics.deliveryRate - metrics.previousDeliveryRate}
          previousValue={metrics.previousDeliveryRate}
        >
          <div className="mt-2 flex items-center">
            <span className="text-sm text-slate-500 mr-2">Previous Delivery:</span>
            <span className="text-sm font-medium">{metrics.previousDeliveryRate}%</span>
          </div>
        </MetricCard>
      </div>
      
      <div className="mb-6">
        <BusinessImpactCard 
          flaggedOrders={metrics.flaggedOrders} 
          scaleBusinessOrders={getScaleBusinessOrders()} 
        />
      </div>
      
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
