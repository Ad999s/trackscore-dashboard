
import React, { useState } from 'react';
import { Sparkles, ArrowRight, TrendingUp, LineChart, Bot, Lightbulb, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Mock data for insights
const insightData = {
  marketing: [
    {
      title: "Optimize Facebook Ad Spend",
      description: "Shift 15% of your marketing budget from Facebook to Instagram based on conversion rates and ROI analysis.",
      impact: "High",
      effort: "Medium",
      metrics: "Potential 23% increase in ROAS"
    },
    {
      title: "Retarget Abandoned Carts",
      description: "Create a targeted email campaign for customers who abandoned their cart in the last 30 days.",
      impact: "Medium",
      effort: "Low",
      metrics: "Recover up to 12% of abandoned carts"
    },
    {
      title: "Leverage User-Generated Content",
      description: "Request reviews and photos from top 10% of customers to use in marketing materials.",
      impact: "Medium",
      effort: "Low",
      metrics: "Increase trust signals by 35%"
    }
  ],
  products: [
    {
      title: "Promote Product 1 Bundle",
      description: "Create a bundle with your top-selling Product 1 and slow-moving Product 6 to increase overall sales volume.",
      impact: "High",
      effort: "Low",
      metrics: "Potential 20% margin increase"
    },
    {
      title: "Reconsider Product 6 Distribution",
      description: "Product 6 has the lowest sales volume but high shipping costs. Consider optimizing distribution or phasing out.",
      impact: "Medium",
      effort: "High",
      metrics: "Reduce overhead by 8%"
    },
    {
      title: "Expand Product 1 Variations",
      description: "Based on customer feedback and market trends, introduce 2-3 new variants of Product 1.",
      impact: "High",
      effort: "Medium",
      metrics: "Potential 35% increase in Product 1 sales"
    }
  ],
  performance: [
    {
      title: "Optimize Delivery Routes",
      description: "Restructure delivery routes in Tier 3 cities to improve efficiency and reduce costs.",
      impact: "Medium",
      effort: "Medium",
      metrics: "Reduce delivery times by 15%"
    },
    {
      title: "Implement Inventory Forecasting",
      description: "Use historical sales data to better forecast inventory needs for top 3 products.",
      impact: "High",
      effort: "High",
      metrics: "Reduce stockouts by 28%"
    },
    {
      title: "Streamline Return Process",
      description: "Simplify the return process to reduce processing time and improve customer satisfaction.",
      impact: "Medium",
      effort: "Medium",
      metrics: "Reduce return processing time by 40%"
    }
  ]
};

const impactColors = {
  High: "bg-green-100 text-green-800",
  Medium: "bg-blue-100 text-blue-800",
  Low: "bg-gray-100 text-gray-800"
};

const effortColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800"
};

type InsightCategory = "marketing" | "products" | "performance";

const SuggestionTab = () => {
  const [activeCategory, setActiveCategory] = useState<InsightCategory>("marketing");
  const [loading, setLoading] = useState(false);

  // Function to simulate generating new insights
  const generateNewInsights = () => {
    setLoading(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2500)),
      {
        loading: "Analyzing business data...",
        success: "Generated fresh insights based on your latest data!",
        error: "Failed to generate insights. Please try again.",
      }
    );
    setTimeout(() => setLoading(false), 2500);
  };

  const renderIcon = (category: InsightCategory) => {
    switch (category) {
      case "marketing":
        return <TrendingUp className="h-5 w-5" />;
      case "products":
        return <LineChart className="h-5 w-5" />;
      case "performance":
        return <Bot className="h-5 w-5" />;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            AI-Driven Business Suggestions
          </CardTitle>
          <CardDescription className="mt-1">
            Actionable insights based on your business data
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={generateNewInsights}
          disabled={loading}
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh Insights
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs 
          defaultValue="marketing" 
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as InsightCategory)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Marketing
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Product
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>
          
          {(["marketing", "products", "performance"] as const).map((category) => (
            <TabsContent value={category} key={category} className="space-y-4">
              <div className="flex items-center mb-3">
                {renderIcon(category)}
                <h3 className="text-lg font-semibold ml-2 capitalize">{category} Suggestions</h3>
              </div>
              
              <div className="space-y-4">
                {insightData[category].map((insight, index) => (
                  <Card key={index} className="overflow-hidden border-l-4 border-l-blue-500">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                          <CardTitle className="text-base font-medium">{insight.title}</CardTitle>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={impactColors[insight.impact as keyof typeof impactColors]}>
                            {insight.impact} Impact
                          </Badge>
                          <Badge variant="outline" className={effortColors[insight.effort as keyof typeof effortColors]}>
                            {insight.effort} Effort
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4">
                      <p className="text-sm text-gray-600">{insight.description}</p>
                      <div className="mt-3 flex items-center text-sm text-blue-600">
                        <LineChart className="h-4 w-4 mr-1" />
                        <span>{insight.metrics}</span>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="flex justify-end py-2 px-4">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                        <span>Implementation Plan</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SuggestionTab;
