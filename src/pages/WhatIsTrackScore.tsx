
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, X, Check, TrendingUp, BarChart, PieChart, FileText } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const WhatIsTrackScore = () => {
  // Sample data for the cashflow chart
  const cashflowData = [
    { day: 1, all: -10000, withTrackScore: -5000 },
    { day: 5, all: -90000, withTrackScore: -70000 },
    { day: 10, all: -170000, withTrackScore: -120000 },
    { day: 12, all: -180000, withTrackScore: -100000 },
    { day: 15, all: -120000, withTrackScore: 20000 },
    { day: 18, all: 80000, withTrackScore: 160000 },
    { day: 20, all: 100000, withTrackScore: 220000 },
    { day: 22, all: 140000, withTrackScore: 230000 },
    { day: 23, all: 120000, withTrackScore: 200000 },
    { day: 25, all: 220000, withTrackScore: 360000 },
    { day: 27, all: 330000, withTrackScore: 450000 },
    { day: 28, all: 320000, withTrackScore: 440000 },
    { day: 29, all: 280000, withTrackScore: 470000 },
    { day: 30, all: 280000, withTrackScore: 440000 },
    { day: 32, all: 450000, withTrackScore: 620000 },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">What is TrackScore?</h1>
          <p className="text-lg text-slate-600">
            TrackScore is an AI-powered RTO management platform that doesn't just identify risks — it helps you solve them.
          </p>
        </div>

        <Tabs defaultValue="smart-order-selection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="smart-order-selection">Smart Order Selection</TabsTrigger>
            <TabsTrigger value="precise-cashflow">Precise Cashflow Tracking</TabsTrigger>
            <TabsTrigger value="smart-business-reports">Smart Business Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="smart-order-selection" className="space-y-4">
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
                    Other RTO tools tell you about the risk, and we solve it. We help you daily eliminate high RTO orders and tell changes needed in marketing level to avoid RTO orders and gradually improve customer quality.
                  </p>
                  
                  <div className="overflow-x-auto rounded-lg border border-slate-200 mt-8">
                    <Table className="w-full">
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="w-1/3 py-3">Feature</TableHead>
                          <TableHead className="w-1/3 py-3">High, Medium, Low Risk Model</TableHead>
                          <TableHead className="w-1/3 py-3">TrackScore AI</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Order Selection</TableCell>
                          <TableCell className="text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                          <TableCell className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Product-Specific AI</TableCell>
                          <TableCell className="text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                          <TableCell className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Seller-Specific Model</TableCell>
                          <TableCell className="text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                          <TableCell className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Risk Identification</TableCell>
                          <TableCell className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-2">(3x Precise Identification)</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Adaptive Learning</TableCell>
                          <TableCell className="text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                          <TableCell className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>AI Training Depth</TableCell>
                          <TableCell className="text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                          <TableCell className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Day 1 vs Day 100 Performance</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <X className="h-5 w-5 text-red-500" />
                              <span className="ml-2">(Same Performance)</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-2">(AI Gets Smarter Over Time)</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>P&L Tracking</TableCell>
                          <TableCell className="text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                          <TableCell className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Effect of Canceled Orders on P&L</TableCell>
                          <TableCell className="text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></TableCell>
                          <TableCell className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="precise-cashflow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                  Precise Cashflow Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-lg">
                    TrackScore provides precise cashflow tracking that visualizes important movements in your business finances. By incorporating your remittance, COD, and prepaid cycles, we create a comprehensive picture of your business in a single graph.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="rounded-lg border border-slate-200 p-4">
                      <h3 className="text-xl font-medium mb-4">Business Cashflow Comparison</h3>
                      <div className="aspect-video w-full">
                        <ChartContainer
                          config={{
                            all: { label: "Without TrackScore", color: "#3b82f6" },
                            withTrackScore: { label: "With TrackScore", color: "#f97316" },
                          }}
                        >
                          <LineChart data={cashflowData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", offset: -10 }} />
                            <YAxis 
                              label={{ value: "Revenue (₹)", angle: -90, position: "insideLeft" }}
                              tickFormatter={(value) => {
                                if (value >= 1000) {
                                  return `${(value / 1000).toFixed(0)}K`;
                                }
                                return value;
                              }}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="all"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                              name="Without TrackScore"
                            />
                            <Line
                              type="monotone"
                              dataKey="withTrackScore"
                              stroke="#f97316" 
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                              name="With TrackScore"
                            />
                            <ChartTooltip 
                              content={<ChartTooltipContent />} 
                              formatter={(value) => [`₹${value.toLocaleString()}`]}
                            />
                          </LineChart>
                        </ChartContainer>
                      </div>
                      <div className="mt-4 text-sm text-slate-600">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Visualize your business's cashflow across all payment methods</li>
                          <li>Compare your performance with and without TrackScore optimization</li>
                          <li>Track remittance cycles, COD payments, and prepaid orders in one view</li>
                          <li>Identify precisely when your business breaks even and starts generating profit</li>
                          <li>Project future cashflow based on historical data and current trends</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-slate-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Complete Payment Visibility</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600">
                            Track COD, prepaid, and remittance cycles together to get a holistic view of your business's financial health.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-slate-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Precise Forecasting</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600">
                            Our AI predicts future cashflow patterns based on your business's unique performance metrics.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="smart-business-reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-emerald-500" />
                  Smart Business Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-lg">
                    TrackScore provides insights and reports that your shipping company and marketing channels don't tell you. Our comprehensive analytics go beyond standard metrics to reveal hidden opportunities and challenges.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Card className="bg-slate-50 border-t-4 border-t-emerald-500">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BarChart className="h-5 w-5 text-emerald-500" />
                          Performance Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Detailed breakdown of your sales performance across products, channels, and time periods with actionable insights.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50 border-t-4 border-t-blue-500">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <PieChart className="h-5 w-5 text-blue-500" />
                          Customer Segmentation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Understand your customer base with AI-powered segmentation that reveals buying patterns and preferences.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50 border-t-4 border-t-purple-500">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-purple-500" />
                          Growth Opportunities
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Identify untapped market segments and product opportunities based on your historical performance data.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-8 rounded-lg border border-slate-200 p-6">
                    <h3 className="text-xl font-medium mb-4">What Makes Our Reports Different</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-3">Comprehensive Data Integration</h4>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Combines data from multiple sources including marketplaces, logistics, and advertising platforms</li>
                          <li>Normalizes data across platforms for consistent comparisons</li>
                          <li>Identifies correlations between marketing spend, order quality, and RTO rates</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 mb-3">Actionable Recommendations</h4>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>AI-powered suggestions for optimizing marketing spend</li>
                          <li>Product-specific strategies to reduce returns and RTO</li>
                          <li>Channel performance insights with specific improvement tactics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mt-8">
                    <h3 className="text-lg font-medium mb-2">Business Impact Summary</h3>
                    <p className="text-slate-600">
                      TrackScore's Smart Business Reports provide the strategic intelligence necessary to optimize your e-commerce operations. By highlighting key performance indicators and trends that other platforms miss, we empower you to make data-driven decisions that boost profitability, reduce risks, and accelerate growth.
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
