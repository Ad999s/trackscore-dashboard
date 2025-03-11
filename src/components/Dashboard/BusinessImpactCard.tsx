
import React from 'react';
import { TrendingUp, ArrowUp, BadgeDollarSign, Package } from 'lucide-react';

interface ImpactMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive: boolean;
}

const BusinessImpactCard = () => {
  const metrics: ImpactMetric[] = [
    {
      label: "Revenue Growth",
      value: "₹45,000",
      change: "+22%",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      positive: true
    },
    {
      label: "Cost Savings",
      value: "₹12,000",
      change: "+15%",
      icon: <BadgeDollarSign className="w-5 h-5 text-blue-500" />,
      positive: true
    },
    {
      label: "Delivery Success",
      value: "156 orders",
      change: "+18%",
      icon: <Package className="w-5 h-5 text-purple-500" />,
      positive: true
    },
    {
      label: "Capital Efficiency",
      value: "1.8x",
      change: "+25%",
      icon: <ArrowUp className="w-5 h-5 text-orange-500" />,
      positive: true
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Business Impact</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
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
    </div>
  );
};

export default BusinessImpactCard;
