
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
  
  // Individual savings metrics - reordered as requested
  const savingsData = [
    {
      label: "Inventory Saved",
      value: inventorySavedCount.toString(),
      change: "+15%",
      icon: <Package className="w-5 h-5 text-purple-500" />,
      positive: true
    },
    {
      label: "Forward Shipping Costs Saved",
      value: "₹8,500",
      change: "+12%",
      icon: <Truck className="w-5 h-5 text-blue-500" />,
      positive: true
    },
    {
      label: "Reverse Shipping Costs Saved",
      value: "₹14,300",
      change: "+18%",
      icon: <RefreshCcw className="w-5 h-5 text-red-500" />,
      positive: true
    },
    {
      label: "Packaging Costs Saved",
      value: "₹4,200",
      change: "+10%",
      icon: <Box className="w-5 h-5 text-teal-500" />,
      positive: true
    }
  ];

  // Calculate total savings (excluding inventory)
  const totalSavings = "₹27,000"; // Sum of shipping, packaging and RTO costs

  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Business Impact</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {savingsData.map((metric, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-5 rounded-lg bg-slate-50/50 border border-slate-100 hover:shadow-soft transition-all duration-250"
          >
            <div className="p-3 rounded-lg bg-white shadow-sm">
              {metric.icon}
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-600">{metric.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {metric.value}
              </p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  metric.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-xs text-slate-500 ml-1">vs last period</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Total Savings Box */}
      <div className="p-6 bg-green-50 border border-green-100 rounded-lg hover:shadow-soft transition-all duration-250">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-white shadow-sm">
              <BadgeDollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-base font-medium text-green-800">
                <span className="font-bold">Saved from Hidden Losses</span>
              </p>
              <p className="text-2xl font-bold text-green-900">{`${totalSavings} + ${inventorySavedCount} inventory saved`}</p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="text-sm font-semibold text-green-700">+15% from last month</span>
          </div>
        </div>
        <p className="text-sm text-green-700 mt-3 italic">
          *That's ₹27,000 value saved + {inventorySavedCount} inventory saved
        </p>
      </div>
    </div>
  );
};

export default BusinessImpactCard;
