
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, ChevronRight, HelpCircle, Info, Map, Package, Settings, Truck, Instagram, Workflow } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 'questions',
    title: 'Business Information',
    description: 'Tell us about your business to customize your experience'
  },
  {
    id: 'tour',
    title: 'Platform Tour',
    description: 'Learn about TrackScore features and how they work'
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect your shipping providers and marketing platforms'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure your account preferences and notifications'
  },
  {
    id: 'animation',
    title: 'How It Works',
    description: 'See how TrackScore improves your business performance'
  }
];

const Setup = () => {
  const [currentStep, setCurrentStep] = useState('questions');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    // Move to next step or redirect to dashboard if completed all
    const currentIndex = steps.findIndex(step => step.id === stepId);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    } else {
      navigate('/dashboard');
    }
  };
  
  const getCompletionPercentage = () => {
    return (completedSteps.length / steps.length) * 100;
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">TrackScore Setup</h1>
        <p className="text-muted-foreground">
          Complete these steps to get the most out of TrackScore
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium">Setup Progress</p>
                <Progress value={getCompletionPercentage()} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">{Math.round(getCompletionPercentage())}% Complete</p>
              </div>
              
              <div className="space-y-1">
                {steps.map((step, index) => (
                  <Button
                    key={step.id}
                    variant={currentStep === step.id ? "default" : "ghost"}
                    className={`w-full justify-start ${completedSteps.includes(step.id) ? 'text-green-600' : ''}`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {completedSteps.includes(step.id) ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <span className="mr-2 h-4 w-4 flex items-center justify-center rounded-full border text-xs">
                        {index + 1}
                      </span>
                    )}
                    {step.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card className="h-full">
            <Tabs value={currentStep} onValueChange={setCurrentStep} className="h-full">
              <TabsContent value="questions" className="m-0 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    Tell us about your business so we can customize your experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">What type of business do you run?</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">E-commerce</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">Service-based</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">SaaS</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">Retail</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">Wholesale</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">Other</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">What's your average monthly revenue?</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">$0 - $10K</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">$10K - $50K</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">$50K - $100K</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">$100K - $500K</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">$500K - $1M</Button>
                        <Button variant="outline" className="h-auto py-4 hover:border-primary">$1M+</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">What are your primary business goals?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button variant="outline" className="h-auto py-4 justify-start hover:border-primary">
                          Increase sales conversion
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start hover:border-primary">
                          Improve customer retention
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start hover:border-primary">
                          Optimize marketing spend
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start hover:border-primary">
                          Reduce operational costs
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleStepComplete('questions')}>
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="tour" className="m-0 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Map className="mr-2 h-5 w-5 text-primary" />
                    Platform Tour
                  </CardTitle>
                  <CardDescription>
                    Learn about TrackScore's features and how they can help your business
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4 hover:border-primary hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Dashboard</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get a complete overview of your business with key metrics, 
                            profit trends, and quality scores at a glance.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:border-primary hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Truck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Order List</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Track all your orders in real-time, filter by status, 
                            and manage customer communications from one place.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:border-primary hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Info className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Reports</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Analyze your business performance with detailed metrics, 
                            charts, and AI-powered insights to drive growth.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:border-primary hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Settings className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Cashflow Impact</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Track how TrackScore improves your cashflow with 
                            detailed comparisons and projections.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleStepComplete('tour')}>
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="integrations" className="m-0 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="mr-2 h-5 w-5 text-primary" />
                    Connect Your Services
                  </CardTitle>
                  <CardDescription>
                    Integrate your shipping providers and marketing platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Shipping Providers</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your shipping providers to track deliveries and optimize your logistics
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Package className="mr-2 h-4 w-4" />
                          FedEx
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Package className="mr-2 h-4 w-4" />
                          UPS
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Package className="mr-2 h-4 w-4" />
                          USPS
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Package className="mr-2 h-4 w-4" />
                          DHL
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Package className="mr-2 h-4 w-4" />
                          ShipStation
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Package className="mr-2 h-4 w-4" />
                          + More
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Marketing Platforms</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your marketing platforms to analyze campaign performance and ROI
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Instagram className="mr-2 h-4 w-4" />
                          Instagram
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Instagram className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Instagram className="mr-2 h-4 w-4" />
                          Google Ads
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Instagram className="mr-2 h-4 w-4" />
                          TikTok
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Instagram className="mr-2 h-4 w-4" />
                          LinkedIn
                        </Button>
                        <Button variant="outline" className="h-auto py-4 justify-start">
                          <Instagram className="mr-2 h-4 w-4" />
                          + More
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleStepComplete('integrations')}>
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="settings" className="m-0 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-primary" />
                    Settings Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your account preferences and notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Account Settings</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-medium">Company Profile</p>
                            <p className="text-sm text-muted-foreground">Update your company information</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-medium">User Management</p>
                            <p className="text-sm text-muted-foreground">Add team members and set permissions</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-medium">Billing Information</p>
                            <p className="text-sm text-muted-foreground">Update payment methods and plans</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Configure email alert settings</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-medium">In-App Notifications</p>
                            <p className="text-sm text-muted-foreground">Configure dashboard alerts</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium">Report Scheduling</p>
                            <p className="text-sm text-muted-foreground">Set up automated report delivery</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleStepComplete('settings')}>
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="animation" className="m-0 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Workflow className="mr-2 h-5 w-5 text-primary" />
                    How TrackScore Works
                  </CardTitle>
                  <CardDescription>
                    See how our platform improves your business performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-8">
                    <div className="relative pb-8 pl-6 border-l border-dashed border-primary/30 animate-fade-in">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <h3 className="font-medium text-lg mb-2">Data Collection</h3>
                      <p className="text-muted-foreground">
                        TrackScore connects to your existing systems and begins collecting 
                        order, shipping, and marketing data in real-time.
                      </p>
                    </div>
                    
                    <div className="relative pb-8 pl-6 border-l border-dashed border-primary/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <h3 className="font-medium text-lg mb-2">Performance Analysis</h3>
                      <p className="text-muted-foreground">
                        Our AI algorithms analyze your business performance across key metrics 
                        and identify areas for improvement.
                      </p>
                    </div>
                    
                    <div className="relative pb-8 pl-6 border-l border-dashed border-primary/30 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <h3 className="font-medium text-lg mb-2">Optimization Suggestions</h3>
                      <p className="text-muted-foreground">
                        TrackScore generates actionable recommendations to optimize your 
                        shipping, marketing, and operational processes.
                      </p>
                    </div>
                    
                    <div className="relative pb-0 pl-6 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <h3 className="font-medium text-lg mb-2">Continuous Improvement</h3>
                      <p className="text-muted-foreground">
                        As you implement our suggestions, TrackScore tracks the improvements 
                        and continues to refine recommendations for optimal results.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleStepComplete('animation')}>
                      Finish Setup <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Setup;
