
import React, { useState } from 'react';
import { 
  Receipt, 
  CreditCard, 
  CheckCircle2, 
  Zap,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Billing = () => {
  const { toast } = useToast();
  const [isActivating, setIsActivating] = useState(false);
  
  // Calculate trial end date (15 days from today)
  const today = new Date();
  const trialEndDate = new Date(today);
  trialEndDate.setDate(today.getDate() + 15);
  const formattedEndDate = trialEndDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Sample impact metrics for the results banner
  const monthlyExtraProfit = 64000;
  const monthlySavedInventory = 240;
  
  const handleActivateTrial = () => {
    setIsActivating(true);
    
    // Simulate activation process
    setTimeout(() => {
      setIsActivating(false);
      toast({
        title: "Free Trial Activated!",
        description: `Your 15-day trial will end on ${formattedEndDate}`,
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Billing</h1>
          <p className="text-slate-500 mt-1">
            Manage your subscription and payment methods
          </p>
        </div>
      </div>

      {/* Results Banner */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center mb-4 lg:mb-0">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900">TrackScore Pro Impact</h3>
                <p className="text-blue-700">Results you can expect with our solution</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-slate-600">Extra Monthly Profit</p>
                <p className="text-2xl font-bold text-green-600">₹{monthlyExtraProfit.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-slate-600">Inventory Saved Monthly</p>
                <p className="text-2xl font-bold text-blue-600">{monthlySavedInventory} units</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-blue-700 italic">
            *Investing ₹6,500/month in TrackScore Pro yields ~₹{monthlyExtraProfit.toLocaleString()} in returns - that's a 10x ROI!
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Free Trial Card */}
        <Card className="border-2 border-blue-100 bg-blue-50/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                15-Day Free Trial
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">No payment required</Badge>
            </div>
            <CardDescription>Experience all TrackScore Pro features without commitment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">If started today</span>
                </div>
                <span className="text-sm font-medium text-slate-700">Ends on: {formattedEndDate}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Full access to TrackScore Pro</p>
                    <p className="text-sm text-slate-500">Try all premium features without limitations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Cancel anytime</p>
                    <p className="text-sm text-slate-500">No obligation, no charges if canceled before trial ends</p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              className={`w-full relative overflow-hidden ${isActivating ? 'bg-blue-400' : ''}`}
              onClick={handleActivateTrial}
              disabled={isActivating}
            >
              {isActivating ? (
                <>
                  <span className="opacity-0">
                    <Zap className="mr-2 h-4 w-4" />
                    Activate 15-Day Trial
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Activating...
                  </span>
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Activate 15-Day Trial
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Current Plan Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the TrackScore Pro plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">TrackScore Pro</h3>
                <p className="text-sm text-slate-500">Fixed monthly price with all features included</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹6,500<span className="text-sm font-normal text-slate-500">/mo</span></div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Dedicated Account Manager</p>
                  <p className="text-sm text-slate-500">support@trackscore.ai | +91 9876543210</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Full RTO Protection</p>
                  <p className="text-sm text-slate-500">Significantly reduce return-to-origin rate</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">PnL Tracker</p>
                  <p className="text-sm text-slate-500">Track your profit and loss with detailed reporting</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">Continue After Trial</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Billing;
