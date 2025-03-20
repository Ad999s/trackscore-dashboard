
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Youtube, Mail, HelpCircle, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HelpAndSetup = () => {
  const [activeTab, setActiveTab] = useState('setup');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-trackscore-text">Help & Setup</h1>
        <p className="text-slate-500 mt-1">
          Quick guides and resources to help you get the most out of TrackScore
        </p>
      </div>

      <Tabs defaultValue="setup" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Youtube className="h-4 w-4" />
            <span>Setup Guide</span>
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Help Videos</span>
          </TabsTrigger>
          <TabsTrigger value="account-manager" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Account Manager</span>
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Documentation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Setup Guide" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Quick Setup Guide</h3>
              <p className="text-slate-600 mb-4">
                This video walks you through setting up TrackScore for your business. Follow along to get up and running in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  <span>Watch on YouTube</span>
                </Button>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Setup Checklist</CardTitle>
              <CardDescription>Complete these steps to fully configure your TrackScore dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Connect your storefront</h4>
                    <p className="text-sm text-slate-600">Integrate with your e-commerce platform to sync orders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Set your quality threshold</h4>
                    <p className="text-sm text-slate-600">Determine which orders to ship based on quality scores</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Configure notifications</h4>
                    <p className="text-sm text-slate-600">Set up alerts for important events and order status changes</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Go to Setup Wizard</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Dashboard Overview" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Dashboard Overview</h3>
              <p className="text-sm text-slate-600">Learn how to navigate and use the TrackScore dashboard</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Order Management" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Order Management</h3>
              <p className="text-sm text-slate-600">How to efficiently manage orders and use filtering options</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Quality Threshold" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Quality Threshold</h3>
              <p className="text-sm text-slate-600">Understanding and optimizing your quality threshold settings</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Reports and Analytics" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Reports and Analytics</h3>
              <p className="text-sm text-slate-600">How to use TrackScore analytics to improve your business</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="account-manager" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Account Manager</CardTitle>
              <CardDescription>Contact your dedicated account manager for personalized support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
                      alt="Account Manager" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Sophia Rodriguez</h3>
                    <p className="text-slate-600">Senior Account Manager</p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span>sophia.rodriguez@trackscore.ai</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-slate-500" />
                      <span>+1 (555) 123-4567</span>
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Button>Schedule a Call</Button>
                    <Button variant="outline">Send Email</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-xl font-semibold mb-4">Support Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">General Support</h4>
                <div className="space-y-1 text-slate-600">
                  <p>Monday - Friday: 9am - 8pm EST</p>
                  <p>Saturday: 10am - 5pm EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Priority Support</h4>
                <div className="space-y-1 text-slate-600">
                  <p>24/7 Emergency Support</p>
                  <p>Response Time: &lt; 30 minutes</p>
                  <p>Available for Enterprise Plans</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guide</CardTitle>
                <CardDescription>Complete beginner's walkthrough</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Comprehensive guide for new users to start using TrackScore effectively.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Technical reference</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Complete API reference for developers integrating with TrackScore.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View API Docs</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>Optimize your operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Learn the best ways to optimize your workflow with TrackScore.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Best Practices</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-800 mb-1">How does TrackScore calculate quality ratings?</h4>
                <p className="text-slate-600 text-sm">
                  TrackScore uses machine learning algorithms that analyze multiple factors including customer location, order history, payment method, and more to predict delivery success.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-1">Can I integrate TrackScore with my current e-commerce platform?</h4>
                <p className="text-slate-600 text-sm">
                  Yes, TrackScore integrates seamlessly with all major e-commerce platforms including Shopify, WooCommerce, Magento, and custom solutions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-1">How often is the AI model updated?</h4>
                <p className="text-slate-600 text-sm">
                  The TrackScore AI model is continuously learning from your specific business data and is updated weekly with general improvements.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpAndSetup;
