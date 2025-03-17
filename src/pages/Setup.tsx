import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckIcon, MoveRight, BarChart4, LayoutDashboard, Settings, Truck, Instagram, Sparkles, Package, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import BusinessComparisonTable from '@/components/Setup/BusinessComparisonTable';
import HowItWorksSlider from '@/components/Setup/HowItWorksSlider';

const stepItems = [
  {
    id: 'business-info',
    title: 'Business Information',
    description: 'Tell us about your business',
    icon: <BarChart4 className="w-5 h-5" />
  },
  {
    id: 'how-it-works',
    title: 'How It Works',
    description: 'See how TrackScore boosts your business',
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Compare business models',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect your essential services',
    icon: <Truck className="w-5 h-5" />
  },
  {
    id: 'platform-tour',
    title: 'Platform Tour',
    description: 'Explore the dashboard and features',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure your preferences',
    icon: <Settings className="w-5 h-5" />
  }
];

const Setup = () => {
  const [activeStep, setActiveStep] = useState('business-info');
  const [businessType, setBusinessType] = useState('');
  const [progress, setProgress] = useState(20);
  const navigate = useNavigate();
  
  const handleNext = () => {
    const currentIndex = stepItems.findIndex(step => step.id === activeStep);
    if (currentIndex < stepItems.length - 1) {
      setActiveStep(stepItems[currentIndex + 1].id);
      setProgress((currentIndex + 2) * 20);
    } else {
      navigate('/dashboard');
    }
  };
  
  const handlePrevious = () => {
    const currentIndex = stepItems.findIndex(step => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(stepItems[currentIndex - 1].id);
      setProgress(currentIndex * 20);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to TrackScore</h1>
        <p className="text-slate-600 mt-2">Let's set up your account to boost your business performance</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {stepItems.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                      activeStep === step.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'
                    }`}
                    onClick={() => {
                      setActiveStep(step.id);
                      setProgress((index + 1) * 20);
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep === step.id ? 'bg-blue-100' : 'bg-slate-100'
                    }`}>
                      {(index + 1) * 20 <= progress ? (
                        <CheckIcon className="w-4 h-4 text-green-600" />
                      ) : (
                        <span className={`text-sm font-medium ${
                          activeStep === step.id ? 'text-blue-700' : 'text-slate-600'
                        }`}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        activeStep === step.id ? 'text-blue-700' : 'text-slate-800'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-slate-500 mb-2">Setup Progress</p>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-3/4">
          <Card className="h-full">
            {activeStep === 'business-info' && (
              <>
                <CardHeader>
                  <CardTitle>Tell us about your business</CardTitle>
                  <CardDescription>This helps us customize the platform for your needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" placeholder="Your business name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <RadioGroup defaultValue={businessType} onValueChange={setBusinessType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ecommerce" id="ecommerce" />
                        <Label htmlFor="ecommerce">E-commerce</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="d2c" id="d2c" />
                        <Label htmlFor="d2c">D2C Brand</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="marketplace" id="marketplace" />
                        <Label htmlFor="marketplace">Marketplace Seller</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="average-orders">Average Monthly Orders</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lt100">Less than 100</SelectItem>
                        <SelectItem value="100-500">100 - 500</SelectItem>
                        <SelectItem value="500-1000">500 - 1,000</SelectItem>
                        <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                        <SelectItem value="gt5000">More than 5,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="business-challenges">What challenges are you facing?</Label>
                    <Textarea id="business-challenges" placeholder="Describe your main business challenges" />
                  </div>
                </CardContent>
              </>
            )}
            
            {activeStep === 'how-it-works' && (
              <>
                <CardHeader>
                  <CardTitle>How TrackScore Works</CardTitle>
                  <CardDescription>See how our platform can transform your business</CardDescription>
                </CardHeader>
                <CardContent>
                  <HowItWorksSlider />
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Expected Results</h3>
                    <p className="text-slate-700 mb-4">
                      By intelligently selecting which orders to fulfill based on delivery probability, 
                      TrackScore helps you achieve:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Lower RTO Rates:</span>
                          <span className="text-slate-600"> Reduce return-to-origin by up to 60%</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Higher Capital Efficiency:</span>
                          <span className="text-slate-600"> Use 30% less inventory to make the same profit</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Better Cash Flow:</span>
                          <span className="text-slate-600"> Free up working capital by shipping fewer, higher-quality orders</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Improved Profits:</span>
                          <span className="text-slate-600"> Increase profits by 20-50% without acquiring new customers</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </>
            )}
            
            {activeStep === 'performance' && (
              <>
                <CardHeader>
                  <CardTitle>Performance Comparison</CardTitle>
                  <CardDescription>See how TrackScore compares to traditional business models</CardDescription>
                </CardHeader>
                <CardContent>
                  <BusinessComparisonTable />
                </CardContent>
              </>
            )}
            
            {activeStep === 'integrations' && (
              <>
                <CardHeader>
                  <CardTitle>Connect Your Services</CardTitle>
                  <CardDescription>Integrate with shipping providers and marketing platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Shipping Providers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Delhivery</div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <p className="text-sm text-slate-500">Integrate with India's largest fulfillment provider</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Shiprocket</div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <p className="text-sm text-slate-500">Connect with multiple couriers in one integration</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Shadowfax</div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <p className="text-sm text-slate-500">Hyperlocal delivery for faster shipping</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Ecom Express</div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <p className="text-sm text-slate-500">Pan-India coverage for e-commerce deliveries</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Marketing Platforms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium flex items-center">
                            <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                            Instagram Ads
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <p className="text-sm text-slate-500">Track performance of your Instagram ad campaigns</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Google Ads</div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <p className="text-sm text-slate-500">Measure ROI from your Google ad spend</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
            
            {activeStep === 'platform-tour' && (
              <>
                <CardHeader>
                  <CardTitle>Explore TrackScore</CardTitle>
                  <CardDescription>Get familiar with our key features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Dashboard</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">
                          View your key metrics at a glance and track how TrackScore is improving your business.
                        </p>
                        <div className="bg-slate-100 h-32 rounded-md flex items-center justify-center">
                          <LayoutDashboard className="h-8 w-8 text-slate-400" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Orders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">
                          See all your orders with quality scores to help you decide which ones to ship.
                        </p>
                        <div className="bg-slate-100 h-32 rounded-md flex items-center justify-center">
                          <Package className="h-8 w-8 text-slate-400" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Business Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">
                          Track the financial impact of using TrackScore on your business.
                        </p>
                        <div className="bg-slate-100 h-32 rounded-md flex items-center justify-center">
                          <BarChart4 className="h-8 w-8 text-slate-400" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Reports</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">
                          Get detailed analytics and insights about your business performance.
                        </p>
                        <div className="bg-slate-100 h-32 rounded-md flex items-center justify-center">
                          <BarChart4 className="h-8 w-8 text-slate-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </>
            )}
            
            {activeStep === 'settings' && (
              <>
                <CardHeader>
                  <CardTitle>Configure Settings</CardTitle>
                  <CardDescription>Customize TrackScore to match your workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Notification Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <div className="flex items-center">
                          <Select defaultValue="daily">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="instant">Instant</SelectItem>
                              <SelectItem value="daily">Daily Digest</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-notifications">SMS Alerts</Label>
                        <div className="flex items-center">
                          <Select defaultValue="critical">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Updates</SelectItem>
                              <SelectItem value="critical">Critical Only</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Team Management</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full sm:w-auto">Invite Team Members</Button>
                      <p className="text-sm text-slate-500">Manage who has access to your TrackScore dashboard</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-sharing">Share Anonymous Data</Label>
                        <div className="flex items-center">
                          <Select defaultValue="yes">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Permission" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">
                        Contribute anonymous data to help improve AI predictions for all users
                      </p>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={activeStep === stepItems[0].id}
              >
                Back
              </Button>
              
              <Button onClick={handleNext}>
                {activeStep === stepItems[stepItems.length - 1].id ? (
                  'Finish Setup'
                ) : (
                  <>
                    Next <MoveRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Setup;
