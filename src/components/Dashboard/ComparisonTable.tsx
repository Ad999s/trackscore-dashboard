
import React from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  ArrowDown, 
  ArrowUp 
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface MetricRowProps {
  metric: string;
  before: string;
  after: string;
  impact: string;
  isPositive: boolean;
}

const MetricRow: React.FC<MetricRowProps> = ({ metric, before, after, impact, isPositive }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors duration-200">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
        {metric}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-slate-500">
        {before}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
        <span className={cn(
          "font-medium",
          isPositive ? "text-trackscore-success" : "text-trackscore-warning"
        )}>
          {after}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-right pr-6">
        <div className="flex items-center justify-end">
          <span className={cn(
            "font-medium mr-1.5",
            isPositive ? "text-trackscore-success" : "text-trackscore-warning"
          )}>
            {impact}
          </span>
          {isPositive ? 
            <TrendingUp className="w-4 h-4 text-trackscore-success" /> : 
            <TrendingDown className="w-4 h-4 text-trackscore-warning" />
          }
        </div>
      </td>
    </tr>
  );
};

const ComparisonTable: React.FC = () => {
  const data = [
    {
      metric: "RTO Rate",
      before: "25%",
      after: "15%",
      impact: "Reduced by 10%",
      isPositive: true
    },
    {
      metric: "Cost of RTOs",
      before: "₹1,50,000/month",
      after: "₹90,000/month",
      impact: "Saved ₹60,000/month",
      isPositive: true
    },
    {
      metric: "Inventory Used",
      before: "3000 units",
      after: "2250 units",
      impact: "Reduced by 750 units",
      isPositive: true
    },
    {
      metric: "Capital Savings",
      before: "₹6,00,000 tied up",
      after: "₹4,50,000 tied up",
      impact: "Freed up ₹1,50,000 in capital",
      isPositive: true
    },
    {
      metric: "Net Profit per Order",
      before: "₹100/order",
      after: "₹140/order",
      impact: "Increased by ₹40/order",
      isPositive: true
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
                  Metric
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">
                  Before
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">
                  After
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
                  before={item.before}
                  after={item.after}
                  impact={item.impact}
                  isPositive={item.isPositive}
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
