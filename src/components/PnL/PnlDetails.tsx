
import React from 'react';
import { format } from 'date-fns';
import { X, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DetailedPnLData {
  ordersShipped: number;
  deliveredOrders: number | null;
  rtoOrders: number | null;
  deliveryPercentage: number | null;
  rtoRate: number;
  mrp: number;
  productCost: number;
  shippingCost: number;
  packagingCost: number;
  costOfRto: number;
  totalRevenue: number;
  totalProductCost: number;
  totalShippingCost: number;
  totalPackagingCost: number;
  totalCostOfRto: number | null;
  totalCogs: number | null;
  grossProfit: number | null;
  netProfit: number | null;
  netProfitPerOrder: number | null;
  inventoryUsed: number | null;
  leftInTransit?: number;
}

interface PnlDetailsProps {
  data: DetailedPnLData | undefined;
  date: Date;
  onClose: () => void;
}

const PnlDetails: React.FC<PnlDetailsProps> = ({ data, date, onClose }) => {
  const navigate = useNavigate();
  
  if (!data) return null;
  
  const formatCurrency = (value: number | null) => {
    if (value === null) return 'N/A';
    return `₹${value.toLocaleString('en-IN')}`;
  };
  
  const formatPercentage = (value: number | null) => {
    if (value === null) return 'N/A';
    return `${value.toFixed(2)}%`;
  };
  
  const handleShowOrders = () => {
    // Navigate to orders page with date filter
    // Format date as YYYY-MM-DD for URL params
    const formattedDate = format(date, 'yyyy-MM-dd');
    navigate(`/orders?date=${formattedDate}`);
  };
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Detailed P&L for {format(date, 'dd MMMM yyyy')}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {data.leftInTransit && data.leftInTransit > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            <span className="font-medium text-amber-700">Left in Transit: {data.leftInTransit}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShowOrders}
            className="text-amber-600 border-amber-300 hover:bg-amber-50"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Show
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-slate-800 mb-4 border-b pb-2">Order Metrics</h4>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2 text-sm text-slate-600">Orders Shipped</td>
                <td className="py-2 text-sm font-medium text-right">{data.ordersShipped}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Delivered Orders</td>
                <td className="py-2 text-sm font-medium text-right">{data.deliveredOrders || 'N/A'}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">RTO Orders</td>
                <td className="py-2 text-sm font-medium text-right">{data.rtoOrders || 'N/A'}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Delivery Percentage</td>
                <td className="py-2 text-sm font-medium text-right">{formatPercentage(data.deliveryPercentage)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">RTO Rate</td>
                <td className="py-2 text-sm font-medium text-right text-red-500">{data.rtoRate}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <h4 className="font-semibold text-slate-800 mb-4 border-b pb-2">Per Order Costs</h4>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2 text-sm text-slate-600">MRP</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.mrp)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Product Cost</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.productCost)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Shipping Cost</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.shippingCost)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Packaging Cost</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.packagingCost)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Cost of RTO</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.costOfRto)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <h4 className="font-semibold text-slate-800 mb-4 border-b pb-2">Total Metrics</h4>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2 text-sm text-slate-600">Total Revenue</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.totalRevenue)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Total Product Cost</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.totalProductCost)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Total Shipping Cost</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.totalShippingCost)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Total Packaging Cost</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.totalPackagingCost)}</td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-slate-600">Total Cost of RTO</td>
                <td className="py-2 text-sm font-medium text-right">{formatCurrency(data.totalCostOfRto)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t">
        <h4 className="font-semibold text-slate-800 mb-4">Profitability</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">Total COGS</div>
            <div className="text-lg font-bold">{formatCurrency(data.totalCogs)}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">Gross Profit</div>
            <div className="text-lg font-bold text-green-600">{formatCurrency(data.grossProfit)}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">Net Profit per Order</div>
            <div className="text-lg font-bold text-green-600">{formatCurrency(data.netProfitPerOrder)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnlDetails;

