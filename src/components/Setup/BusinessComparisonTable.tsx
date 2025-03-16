
import React from 'react';
import { Check, AlertCircle, ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MetricRowProps {
  metric: string;
  description: string;
  shippingAll: { 
    value: string; 
    trend?: 'up' | 'down' | 'neutral';
    highlight?: boolean;
  };
  shippingLess: { 
    value: string; 
    trend?: 'up' | 'down' | 'neutral';
    highlight?: boolean;
  };
  scalingBusiness: { 
    value: string; 
    trend?: 'up' | 'down' | 'neutral';
    highlight?: boolean;
  };
}

const metrics: MetricRowProps[] = [
  {
    metric: 'Number of Orders/Day',
    description: 'Daily order processing volume',
    shippingAll: { value: '50', trend: 'neutral', highlight: false },
    shippingLess: { value: '40', trend: 'down', highlight: true },
    scalingBusiness: { value: '75', trend: 'up', highlight: false }
  },
  {
    metric: 'Net Profit',
    description: 'Total profit after all costs',
    shippingAll: { value: '₹50,000', trend: 'neutral', highlight: false },
    shippingLess: { value: '₹75,000', trend: 'up', highlight: true },
    scalingBusiness: { value: '₹72,000', trend: 'up', highlight: false }
  },
  {
    metric: 'Upfront Cost',
    description: 'Initial capital investment required',
    shippingAll: { value: '₹100,000', trend: 'neutral', highlight: false },
    shippingLess: { value: '₹70,000', trend: 'down', highlight: true },
    scalingBusiness: { value: '₹150,000', trend: 'up', highlight: false }
  },
  {
    metric: 'RTO Rate',
    description: 'Percentage of returned orders',
    shippingAll: { value: '25%', trend: 'neutral', highlight: false },
    shippingLess: { value: '12%', trend: 'down', highlight: true },
    scalingBusiness: { value: '25%', trend: 'neutral', highlight: false }
  },
  {
    metric: 'Order Volume',
    description: 'Number of orders processed',
    shippingAll: { value: '100', trend: 'neutral', highlight: false },
    shippingLess: { value: '75', trend: 'down', highlight: true },
    scalingBusiness: { value: '150', trend: 'up', highlight: false }
  },
  {
    metric: 'Capital Efficiency',
    description: 'Return on invested capital',
    shippingAll: { value: '0.5x', trend: 'neutral', highlight: false },
    shippingLess: { value: '1.07x', trend: 'up', highlight: true },
    scalingBusiness: { value: '0.48x', trend: 'down', highlight: false }
  },
  {
    metric: 'Inventory Usage',
    description: 'Amount of inventory tied up',
    shippingAll: { value: '100 units', trend: 'neutral', highlight: false },
    shippingLess: { value: '75 units', trend: 'down', highlight: true },
    scalingBusiness: { value: '150 units', trend: 'up', highlight: false }
  }
];

const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    case 'down':
      return <ArrowDown className="h-4 w-4 text-green-500" />;
    default:
      return <Minus className="h-4 w-4 text-gray-400" />;
  }
};

const BusinessComparisonTable = () => {
  return (
    <div className="mx-auto mt-8 mb-12">
      <h3 className="text-xl font-semibold mb-4">Compare Business Models</h3>
      <p className="text-slate-600 mb-6">
        See how shipping fewer, higher-quality orders can match or exceed the profits of scaling, 
        while using less capital and resources.
      </p>
      
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <Table className="w-full">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-1/5 py-3">Metric</TableHead>
              <TableHead className="w-1/5 text-center">Ship All Orders</TableHead>
              <TableHead className="w-1/5 text-center bg-green-50 text-green-700">Ship Less (TrackScore)</TableHead>
              <TableHead className="w-1/5 text-center">Scale Business</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((item, index) => (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <TableCell className="font-medium">
                  <div>
                    <div>{item.metric}</div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                  </div>
                </TableCell>
                
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <span>{item.shippingAll.value}</span>
                    <span className="ml-1">{getTrendIcon(item.shippingAll.trend)}</span>
                  </div>
                </TableCell>
                
                <TableCell 
                  className={cn(
                    "text-center font-medium", 
                    item.shippingLess.highlight && "bg-green-50 text-green-700"
                  )}
                >
                  <div className="flex items-center justify-center">
                    <span>{item.shippingLess.value}</span>
                    <span className="ml-1">{getTrendIcon(item.shippingLess.trend)}</span>
                  </div>
                </TableCell>
                
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <span>{item.scalingBusiness.value}</span>
                    <span className="ml-1">{getTrendIcon(item.scalingBusiness.trend)}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg">
        <p className="text-green-700 font-medium">
          The TrackScore approach lets you make more profit with less capital and inventory by intelligently 
          selecting which orders to fulfill, without having to acquire more customers or increase marketing spend.
        </p>
      </div>
    </div>
  );
};

export default BusinessComparisonTable;
