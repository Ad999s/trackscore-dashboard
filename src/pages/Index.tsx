
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

const Index = () => {
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
          trend={12}
          trendLabel="vs. last period"
          icon="package"
        />
        <MetricCard 
          title="Avg. Order Value"
          value="$78.65" 
          trend={-2.3}
          trendLabel="vs. last period"
          icon="dollar"
        />
        <MetricCard 
          title="On-time Delivery"
          value="94.5%" 
          trend={3.7}
          trendLabel="vs. last period"
          icon="truck"
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
            <QualityScoreGauge score={87} />
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
          <OrderThresholdGauge current={782} threshold={1000} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Quality Cutoff Analysis</h2>
          <CutOffQuality />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Profit Trend</h2>
          <ProfitGraph />
        </div>
      </div>
      
      <WarningAlert />
    </div>
  );
};

export default Index;
