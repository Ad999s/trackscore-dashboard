
import React from 'react';
import MetricCard from '@/components/Dashboard/MetricCard';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import QualityScoreGauge from '@/components/Dashboard/QualityScoreGauge';
import BusinessImpactCard from '@/components/Dashboard/BusinessImpactCard';
import ComparisonTable from '@/components/Dashboard/ComparisonTable';
import WarningAlert from '@/components/Dashboard/WarningAlert';
import OrderThresholdGauge from '@/components/Dashboard/OrderThresholdGauge';
import CutOffQuality from '@/components/Dashboard/CutOffQuality';
import ProfitGraph from '@/components/Dashboard/ProfitGraph';
import { Package, DollarSign, Truck } from 'lucide-react';

const Index = () => {
  // State for interactive components
  const [qualityThreshold, setQualityThreshold] = React.useState(75);
  const [orderThreshold, setOrderThreshold] = React.useState(65);

  // Handler for CutOffQuality component
  const handleQualityChange = (value: number) => {
    setQualityThreshold(value);
    console.log('Quality threshold changed:', value);
  };

  // Handler for OrderThreshold component
  const handleOrderThresholdChange = (value: number) => {
    setOrderThreshold(value);
    console.log('Order threshold changed:', value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Make more with smart shipping</h1>
        <p className="text-gray-500 italic mt-1">Drastically see improvement in overhead costs and net profits</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Total Orders"
          value={1458} 
          icon={<Package className="w-5 h-5 text-blue-500" />}
        />
        <MetricCard 
          title="Avg. Order Value"
          value="$78.65" 
          icon={<DollarSign className="w-5 h-5 text-green-500" />}
        />
        <MetricCard 
          title="On-time Delivery"
          value="94.5%" 
          icon={<Truck className="w-5 h-5 text-purple-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Performance Overview</h2>
          <PerformanceChart />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Quality Score</h2>
          <div className="flex justify-center">
            <QualityScoreGauge 
              initialScore={87}
              optimizedScore={92}
              onScoreChange={(score) => console.log('Score changed:', score)}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BusinessImpactCard />
        
        <div className="bg-white rounded-lg shadow p-6 col-span-2">
          <h2 className="text-lg font-medium mb-4">Competitor Comparison</h2>
          <ComparisonTable />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Order Threshold</h2>
          <OrderThresholdGauge 
            totalOrders={1000}
            initialThreshold={65}
            onThresholdChange={handleOrderThresholdChange}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Quality Cutoff Analysis</h2>
          <CutOffQuality 
            initialValue={qualityThreshold}
            onValueChange={handleQualityChange}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Profit Trend</h2>
          <ProfitGraph 
            threshold={orderThreshold}
            onAutoThresholdChange={handleOrderThresholdChange}
          />
        </div>
      </div>
      
      <WarningAlert 
        message="You have 3 orders that don't meet the quality threshold. Consider adjusting your threshold or improving order quality."
      />
    </div>
  );
};

export default Index;
