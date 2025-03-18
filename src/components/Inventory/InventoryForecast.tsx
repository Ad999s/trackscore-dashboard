
import React, { useState } from 'react';
import { 
  Bell, Search, Calendar, Boxes, RotateCcw,
  AlertTriangle, TrendingDown, Package, ShoppingBag, Box,
  Clock, ListOrdered, ArrowDown
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormDescription,
  FormField, 
  FormItem, 
  FormLabel
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

import { Product, InventoryAlert } from '@/types/inventory';

// Mock data for demonstration
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'T-Shirts',
    icon: 'Shirt',
    totalQuantity: 250,
    daysRemaining: 15,
    salesPercentage: 35,
    isWinningProduct: true,
    dailyShipments: 16.7,
    minimumOrderQuantity: 300,
    leadTimeInDays: 21,
    variants: [
      { id: '101', color: 'Red', size: 'S', sku: 'TS-RED-S', quantity: 50, daysRemaining: 10, dailyShipments: 5 },
      { id: '102', color: 'Red', size: 'M', sku: 'TS-RED-M', quantity: 75, daysRemaining: 15, dailyShipments: 5 },
      { id: '103', color: 'Blue', size: 'L', sku: 'TS-BLUE-L', quantity: 125, daysRemaining: 20, dailyShipments: 6.7 }
    ]
  },
  {
    id: '2',
    name: 'Jackets',
    icon: 'Package',
    totalQuantity: 120,
    daysRemaining: 30,
    salesPercentage: 25,
    dailyShipments: 4,
    minimumOrderQuantity: 150,
    leadTimeInDays: 35,
    variants: [
      { id: '201', color: 'Black', size: 'M', sku: 'JK-BLK-M', quantity: 45, daysRemaining: 25, dailyShipments: 1.8 },
      { id: '202', color: 'Black', size: 'L', sku: 'JK-BLK-L', quantity: 75, daysRemaining: 35, dailyShipments: 2.2 }
    ]
  },
  {
    id: '3',
    name: 'Shoes',
    icon: 'ShoppingBag',
    totalQuantity: 85,
    daysRemaining: 7,
    salesPercentage: 22,
    dailyShipments: 12,
    minimumOrderQuantity: 200,
    leadTimeInDays: 28,
    variants: [
      { id: '301', color: 'White', size: '9', sku: 'SH-WHT-9', quantity: 30, daysRemaining: 5, dailyShipments: 6 },
      { id: '302', color: 'White', size: '10', sku: 'SH-WHT-10', quantity: 35, daysRemaining: 7, dailyShipments: 5 },
      { id: '303', color: 'Black', size: '9', sku: 'SH-BLK-9', quantity: 20, daysRemaining: 10, dailyShipments: 2 }
    ]
  },
  {
    id: '4',
    name: 'Accessories',
    icon: 'Box',
    totalQuantity: 300,
    daysRemaining: 45,
    salesPercentage: 18,
    dailyShipments: 6.7,
    minimumOrderQuantity: 250,
    leadTimeInDays: 14,
    variants: [
      { id: '401', sku: 'ACC-BELT-S', quantity: 100, daysRemaining: 40, dailyShipments: 2.5 },
      { id: '402', sku: 'ACC-BELT-M', quantity: 200, daysRemaining: 50, dailyShipments: 4.2 }
    ]
  }
];

const MOCK_ALERTS: InventoryAlert[] = [
  {
    id: '1',
    productId: '3',
    daysThreshold: 5,
    notificationType: 'email',
    isActive: true
  },
  {
    id: '2',
    productId: '1',
    daysThreshold: 10,
    notificationType: 'app',
    isActive: true
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Shirt': return <Package className="h-4 w-4" />;
    case 'Package': return <Package className="h-4 w-4" />;
    case 'ShoppingBag': return <ShoppingBag className="h-4 w-4" />;
    case 'Box': return <Box className="h-4 w-4" />;
    default: return <Box className="h-4 w-4" />;
  }
};

type AlertFormValues = {
  productId: string;
  daysThreshold: number;
  notificationType: 'email' | 'sms' | 'app';
};

