
import React, { useState } from 'react';
import { 
  Pencil, 
  Plus, 
  Trash2, 
  Upload, 
  ShieldCheck, 
  Phone, 
  HelpCircle,
  Info,
  Edit
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings = () => {
  // State for form data
  const [activeTab, setActiveTab] = useState('formula');
  const [otpEnabled, setOtpEnabled] = useState(true);
  const [ivrEnabled, setIvrEnabled] = useState(true);
  const [otpRequired, setOtpRequired] = useState('yes');
  
  // Sample data
  const productData = [
    { id: 'p1', name: 'Product 1', price: 1200, mrp: 1500, shipping: 50, cpp: 900, inventory: 50, worth: 50000 },
    { id: 'p2', name: 'Product 2', price: 890, mrp: 999, shipping: 0, cpp: 700, inventory: 35, worth: 31500 },
  ];
  
  const remittanceData = [
    { type: 'COD', days: 'D+5', holiday: 'Yes' },
    { type: 'Prepaid', days: 'T+2', holiday: 'No' },
  ];
  
  const renderTabContent = () => {
    switch(activeTab) {
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
                    activeTab === 'formula' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('formula')}
                >
                  Edit Formula & Prices
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'inventory' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('inventory')}
                >
                  Inventory
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'remittance' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('remittance')}
                >
                  Remittance / Settlement
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'rules' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('rules')}
                >
                  Manual Rules
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'upload' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('upload')}
                >
                  Bulk Upload
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
