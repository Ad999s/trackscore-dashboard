
import React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricRowProps {
  metric: string;
  impact: string;
  description: string;
}

const MetricRow: React.FC<MetricRowProps> = ({ metric, impact, description }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors duration-200">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
        {metric}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-right pr-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-end">
                <span className="font-medium mr-1.5 text-trackscore-success">
                  {impact}
                </span>
                <TrendingUp className="w-4 h-4 text-trackscore-success" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>
    </tr>
  );
};

const ComparisonTable: React.FC = () => {
  const data = [
    {
      metric: "RTO Rate",
      impact: "Reduced by 10%",
      description: "Decreased from 25% to 15%, significantly improving delivery success rate"
    },
    {
      metric: "Cost of RTOs",
      impact: "Saved ₹60,000/month",
      description: "Reduced from ₹1,50,000/month to ₹90,000/month in reverse logistics costs"
    },
    {
      metric: "Inventory Used",
      impact: "Reduced by 750 units",
      description: "Optimized from 3000 units to 2250 units through better order selection"
    },
    {
      metric: "Capital Savings",
      impact: "Freed up ₹1,50,000",
      description: "Released capital from ₹6,00,000 to ₹4,50,000 tied in inventory"
    },
    {
      metric: "Net Profit per Order",
      impact: "Increased by ₹40/order",
      description: "Improved from ₹100/order to ₹140/order through reduced returns"
    }
  ];

  return (
    <div className="overflow-x-auto -mx-6 mt-8">
      <div className="inline-block min-w-full align-middle px-6">
        <div className="overflow-hidden border border-slate-200 rounded-lg">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
                  Business Metric
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-slate-900 pr-6">
                  Impact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {data.map((item, index) => (
                <MetricRow 
                  key={index}
                  metric={item.metric}
                  impact={item.impact}
                  description={item.description}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
