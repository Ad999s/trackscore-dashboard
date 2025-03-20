
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronRight, 
  MoreHorizontal,
  Phone,
  MapPin,
  Package,
  CircleDollarSign,
  Truck,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

// Order status types with better styling
const OrderStatus = ({ status }) => {
  let icon, colorClass, label;
  
  switch (status) {
    case 'shipped':
      icon = <Truck className="w-4 h-4" />;
      colorClass = 'bg-blue-100 text-blue-700 border-blue-200';
      label = 'Shipped';
      break;
    case 'delivered':
      icon = <CheckCircle2 className="w-4 h-4" />;
      colorClass = 'bg-green-100 text-green-700 border-green-200';
      label = 'Delivered';
      break;
    case 'cancelled':
      icon = <XCircle className="w-4 h-4" />;
      colorClass = 'bg-red-100 text-red-700 border-red-200';
      label = 'Cancelled';
      break;
    case 'risky':
      icon = <AlertTriangle className="w-4 h-4" />;
      colorClass = 'bg-orange-100 text-orange-700 border-orange-200';
      label = 'Risky';
      break;
    case 'pending':
      icon = <CircleDollarSign className="w-4 h-4" />;
      colorClass = 'bg-purple-100 text-purple-700 border-purple-200';
      label = 'Pending';
      break;
    default:
      icon = <Package className="w-4 h-4" />;
      colorClass = 'bg-gray-100 text-gray-700 border-gray-200';
      label = 'Processing';
  }
  
  return (
    <Badge variant="outline" className={cn("flex items-center gap-1 px-2 py-1 font-medium border", colorClass)}>
      {icon}
      <span>{label}</span>
    </Badge>
  );
};

// Quality score indicators
const QualityScore = ({ score }) => {
  let colorClass = '';
  
  if (score >= 80) {
    colorClass = 'text-green-600 bg-green-50 border-green-100';
  } else if (score >= 50) {
    colorClass = 'text-yellow-600 bg-yellow-50 border-yellow-100';
  } else {
    colorClass = 'text-red-600 bg-red-50 border-red-100';
  }
  
  return (
    <div className={cn("rounded-full px-3 py-1 text-sm font-semibold border inline-flex items-center justify-center", colorClass)}>
      {score}%
    </div>
  );
};

// Mock order data
const orders = [
  {
    id: '12345',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: null
    },
    product: 'Premium Headphones',
    quantity: 1,
    price: 2999,
    date: '2023-10-15',
    status: 'shipped',
    qualityScore: 88,
    address: '123 Main St, New York, NY',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '12346',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: null
    },
    product: 'Wireless Earbuds',
    quantity: 2,
    price: 1499,
    date: '2023-10-14',
    status: 'delivered',
    qualityScore: 95,
    address: '456 Elm St, Boston, MA',
    phone: '+1 (555) 987-6543'
  },
  {
    id: '12347',
    customer: {
      name: 'Robert Johnson',
      email: 'robert@example.com',
      avatar: null
    },
    product: 'Smartphone Case',
    quantity: 1,
    price: 499,
    date: '2023-10-14',
    status: 'risky',
    qualityScore: 32,
    address: '789 Oak St, Chicago, IL',
    phone: '+1 (555) 246-8102'
  },
  {
    id: '12348',
    customer: {
      name: 'Emily Davis',
      email: 'emily@example.com',
      avatar: null
    },
    product: 'Smart Watch',
    quantity: 1,
    price: 3999,
    date: '2023-10-13',
    status: 'pending',
    qualityScore: 75,
    address: '101 Pine St, Miami, FL',
    phone: '+1 (555) 369-8741'
  },
  {
    id: '12349',
    customer: {
      name: 'Michael Brown',
      email: 'michael@example.com',
      avatar: null
    },
    product: 'Bluetooth Speaker',
    quantity: 3,
    price: 1299,
    date: '2023-10-12',
    status: 'cancelled',
    qualityScore: 29,
    address: '202 Maple St, Los Angeles, CA',
    phone: '+1 (555) 159-7532'
  }
];

const OrdersTable = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  const toggleOrderExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead className="w-[200px]">Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Quality Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleOrderExpand(order.id)}
                      className="h-8 w-8"
                    >
                      {expandedOrder === order.id ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={order.customer.avatar || ''} alt={order.customer.name} />
                        <AvatarFallback className="bg-slate-100 text-slate-600">
                          {order.customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{order.customer.name}</p>
                        <p className="text-xs text-slate-500">{order.customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="mr-2 h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center">
                        <Package className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{order.product}</p>
                        <p className="text-xs text-slate-500">Qty: {order.quantity}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">₹{order.price.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <QualityScore score={order.qualityScore} />
                  </TableCell>
                  <TableCell>
                    <OrderStatus status={order.status} />
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {new Date(order.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Order</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Cancel Order</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
                
                {expandedOrder === order.id && (
                  <TableRow className="bg-slate-50/50">
                    <TableCell colSpan={9} className="p-0">
                      <div className="p-4 text-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            Shipping Address
                          </h4>
                          <p className="text-slate-600 ml-6">{order.address}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                            <Phone className="h-4 w-4 text-slate-400" />
                            Contact Number
                          </h4>
                          <p className="text-slate-600 ml-6">{order.phone}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-slate-400" />
                            Risk Factors
                          </h4>
                          <div className="ml-6">
                            {order.qualityScore < 50 ? (
                              <ul className="list-disc pl-4 text-red-600 space-y-1">
                                <li>Multiple failed deliveries to this address</li>
                                <li>Customer has history of returns</li>
                                <li>Unusual order pattern detected</li>
                              </ul>
                            ) : order.qualityScore < 80 ? (
                              <ul className="list-disc pl-4 text-yellow-600 space-y-1">
                                <li>Previous delivery delay to this area</li>
                                <li>Medium-risk order profile</li>
                              </ul>
                            ) : (
                              <p className="text-green-600">No risk factors detected</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-4 pb-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Full Details
                        </Button>
                        {order.status === 'risky' && (
                          <Button variant="destructive" size="sm">
                            Cancel Order
                          </Button>
                        )}
                        {['pending', 'processing'].includes(order.status) && (
                          <Button variant="default" size="sm">
                            Process Order
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersTable;