const InventoryForecast = () => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [alerts, setAlerts] = useState<InventoryAlert[]>(MOCK_ALERTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [daysFilter, setDaysFilter] = useState<number>(15);
  const [isAddingAlert, setIsAddingAlert] = useState(false);
  
  const form = useForm<AlertFormValues>({
    defaultValues: {
      productId: '',
      daysThreshold: 5,
      notificationType: 'app'
    }
  });

  // Filter products based on search query and days remaining threshold
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.daysRemaining <= daysFilter
    )
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  const handleAddAlert = (data: AlertFormValues) => {
    const newAlert: InventoryAlert = {
      id: `alert-${Date.now()}`,
      productId: data.productId,
      daysThreshold: data.daysThreshold,
      notificationType: data.notificationType,
      isActive: true
    };
    
    setAlerts([...alerts, newAlert]);
    setIsAddingAlert(false);
    form.reset();
  };

  const handleRemoveAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const getNotificationTypeLabel = (type: 'email' | 'sms' | 'app') => {
    switch(type) {
      case 'email': return 'Email Notification';
      case 'sms': return 'SMS Alert';
      case 'app': return 'In-App Alert';
    }
  };

  const calculateReorderNeeds = (product: Product) => {
    if (!product.minimumOrderQuantity || !product.leadTimeInDays) return null;
    
    // If days remaining is less than lead time + buffer (7 days), suggest reordering
    const bufferDays = 7;
    const shouldReorder = product.daysRemaining < (product.leadTimeInDays + bufferDays);
    
    if (shouldReorder) {
      return {
        quantity: product.minimumOrderQuantity,
        urgent: product.daysRemaining < product.leadTimeInDays
      };
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Get notified when inventory is running low</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.length === 0 ? (
                <p className="text-sm text-slate-500 py-2">No alerts configured yet</p>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                    <div>
                      <p className="font-medium">{getProductName(alert.productId)}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-slate-500">Alert when &lt; {alert.daysThreshold} days</span>
                        <span className="mx-2 h-1 w-1 bg-slate-300 rounded-full"></span>
                        <span className="text-xs text-slate-500">{getNotificationTypeLabel(alert.notificationType)}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500"
                      onClick={() => handleRemoveAlert(alert.id)}
                    >
                      &times;
                    </Button>
                  </div>
                ))
              )}
              
              <Button 
                variant="outline" 
                className="w-full mt-4 gap-2"
                onClick={() => setIsAddingAlert(true)}
              >
                <Bell className="h-4 w-4" />
                Configure New Alert
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Inventory Forecast
            </CardTitle>
            <CardDescription>See which products will need restocking soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Label className="text-sm whitespace-nowrap">Show products with less than</Label>
                  <div className="flex-1 flex items-center gap-2">
                    <Slider
                      value={[daysFilter]}
                      min={1}
                      max={60}
                      step={1}
                      onValueChange={(value) => setDaysFilter(value[0])}
                      className="w-[120px]"
                    />
                    <span className="text-sm font-medium min-w-[60px]">{daysFilter} days</span>
                  </div>
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="py-10 text-center">
                  <Boxes className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No products match your criteria</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => {
                      setSearchQuery('');
                      setDaysFilter(30);
                    }}
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" />
                    Reset filters
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Product
                          <ArrowDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </TableHead>
                      <TableHead>Inventory</TableHead>
                      <TableHead>Daily Usage</TableHead>
                      <TableHead>Forecast</TableHead>
                      <TableHead>Reorder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map(product => {
                      const reorderNeeds = calculateReorderNeeds(product);
                      
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">
                                {getIconComponent(product.icon)}
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-slate-500">{product.variants.length} variants</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">{product.totalQuantity} items</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-purple-500" />
                              <p className="font-medium">{product.dailyShipments?.toFixed(1)}/day</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className={`font-medium ${product.daysRemaining < 10 ? 'text-amber-600' : 'text-green-600'}`}>
                              {product.daysRemaining} days left
                            </p>
                          </TableCell>
                          <TableCell>
                            {reorderNeeds ? (
                              <div className="flex flex-col gap-1">
                                <Badge variant={reorderNeeds.urgent ? "destructive" : "outline"} className="whitespace-nowrap flex items-center gap-1">
                                  <ListOrdered className="h-3 w-3" />
                                  Order {reorderNeeds.quantity} units
                                </Badge>
                                {reorderNeeds.urgent && (
                                  <p className="text-xs text-red-500">Urgent: Lead time {product.leadTimeInDays} days</p>
                                )}
                              </div>
                            ) : (
                              product.daysRemaining <= 5 ? (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                  Critical
                                </span>
                              ) : product.daysRemaining <= 10 ? (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                                  Low
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  Healthy
                                </span>
                              )
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Alert Configuration Dialog */}
      <Dialog open={isAddingAlert} onOpenChange={setIsAddingAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Inventory Alert</DialogTitle>
            <DialogDescription>
              Get notified when product inventory falls below a threshold.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddAlert)} className="space-y-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="daysThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days Threshold</FormLabel>
                    <FormDescription>
                      Alert when inventory falls below this many days
                    </FormDescription>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[field.value]}
                          min={1}
                          max={30}
                          step={1}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="flex-1"
                        />
                        <span className="font-medium min-w-[40px]">{field.value} days</span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notificationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="app">In-App</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="outline" type="button">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Alert</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryForecast;
