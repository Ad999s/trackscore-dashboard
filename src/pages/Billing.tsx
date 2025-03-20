
import React from 'react';
import { 
  Receipt, 
  CreditCard, 
  CheckCircle2, 
  Smartphone, 
  Wallet,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const Billing = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-2">
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
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">15-day free trial</Badge>
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

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Free trial active</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-500">Trial ends: May 15, 2023</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button variant="outline">Cancel Trial</Button>
              <Button>Continue After Trial</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What's Included</CardTitle>
            <CardDescription>All features available with your plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="font-medium">AI-powered order screening</span>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-6">Identify potential RTO orders</p>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Selective shipping optimizer</span>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-6">Ship only orders that will deliver</p>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Inventory management</span>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-6">Reduce inventory costs by 30%</p>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Business impact reports</span>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-6">Track ROI and performance metrics</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Features
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-md">
                  <CreditCard className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium">HDFC Credit Card</p>
                  <p className="text-sm text-slate-500">**** **** **** 4242 • Expires 09/25</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Add New Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
