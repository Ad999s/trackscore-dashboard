import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Sparkles, TrendingUp, Package, BarChart3, CheckIcon } from "lucide-react";

const WhatIsTrackScore = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">What is TrackScore?</h1>
          <p className="text-lg text-slate-600">
            TrackScore is an AI-powered RTO management platform that doesn't just identify risks — it helps you solve them.
          </p>
        </div>

        <Tabs defaultValue="smart-order" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-transparent p-0 space-x-4">
            <TabsTrigger 
              value="smart-order" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 px-4 py-2"
            >
              Smart Order Selection
            </TabsTrigger>
            <TabsTrigger 
              value="versus" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 px-4 py-2"
            >
              TrackScore vs. Others
            </TabsTrigger>
            <TabsTrigger 
              value="benefits" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 px-4 py-2"
            >
              Key Benefits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="smart-order" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BrainCircuit className="h-6 w-6 text-purple-500" />
                  Smart Order Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-lg">
                    Unlike other RTO tools that simply tell you about risk, TrackScore provides actionable solutions.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-semibold mb-4 text-slate-800">How We're Different</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span>We help you <strong>daily eliminate high RTO orders</strong></span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span>We suggest <strong>marketing-level changes</strong> to avoid RTO orders</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span>We <strong>gradually improve customer quality</strong> over time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span>We provide <strong>actionable steps</strong>, not just risk labels</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-semibold mb-4 text-slate-800">Our Approach</h3>
                      <p className="mb-4">TrackScore uses advanced AI to:</p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">•</span>
                          <span>Analyze order patterns and customer behavior</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">•</span>
                          <span>Predict which orders are likely to be returned</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">•</span>
                          <span>Recommend which orders to fulfill for maximum profit</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">•</span>
                          <span>Suggest specific changes to your marketing strategy</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versus" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  TrackScore vs. Other RTO Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Other RTO Tools */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">Other RTO Tools</h3>
                    
                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                      <h4 className="font-medium text-lg mb-4">Day 1</h4>
                      <div className="flex justify-between mb-4">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-medium">Low Risk</div>
                        <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm font-medium">Medium Risk</div>
                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium">High Risk</div>
                      </div>
                      <p className="text-slate-600">
                        Only shows basic risk categories without actionable guidance
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                      <h4 className="font-medium text-lg mb-4">Day 100</h4>
                      <div className="flex justify-between mb-4">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-medium">Low Risk</div>
                        <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm font-medium">Medium Risk</div>
                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium">High Risk</div>
                      </div>
                      <div className="space-y-2 text-slate-600">
                        <p>• Same quality of audience</p>
                        <p>• No improvement in delivery rates</p>
                        <p>• No actionable steps provided</p>
                        <p>• Still dealing with the same RTO issues</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* TrackScore */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">TrackScore</h3>
                    
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <h4 className="font-medium text-lg mb-4">Day 1</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-slate-800">Instant boost in net profit</span>
                        </div>
                        <div className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-slate-800">Improved delivery percentage</span>
                        </div>
                        <div className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-slate-800">Better inventory utilization</span>
                        </div>
                      </div>
                      <p className="text-blue-700">
                        Immediate value from day one with actionable insights
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <h4 className="font-medium text-lg mb-4">Day 100</h4>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
                          <div>
                            <span className="font-medium">95%+ delivery rate</span>
                            <p className="text-sm text-slate-600">Significantly reduced RTO</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
                          <div>
                            <span className="font-medium">25%+ healthy margins</span>
                            <p className="text-sm text-slate-600">Improved profitability</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
                          <div>
                            <span className="font-medium">High capital efficiency</span>
                            <p className="text-sm text-slate-600">Better use of inventory and resources</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
                          <div>
                            <span className="font-medium">Better customer quality</span>
                            <p className="text-sm text-slate-600">Due to targeted marketing changes</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-blue-700">
                        Continuous improvement with long-term business transformation
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-indigo-500" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <BarChart3 className="h-8 w-8 text-blue-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Increased Profitability</h3>
                    <p className="text-slate-600">
                      Boost your profits by 20-50% without acquiring new customers by focusing on orders with higher delivery probability.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <Package className="h-8 w-8 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Reduced RTOs</h3>
                    <p className="text-slate-600">
                      Cut your return-to-origin rates by up to 60%, saving on logistics costs and improving customer satisfaction.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <TrendingUp className="h-8 w-8 text-purple-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Better Capital Efficiency</h3>
                    <p className="text-slate-600">
                      Use 30% less inventory to make the same profit, freeing up working capital for other business needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WhatIsTrackScore;
