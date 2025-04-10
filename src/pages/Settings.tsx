
import React, { useState, useEffect } from 'react';
import { 
  Pencil, 
  Plus, 
  Trash2, 
  Upload, 
  ShieldCheck, 
  Phone, 
  HelpCircle,
  Info,
  Edit,
  Save,
  DollarSign,
  User,
  Clock,
  Mail,
  Calendar,
  Tag,
  X,
  Package // Added the missing Package icon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define interfaces for our data structures
interface ProductFinancialData {
  id: string;
  name: string;
  mrp: string;
  productCost: string;
  marketingCost: string;
  shippingCost: string;
  packagingCost: string;
  rtoCost: string;
}

const Settings = () => {
  // State for form data
  const [activeTab, setActiveTab] = useState('formula');
  const [otpEnabled, setOtpEnabled] = useState(true);
  const [ivrEnabled, setIvrEnabled] = useState(true);
  const [otpRequired, setOtpRequired] = useState('yes');
  const { toast } = useToast();

  // State for the products financial data
  const [products, setProducts] = useState<ProductFinancialData[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductFinancialData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Financial data state
  const [financialData, setFinancialData] = useState({
    mrp: '1500',
    productCost: '900',
    marketingCost: '200',
    shippingCost: '80',
    packagingCost: '30',
    rtoCost: '120'
  });

  // Initialize products on first render
  useEffect(() => {
    const savedProducts = localStorage.getItem('productFinancialData');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error parsing product financial data:', error);
        // If there's an error parsing, we keep the default values
        initializeDefaultProducts();
      }
    } else {
      // Initialize with default products if none exist
      initializeDefaultProducts();
    }
  }, []);

  // Load financial data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('financialData');
    if (savedData) {
      try {
        setFinancialData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing financial data:', error);
        // If there's an error parsing, we keep the default values
      }
    }
  }, []);

  // Initialize with 10 default products
  const initializeDefaultProducts = () => {
    const defaultProducts: ProductFinancialData[] = Array.from({ length: 10 }, (_, index) => ({
      id: `p${index + 1}`,
      name: `Product ${index + 1}`,
      mrp: (1000 + index * 100).toString(),
      productCost: (600 + index * 50).toString(),
      marketingCost: '200',
      shippingCost: '80',
      packagingCost: '30',
      rtoCost: '120'
    }));

    setProducts(defaultProducts);
    localStorage.setItem('productFinancialData', JSON.stringify(defaultProducts));
  };

  const handleFinancialChange = (field: string, value: string) => {
    const updatedData = {
      ...financialData,
      [field]: value
    };
    setFinancialData(updatedData);
  };

  const saveFinancialData = () => {
    // Save to localStorage
    localStorage.setItem('financialData', JSON.stringify(financialData));
    
    // Dispatch a storage event so other components know the data has changed
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Financial data saved",
      description: "Your financial settings have been updated.",
    });

    // Log the data that would be used throughout the app
    console.log("Financial data saved:", financialData);
  };

  // Function to handle changes to the current product being edited
  const handleProductChange = (field: string, value: string) => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        [field]: value
      });
    }
  };

  // Function to open dialog with product data
  const openProductDialog = (product: ProductFinancialData) => {
    setCurrentProduct(product);
    setDialogOpen(true);
  };

  // Function to save the product changes
  const saveProductChanges = () => {
    if (currentProduct) {
      const updatedProducts = products.map(product => 
        product.id === currentProduct.id ? currentProduct : product
      );
      
      setProducts(updatedProducts);
      localStorage.setItem('productFinancialData', JSON.stringify(updatedProducts));
      
      toast({
        title: "Product updated",
        description: `Financial data for ${currentProduct.name} has been updated.`,
      });
      
      setDialogOpen(false);
    }
  };

  // Calculate profit and loss for the current product
  const calculateProductMetrics = (product: ProductFinancialData) => {
    const mrp = parseFloat(product.mrp);
    const productCost = parseFloat(product.productCost);
    const marketingCost = parseFloat(product.marketingCost);
    const shippingCost = parseFloat(product.shippingCost);
    const packagingCost = parseFloat(product.packagingCost);
    const rtoCost = parseFloat(product.rtoCost);

    const perSuccessfulOrderProfit = mrp - productCost - marketingCost - shippingCost - packagingCost;
    const perFailedOrderLoss = shippingCost + rtoCost + packagingCost + marketingCost;

    return {
      perSuccessfulOrderProfit,
      perFailedOrderLoss
    };
  };
  
  // Sample data
  const productData = [
    { id: 'p1', name: 'Product 1', price: 1200, mrp: 1500, shipping: 50, cpp: 900, inventory: 50, worth: 50000 },
    { id: 'p2', name: 'Product 2', price: 890, mrp: 999, shipping: 0, cpp: 700, inventory: 35, worth: 31500 },
  ];
  
  const remittanceData = [
    { type: 'COD', days: 'D+5', holiday: 'Yes' },
    { type: 'Prepaid', days: 'T+2', holiday: 'No' },
  ];

  // Account manager data
  const accountManager = {
    name: "Priya Sharma",
    email: "priya@trackscore.ai",
    phone: "+91 9876543210",
    workingHours: "Mon-Fri, 9:00 AM - 6:00 PM IST",
    timeZone: "India Standard Time (IST)",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'account-manager':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Dedicated Account Manager</CardTitle>
                <CardDescription>Contact details and availability of your personal account manager</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24 border-2 border-blue-100">
                      <AvatarImage src={accountManager.profileImage} alt={accountManager.name} />
                      <AvatarFallback className="text-xl">{accountManager.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{accountManager.name}</h3>
                      <p className="text-sm text-slate-500">Dedicated Customer Success Manager</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-500" />
                          <span className="text-sm font-medium">{accountManager.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-slate-500" />
                          <span className="text-sm font-medium">{accountManager.email}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span className="text-sm font-medium">{accountManager.workingHours}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-500" />
                          <span className="text-sm font-medium">{accountManager.timeZone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Support Options</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Email: Responses within 4 business hours</li>
                          <li>• Phone: Available during working hours</li>
                          <li>• Emergency: 24/7 support for critical issues via support@trackscore.ai</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button>
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'formula':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add / Modify / Delete Formula</CardTitle>
                <CardDescription>Manage formulas for pricing and calculations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Add</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Modify</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-3 text-sm">Profit Margin</td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Delivery Fee</td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Formula
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Add Prices</CardTitle>
                <CardDescription>Manage product pricing details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">MRP</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Shipping Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">CPP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {productData.map((product) => (
                        <tr key={product.id}>
                          <td className="px-4 py-3 text-sm">{product.name}</td>
                          <td className="px-4 py-3 text-sm">₹{product.price}</td>
                          <td className="px-4 py-3 text-sm">₹{product.mrp}</td>
                          <td className="px-4 py-3 text-sm">₹{product.shipping}</td>
                          <td className="px-4 py-3 text-sm">₹{product.cpp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'inventory':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>Track your product inventory and values</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Inventory</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Worth</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {productData.map((product) => (
                        <tr key={product.id}>
                          <td className="px-4 py-3 text-sm">{product.name}</td>
                          <td className="px-4 py-3 text-sm">{product.inventory}</td>
                          <td className="px-4 py-3 text-sm">₹{product.worth}</td>
                          <td className="px-4 py-3 text-sm">
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex space-x-3 mt-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Inventory
                  </Button>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'remittance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Remittance / Settlement</CardTitle>
                <CardDescription>Configure payment settlement timelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Day</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Holiday</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                          <div className="flex items-center">
                            <span>Info</span>
                            <HelpCircle className="ml-1 h-4 w-4 text-slate-400" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {remittanceData.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm">{item.type}</td>
                          <td className="px-4 py-3 text-sm">{item.days}</td>
                          <td className="px-4 py-3 text-sm">{item.holiday}</td>
                          <td className="px-4 py-3 text-sm">
                            <Button variant="ghost" size="sm">
                              <Info className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Type
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'rules':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manual Rules</CardTitle>
                <CardDescription>Configure order processing rules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">OTP</h3>
                        <p className="text-sm text-slate-500">Enable OTP verification for orders</p>
                      </div>
                      <Switch checked={otpEnabled} onCheckedChange={setOtpEnabled} />
                    </div>
                    
                    {otpEnabled && (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="mb-4">
                          <Label className="mb-2 block">OTP Required</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="otp-yes" 
                                checked={otpRequired === 'yes'} 
                                onCheckedChange={() => setOtpRequired('yes')} 
                              />
                              <label htmlFor="otp-yes" className="text-sm">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="otp-no" 
                                checked={otpRequired === 'no'} 
                                onCheckedChange={() => setOtpRequired('no')} 
                              />
                              <label htmlFor="otp-no" className="text-sm">No</label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="mb-2 block">Method</Label>
                          <Select defaultValue="accept">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="accept">Accept</SelectItem>
                              <SelectItem value="reject">Reject</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">IVR Call</h3>
                        <p className="text-sm text-slate-500">Enable IVR call for order confirmation</p>
                      </div>
                      <Switch checked={ivrEnabled} onCheckedChange={setIvrEnabled} />
                    </div>
                    
                    {ivrEnabled && (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="mb-4">
                          <Label className="mb-2 block">Message Template</Label>
                          <Input 
                            defaultValue="Sir, your order {{order-ID}} of price {{MRP}} has been booked." 
                            className="mb-3"
                          />
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Template
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'upload':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Upload</CardTitle>
                <CardDescription>Upload data in bulk for multiple records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="block">City</Label>
                    <div className="flex gap-2">
                      <Input type="file" />
                      <Button>Upload</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="block">Tax</Label>
                    <div className="flex gap-2">
                      <Input type="file" />
                      <Button>Upload</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="block">Pincode</Label>
                    <div className="flex gap-2">
                      <Input type="file" />
                      <Button>Upload</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="block">Number</Label>
                    <div className="flex gap-2">
                      <Input type="file" />
                      <Button>Upload</Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-md font-medium mb-3">Download Templates</h3>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      City Template
                    </Button>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Tax Template
                    </Button>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Pincode Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'financial':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Settings</CardTitle>
                <CardDescription>Configure product costs and pricing parameters used across the application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">MRP (₹)</Label>
                      <Input 
                        type="number" 
                        value={financialData.mrp} 
                        onChange={(e) => handleFinancialChange('mrp', e.target.value)}
                        placeholder="Enter product MRP"
                      />
                      <p className="text-xs text-slate-500 mt-1">Maximum retail price of your product</p>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Product Cost (₹)</Label>
                      <Input 
                        type="number" 
                        value={financialData.productCost} 
                        onChange={(e) => handleFinancialChange('productCost', e.target.value)}
                        placeholder="Enter product cost"
                      />
                      <p className="text-xs text-slate-500 mt-1">Cost of purchasing/manufacturing the product</p>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Marketing Cost Per Purchase (₹)</Label>
                      <Input 
                        type="number" 
                        value={financialData.marketingCost} 
                        onChange={(e) => handleFinancialChange('marketingCost', e.target.value)}
                        placeholder="Enter marketing cost"
                      />
                      <p className="text-xs text-slate-500 mt-1">Average marketing spend per order</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Shipping Cost (₹)</Label>
                      <Input 
                        type="number" 
                        value={financialData.shippingCost} 
                        onChange={(e) => handleFinancialChange('shippingCost', e.target.value)}
                        placeholder="Enter shipping cost"
                      />
                      <p className="text-xs text-slate-500 mt-1">Forward shipping cost per order</p>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Packaging Cost (₹)</Label>
                      <Input 
                        type="number" 
                        value={financialData.packagingCost} 
                        onChange={(e) => handleFinancialChange('packagingCost', e.target.value)}
                        placeholder="Enter packaging cost"
                      />
                      <p className="text-xs text-slate-500 mt-1">Cost of packaging materials per order</p>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">RTO Cost (₹)</Label>
                      <Input 
                        type="number" 
                        value={financialData.rtoCost} 
                        onChange={(e) => handleFinancialChange('rtoCost', e.target.value)}
                        placeholder="Enter RTO cost"
                      />
                      <p className="text-xs text-slate-500 mt-1">Return to origin cost for failed deliveries</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Profit Calculation Formula</h3>
                  <p className="text-sm text-slate-600 whitespace-pre-line mb-4">
                    Net Profit = Orders Delivered × (MRP - Product Cost - Marketing Cost - Shipping Cost - Packaging Cost)
                    - Orders Not Delivered × (Shipping Cost + RTO Cost + Packaging Cost + Marketing Cost)
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-700 mb-1">Per Successful Order Profit</div>
                      <div className="text-xl font-bold text-green-800">
                        ₹{(
                          parseFloat(financialData.mrp) - 
                          parseFloat(financialData.productCost) - 
                          parseFloat(financialData.marketingCost) - 
                          parseFloat(financialData.shippingCost) - 
                          parseFloat(financialData.packagingCost)
                        ).toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-700 mb-1">Per Failed Order Loss</div>
                      <div className="text-xl font-bold text-red-800">
                        ₹{(
                          parseFloat(financialData.shippingCost) + 
                          parseFloat(financialData.rtoCost) + 
                          parseFloat(financialData.packagingCost) + 
                          parseFloat(financialData.marketingCost)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button onClick={saveFinancialData} className="mt-6">
                  <Save className="mr-2 h-4 w-4" />
                  Save Financial Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Financial Details</CardTitle>
                <CardDescription>Individual financial settings for each product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">MRP (₹)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Product Cost (₹)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Shipping (₹)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Marketing (₹)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products.map((product) => {
                        const metrics = calculateProductMetrics(product);
                        return (
                          <tr key={product.id} 
                            className="hover:bg-slate-50 cursor-pointer"
                            onClick={() => openProductDialog(product)}
                          >
                            <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                            <td className="px-4 py-3 text-sm">₹{product.mrp}</td>
                            <td className="px-4 py-3 text-sm">₹{product.productCost}</td>
                            <td className="px-4 py-3 text-sm">₹{product.shippingCost}</td>
                            <td className="px-4 py-3 text-sm">₹{product.marketingCost}</td>
                            <td className="px-4 py-3 text-sm">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openProductDialog(product);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Settings</h1>
          <p className="text-slate-500 mt-1">
            Configure your application settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'account-manager' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('account-manager')}
                >
                  <User className="mr-3 h-5 w-5" />
                  Account Manager
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'formula' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('formula')}
                >
                  <Pencil className="mr-3 h-5 w-5" />
                  Formula
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'inventory' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('inventory')}
                >
                  <Package className="mr-3 h-5 w-5" />
                  Inventory
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'remittance' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('remittance')}
                >
                  <DollarSign className="mr-3 h-5 w-5" />
                  Remittance
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'rules' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('rules')}
                >
                  <ShieldCheck className="mr-3 h-5 w-5" />
                  Rules
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'upload' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('upload')}
                >
                  <Upload className="mr-3 h-5 w-5" />
                  Upload
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'financial' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('financial')}
                >
                  <DollarSign className="mr-3 h-5 w-5" />
                  Financial
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>

      {/* Product Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product Financial Details</DialogTitle>
            <DialogDescription>
              Update the financial parameters for {currentProduct?.name}
            </DialogDescription>
          </DialogHeader>
          
          {currentProduct && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mrp">MRP (₹)</Label>
                    <Input
                      id="mrp"
                      type="number"
                      value={currentProduct.mrp}
                      onChange={(e) => handleProductChange('mrp', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Maximum retail price</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="productCost">Product Cost (₹)</Label>
                    <Input
                      id="productCost"
                      type="number"
                      value={currentProduct.productCost}
                      onChange={(e) => handleProductChange('productCost', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Cost to produce/purchase</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="marketingCost">Marketing Cost (₹)</Label>
                    <Input
                      id="marketingCost"
                      type="number"
                      value={currentProduct.marketingCost}
                      onChange={(e) => handleProductChange('marketingCost', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Advertising cost per order</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shippingCost">Shipping Cost (₹)</Label>
                    <Input
                      id="shippingCost"
                      type="number"
                      value={currentProduct.shippingCost}
                      onChange={(e) => handleProductChange('shippingCost', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Forward shipping cost</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="packagingCost">Packaging Cost (₹)</Label>
                    <Input
                      id="packagingCost"
                      type="number"
                      value={currentProduct.packagingCost}
                      onChange={(e) => handleProductChange('packagingCost', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Cost of packaging materials</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="rtoCost">RTO Cost (₹)</Label>
                    <Input
                      id="rtoCost"
                      type="number"
                      value={currentProduct.rtoCost}
                      onChange={(e) => handleProductChange('rtoCost', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Return shipping cost</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg mt-2">
                <h3 className="text-lg font-medium mb-2">Product Performance Metrics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-700 mb-1">Per Successful Order Profit</div>
                    <div className="text-xl font-bold text-green-800">
                      ₹{(
                        parseFloat(currentProduct.mrp) - 
                        parseFloat(currentProduct.productCost) - 
                        parseFloat(currentProduct.marketingCost) - 
                        parseFloat(currentProduct.shippingCost) - 
                        parseFloat(currentProduct.packagingCost)
                      ).toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-700 mb-1">Per Failed Order Loss</div>
                    <div className="text-xl font-bold text-red-800">
                      ₹{(
                        parseFloat(currentProduct.shippingCost) + 
                        parseFloat(currentProduct.rtoCost) + 
                        parseFloat(currentProduct.packagingCost) + 
                        parseFloat(currentProduct.marketingCost)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveProductChanges}>
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
