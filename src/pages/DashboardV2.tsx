
import React from 'react';
import { ChevronUp, TrendingUp, Package, BadgeDollarSign, AlertTriangle } from 'lucide-react';
import MetricCard from '@/components/Dashboard/MetricCard';
import { Card } from '@/components/ui/card';
import QualityScoreGauge from '@/components/Dashboard/QualityScoreGauge';
import BusinessImpactCard from '@/components/Dashboard/BusinessImpactCard';

const DashboardV2 = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Welcome Back, Company Name!</h1>
          <p className="text-slate-500 mt-1">
            Here's how your business is performing today
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full flex items-center">
            <ChevronUp className="w-4 h-4 mr-1" />
            22% Growth
          </span>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Total Orders"
          value={156}
          icon={<Package className="text-blue-500" />}
          showInfoButton={true}
          infoText="Total orders received today"
        />
        <MetricCard
          title="Delivery Rate"
          value={78}
          suffix="%"
          icon={<TrendingUp className="text-green-500" />}
          variant="success"
          showInfoButton={true}
          infoText="Orders successfully delivered"
        />
        <MetricCard
          title="Net Profit"
          value="₹12,450"
          icon={<BadgeDollarSign className="text-blue-500" />}
          variant="highlight"
          showInfoButton={true}
          infoText="Net profit after all costs"
        />
        <MetricCard
          title="Flagged Orders"
          value={36}
          icon={<AlertTriangle className="text-orange-500" />}
          variant="warning"
          showInfoButton={true}
          infoText="Orders that need attention"
        />
      </div>

      {/* Quality Score Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 p-6">
          <QualityScoreGauge />
        </Card>
        <Card className="lg:col-span-2 p-6">
          <BusinessImpactCard />
        </Card>
      </div>
    </div>
  );
};

export default DashboardV2;
