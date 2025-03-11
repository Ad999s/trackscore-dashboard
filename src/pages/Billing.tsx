
import React from 'react';
import { 
  Receipt, 
  CreditCard, 
  CheckCircle2, 
  Smartphone, 
  Wallet,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
            <CardDescription>You are currently on the Performance plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Performance Pro</h3>
                <p className="text-sm text-slate-500">Billed monthly based on performance</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹2,499<span className="text-sm font-normal text-slate-500">/mo</span></div>
                <p className="text-sm text-green-600">+ performance bonuses</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Pay only for what delivers results</p>
                  <p className="text-sm text-slate-500">Additional fees only apply when we boost your performance</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Real-time performance tracking</p>
                  <p className="text-sm text-slate-500">Monitor how our services directly impact your bottom line</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">AI-powered recommendations</p>
                  <p className="text-sm text-slate-500">Get actionable insights to maximize your ROI</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Active subscription</span>
              </div>
              <span className="text-sm text-slate-500">Next billing: May 15, 2023</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button variant="outline">Upgrade Plan</Button>
              <Button variant="destructive">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>How we calculate your bill</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Delivered Orders</span>
                  <span className="font-medium">₹5/order</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Current: 244 orders</span>
                  <span>₹1,220</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Profit Increase</span>
                  <span className="font-medium">2% fee</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>+₹64,500 this month</span>
                  <span>₹1,290</span>
                </div>
              </div>
              
              <div className="p-3 border border-blue-200 bg-blue-50 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-blue-800">Estimated Total</span>
                  <span className="font-medium text-blue-800">₹2,510</span>
                </div>
                <div className="text-xs text-blue-600">
                  Base fee (₹2,499) + performance bonuses
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View Detailed Breakdown
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
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-md">
                  <Wallet className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium">UPI</p>
                  <p className="text-sm text-slate-500">user@okicici</p>
                </div>
              </div>
              <div className="flex items-center">
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
      
      <Card>
        <CardHeader>
          <CardTitle>Billing Preferences</CardTitle>
          <CardDescription>Manage your billing settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="automatic-payments" className="text-base font-medium">Automatic Payments</Label>
                <p className="text-sm text-slate-500">Enable automatic billing when due</p>
              </div>
              <Switch id="automatic-payments" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-receipts" className="text-base font-medium">Email Receipts</Label>
                <p className="text-sm text-slate-500">Send receipts to your email</p>
              </div>
              <Switch id="email-receipts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="payment-reminders" className="text-base font-medium">Payment Reminders</Label>
                <p className="text-sm text-slate-500">Get notified before your next payment</p>
              </div>
              <Switch id="payment-reminders" defaultChecked />
            </div>
            
            <div className="border-t pt-6">
              <Button variant="outline" className="w-full">
                <Receipt className="h-4 w-4 mr-2" />
                Download Invoice History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
