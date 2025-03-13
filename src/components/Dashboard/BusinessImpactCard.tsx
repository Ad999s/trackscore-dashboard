
import React from 'react';
import { TrendingUp, ArrowUp, BadgeDollarSign, Package, Truck, Box, RefreshCcw } from 'lucide-react';

interface ImpactMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive: boolean;
}

const BusinessImpactCard = () => {
  // Get flagged orders value from metrics in Dashboard
  const inventorySavedCount = 36; // Same as flagged orders
  
  // Individual savings metrics
  const savingsData = [
    {
      label: "Inventory Saved",
      value: inventorySavedCount.toString(),
      change: "+15%",
      icon: <Package className="w-5 h-5 text-purple-500" />,
      positive: true
    },
    {
      label: "Shipping Costs Saved",
      value: "₹8,500",
      change: "+12%",
      icon: <Truck className="w-5 h-5 text-blue-500" />,
      positive: true
    },
    {
      label: "Packaging Costs Saved",
      value: "₹4,200",
      change: "+10%",
      icon: <Box className="w-5 h-5 text-teal-500" />,
      positive: true
    },
    {
      label: "RTO Losses Saved",
      value: "₹14,300",
      change: "+18%",
      icon: <RefreshCcw className="w-5 h-5 text-red-500" />,
      positive: true
    }
  ];

  // Calculate total savings (excluding inventory)
  const totalSavings = "₹27,000"; // Sum of shipping, packaging and RTO costs

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Business Impact</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {savingsData.map((metric, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50/50 border border-slate-100"
          >
            <div className="p-2 rounded-lg bg-white shadow-sm">
              {metric.icon}
            </div>
            
            <div>
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="text-xl font-semibold text-slate-900 mt-1">
                {metric.value}
              </p>
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium ${
                  metric.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-xs text-slate-400 ml-1">vs last period</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Total Savings Box */}
      <div className="p-5 bg-green-50 border border-green-100 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white shadow-sm">
              <BadgeDollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Total Savings Today</p>
              <p className="text-2xl font-bold text-green-900">{`${totalSavings} + ${inventorySavedCount}`}</p>
            </div>
          </div>
          <div className="bg-white px-3 py-1 rounded-full shadow-sm">
            <span className="text-sm font-semibold text-green-700">+15% from last month</span>
          </div>
        </div>
        <p className="text-sm text-green-700 mt-2 italic">
          *Total of shipping, packaging, and RTO costs saved + inventory count saved
        </p>
      </div>
    </div>
  );
};

export default BusinessImpactCard;
