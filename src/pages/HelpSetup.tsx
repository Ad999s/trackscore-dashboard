
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, User, Mail, Phone, MessageSquare } from 'lucide-react';

const HelpSetup = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Help & Setup</h1>
        <p className="text-muted-foreground">
          Get started with TrackScore and find resources to help you succeed
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5" />
              Quick Setup Video
            </CardTitle>
            <CardDescription className="text-blue-100">
              Learn how to set up and use TrackScore in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="aspect-video rounded-md overflow-hidden bg-slate-100 mb-4">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Quick Setup Guide" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="shadow-sm"
              ></iframe>
            </div>
            <p className="text-sm text-slate-600">
              This video guide walks you through the complete setup process for TrackScore, 
              helping you understand how to maximize your results and save on shipping costs.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2 bg-gradient-to-r from-purple-600 to-purple-400 text-white">
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Your Account Manager
            </CardTitle>
            <CardDescription className="text-purple-100">
              Dedicated support for your business
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                AM
              </div>
              <div>
                <h3 className="text-lg font-semibold">Your Account Manager</h3>
                <p className="text-sm text-slate-600">Available Mon-Fri, 9am-6pm</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-slate-700">
                <Mail className="h-4 w-4 mr-2 text-purple-500" />
                <span>support@trackscore.com</span>
              </div>
              <div className="flex items-center text-slate-700">
                <Phone className="h-4 w-4 mr-2 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-slate-700">
                <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                <span>Live chat available in dashboard</span>
              </div>
            </div>
            
            <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
              Contact Now
            </button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common questions about TrackScore
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-medium text-slate-900 mb-1">How does TrackScore improve my delivery rates?</h3>
              <p className="text-slate-600 text-sm">
                TrackScore analyzes order data to identify potentially risky orders before they're shipped, 
                helping you focus on customers more likely to accept delivery.
              </p>
            </div>
            <div className="border-b pb-3">
              <h3 className="font-medium text-slate-900 mb-1">What integrations are available?</h3>
              <p className="text-slate-600 text-sm">
                TrackScore integrates with major e-commerce platforms including Shopify, WooCommerce, Magento, 
                and custom APIs. Check the Integrations page for the complete list.
              </p>
            </div>
            <div className="border-b pb-3">
              <h3 className="font-medium text-slate-900 mb-1">How do I adjust my quality threshold?</h3>
              <p className="text-slate-600 text-sm">
                You can adjust your quality threshold on the Dashboard page using the Quality Cutoff slider. 
                The system also recommends optimal thresholds based on your data.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Can I export my data?</h3>
              <p className="text-slate-600 text-sm">
                Yes, you can export data from any report or dashboard in CSV, Excel, or PDF formats 
                using the export button in the top right corner of each section.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSetup;
