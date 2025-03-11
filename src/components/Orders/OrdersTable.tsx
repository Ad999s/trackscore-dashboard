
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  AlertTriangle, 
  Tag, 
  Phone,
  MapPin,
  Package
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface OrdersTableProps {
  threshold: number;
  filters: {
    dateRange: { from: Date | undefined; to: Date | undefined };
    onlyBelowThreshold: boolean;
    onlyAboveThreshold: boolean;
    orderStatus: string[];
    verificationStatus: string[];
    tags: string[];
  };
}

type Order = {
  id: string;
  orderId: string;
  date: string;
  customer: {
    name: string;
    phone: string;
  };
  product: string;
  price: number;
  city: {
    name: string;
    tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  };
  address: string;
  quality: number;
  tags: string[];
  verification: {
    otp: boolean;
    ivr: boolean;
  };
  status: 'Unshipped' | 'Shipped' | 'Delivered' | 'Returned';
};

// Generate dummy data
const generateOrders = (count: number): Order[] => {
  const cities = [
    { name: 'Mumbai', tier: 'Tier 1' as const },
    { name: 'Delhi', tier: 'Tier 1' as const },
    { name: 'Bangalore', tier: 'Tier 1' as const },
    { name: 'Jaipur', tier: 'Tier 2' as const },
    { name: 'Pune', tier: 'Tier 2' as const },
    { name: 'Ahmedabad', tier: 'Tier 2' as const },
    { name: 'Guwahati', tier: 'Tier 3' as const },
    { name: 'Bhubaneswar', tier: 'Tier 3' as const },
  ];
  
  const products = [
    'TrackScore Premium Plan',
    'TrackScore Basic Plan',
    'TrackScore Enterprise Solution',
    'AI Analysis Add-on',
    'Advanced Reporting Module',
    'Integration Package',
  ];
  
  const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };
  
  const statuses = ['Unshipped', 'Shipped', 'Delivered', 'Returned'] as const;
  const tags = ['Fast Order', 'First Order', 'Second Order', 'Past Fraud'];
  
  return Array(count).fill(0).map((_, index) => {
    const quality = Math.floor(Math.random() * 101);
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    const randomTags = [];
    if (Math.random() > 0.7) randomTags.push(tags[0]);
    if (Math.random() > 0.8) randomTags.push(tags[1]);
    if (Math.random() > 0.9) randomTags.push(tags[2]);
    if (quality < 40 && Math.random() > 0.7) randomTags.push(tags[3]);
    
    return {
      id: `order-${index + 1}`,
      orderId: `TS-${100000 + index}`,
      date: getRandomDate(),
      customer: {
        name: `Customer ${index + 1}`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      },
      product: products[Math.floor(Math.random() * products.length)],
      price: Math.floor(Math.random() * 10000) + 1000,
      city,
      address: `${Math.floor(Math.random() * 100) + 1}, ${city.name}, India`,
      quality,
      tags: randomTags,
      verification: {
        otp: Math.random() > 0.3,
        ivr: Math.random() > 0.5,
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
};

// Static data (would come from API in a real app)
const dummyOrders = generateOrders(50);

const OrdersTable: React.FC<OrdersTableProps> = ({ threshold, filters }) => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [sortField, setSortField] = useState<keyof Order | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  
  // Apply filters
  const filteredOrders = orders.filter(order => {
    // Date range filter
    if (filters.dateRange.from && new Date(order.date) < filters.dateRange.from) return false;
    if (filters.dateRange.to && new Date(order.date) > filters.dateRange.to) return false;
    
    // Threshold filters
    if (filters.onlyBelowThreshold && order.quality >= threshold) return false;
    if (filters.onlyAboveThreshold && order.quality < threshold) return false;
    
    // Order status filter
    if (filters.orderStatus.length > 0 && !filters.orderStatus.includes(order.status)) return false;
    
    // Verification status filter
    if (filters.verificationStatus.length > 0) {
      const orderVerification = [];
      if (order.verification.otp) orderVerification.push('OTP Verified');
      if (order.verification.ivr) orderVerification.push('IVR Verified');
      if (!order.verification.otp && !order.verification.ivr) orderVerification.push('Unverified');
      
      const hasMatchingVerification = filters.verificationStatus.some(status => 
        orderVerification.includes(status)
      );
      
      if (!hasMatchingVerification) return false;
    }
    
    // Tags filter
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => order.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }
    
    return true;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortField) return 0;
    
    let valueA, valueB;
    
    if (sortField === 'quality') {
      valueA = a.quality;
      valueB = b.quality;
    } else if (sortField === 'price') {
      valueA = a.price;
      valueB = b.price;
    } else if (sortField === 'customer') {
      valueA = a.customer.name;
      valueB = b.customer.name;
    } else if (sortField === 'city') {
      valueA = a.city.name;
      valueB = b.city.name;
    } else {
      valueA = (a[sortField] as any);
      valueB = (b[sortField] as any);
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Paginate orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const paginatedOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  
  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-600 bg-green-50';
    if (quality >= 75) return 'text-green-500 bg-green-50';
    if (quality >= 50) return 'text-yellow-500 bg-yellow-50';
    if (quality >= 25) return 'text-orange-500 bg-orange-50';
    return 'text-red-500 bg-red-50';
  };
  
  const getCityTierColor = (tier: string) => {
    if (tier === 'Tier 1') return 'bg-blue-50 text-blue-700';
    if (tier === 'Tier 2') return 'bg-purple-50 text-purple-700';
    return 'bg-gray-50 text-gray-700';
  };
  
  const getStatusColor = (status: string) => {
    if (status === 'Delivered') return 'bg-green-50 text-green-700';
    if (status === 'Shipped') return 'bg-blue-50 text-blue-700';
    if (status === 'Unshipped') return 'bg-gray-50 text-gray-700';
    return 'bg-red-50 text-red-700';
  };
  
  return (
    <div className="glass-card p-0 overflow-hidden animate-scale-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th 
                scope="col" 
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('orderId')}
              >
                <div className="flex items-center">
                  Order ID
                  {sortField === 'orderId' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('customer')}
              >
                <div className="flex items-center">
                  Customer
                  {sortField === 'customer' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                Product
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center">
                  Price
                  {sortField === 'price' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('city')}
              >
                <div className="flex items-center">
                  City
                  {sortField === 'city' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                Verification
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('quality')}
              >
                <div className="flex items-center">
                  Quality
                  {sortField === 'quality' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                Tags
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-right text-sm font-semibold text-slate-900 cursor-pointer pr-4"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center justify-end">
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors duration-200">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900">
                  {order.orderId}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                  {order.date}
                </td>
                <td className="px-3 py-4 text-sm text-slate-500">
                  <div className="font-medium text-slate-900">{order.customer.name}</div>
                  <div className="flex items-center mt-1">
                    <Phone className="h-3 w-3 mr-1 text-slate-400" />
                    {order.customer.phone}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                  {order.product}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-900 font-medium">
                  ₹{order.price.toLocaleString()}
                </td>
                <td className="px-3 py-4 text-sm text-slate-500">
                  <div className="font-medium text-slate-900">
                    {order.city.name}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("mt-1", getCityTierColor(order.city.tier))}
                  >
                    {order.city.tier}
                  </Badge>
                  <div className="flex items-center mt-1 text-xs">
                    <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                    {order.address}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              order.verification.otp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                            )}
                          >
                            {order.verification.otp ? 
                              <Check className="h-3 w-3 mr-1" /> : 
                              <X className="h-3 w-3 mr-1" />
                            }
                            OTP
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{order.verification.otp ? "OTP Verified" : "Not OTP Verified"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              order.verification.ivr ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                            )}
                          >
                            {order.verification.ivr ? 
                              <Check className="h-3 w-3 mr-1" /> : 
                              <X className="h-3 w-3 mr-1" />
                            }
                            IVR
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{order.verification.ivr ? "IVR Verified" : "Not IVR Verified"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className={cn(
                          "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                          getQualityColor(order.quality),
                          order.quality < threshold && "border border-red-300"
                        )}>
                          {order.quality < threshold && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {order.quality}%
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {order.quality < threshold 
                            ? "Below threshold - Not recommended to ship" 
                            : "Above threshold - Recommended to ship"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {order.tags.map((tag, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline"
                        className={cn(
                          "flex items-center",
                          tag === 'Past Fraud' ? "bg-red-50 text-red-700" : 
                          tag === 'Fast Order' ? "bg-green-50 text-green-700" : 
                          "bg-blue-50 text-blue-700"
                        )}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right pr-4">
                  <Badge 
                    variant="outline"
                    className={cn(
                      "flex items-center justify-center",
                      getStatusColor(order.status)
                    )}
                  >
                    <Package className="h-3 w-3 mr-1" />
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
            
            {paginatedOrders.length === 0 && (
              <tr>
                <td colSpan={10} className="px-3 py-8 text-center text-sm text-slate-500">
                  No orders found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {sortedOrders.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={cn(
                "relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700",
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"
              )}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                "relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700",
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"
              )}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastOrder, sortedOrders.length)}
                </span>{' '}
                of <span className="font-medium">{sortedOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    "relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400",
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"
                  )}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + idx;
                  } else {
                    pageNumber = currentPage - 2 + idx;
                  }
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={cn(
                        "relative inline-flex items-center px-4 py-2 text-sm font-medium",
                        currentPage === pageNumber
                          ? "z-10 bg-trackscore-blue text-white focus:z-20"
                          : "text-slate-900 hover:bg-slate-50 focus:z-20"
                      )}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400",
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"
                  )}
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
