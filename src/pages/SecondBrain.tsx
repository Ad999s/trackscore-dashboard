
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Brain, Lightbulb, BadgeDollarSign, Users, BarChart3, TrendingUp, Truck, PieChart, Zap } from 'lucide-react';

// Define insight categories
const insightCategories = [
  {
    id: "product-pricing",
    title: "Product & Pricing",
    icon: <BadgeDollarSign className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-700",
    insights: [
      {
        id: "sweet-spot-pricing",
        title: "Sweet Spot Pricing for Higher Conversion",
        description: "Identify price points where conversion spikes (e.g., ₹1,299 might convert 20% better than ₹1,399).",
        detail: "Test psychological pricing (₹999 vs. ₹1001 to see the breakpoints)."
      },
      {
        id: "hidden-high-margin",
        title: "Hidden High-Margin Products",
        description: "Find which products sell more to prepaid customers and have lower RTO but aren't currently being promoted heavily.",
        detail: "Example: If Product A has a 5% RTO and ₹800 margin, but Product B has a 30% RTO and ₹1,200 margin, shifting marketing to A makes sense."
      },
      {
        id: "bogo-optimization",
        title: "BOGO Optimization Based on RTO Rates",
        description: "If a certain second-item combo has 40% RTO but another has 15%, prioritize the latter to increase profitability."
      },
      {
        id: "bundle-data",
        title: "Bundle Data to Boost AOV",
        description: "Check what items are frequently bought together and create bundles with a slight discount to increase ticket size."
      }
    ]
  },
  {
    id: "customer-insights",
    title: "Customer Insights",
    icon: <Users className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-700",
    insights: [
      {
        id: "highest-value-customers",
        title: "Identifying the Highest Value Customers",
        description: "Find out which states/cities have the best COD success rates and lowest RTO and focus ad spend there."
      },
      {
        id: "reactivating-past-buyers",
        title: "Reactivating Past Buyers Efficiently",
        description: "If someone ordered twice, their COD success rate might be 80%+. Run a specific WhatsApp offer for repeat buyers instead of spending on new cold leads."
      },
      {
        id: "payment-gateway-specific",
        title: "Payment Gateway-Specific Data",
        description: "Some customers may prefer UPI over cards. If UPI converts 30% better in Tier 2 cities, offer it as the first option."
      },
      {
        id: "gender-based-trends",
        title: "Gender-Based Buying Trends",
        description: "Example: If men aged 18-24 have 50% higher RTO than women 25-34, tweak ad targeting to shift the ratio towards lower-RTO customers."
      }
    ]
  },
  {
    id: "advertising-marketing",
    title: "Advertising & Marketing",
    icon: <BarChart3 className="h-5 w-5" />,
    color: "bg-green-100 text-green-700",
    insights: [
      {
        id: "ad-angles",
        title: "Best Ad Angles Based on Refund/Returns Data",
        description: "If a specific problem (e.g., \"too small\") appears in 20% of refunds, modify ad creatives to address it upfront."
      },
      {
        id: "best-hook",
        title: "Finding the Best Hook via CTR vs. Conversion Data",
        description: "Some ad creatives get high CTR but don't convert well. If an ad has 5% CTR but 0.8% conversion and another has 3% CTR but 2% conversion, push the second one harder."
      },
      {
        id: "ad-placement",
        title: "Ad Placement-Based RTO Rate",
        description: "If Instagram Reels brings in more COD orders but has 40% RTO, and Facebook Feed ads have 20% RTO, allocate budget accordingly."
      },
      {
        id: "best-hour",
        title: "Identifying the Best Hour to Run Ads",
        description: "If 70% of high-intent prepaid purchases happen between 7 PM-11 PM, allocate more ad spend during that period."
      }
    ]
  },
  {
    id: "shipping-logistics",
    title: "Shipping & Logistics",
    icon: <Truck className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-700",
    insights: [
      {
        id: "courier-performance",
        title: "Courier Performance Optimization",
        description: "Some couriers may have 60% COD RTO in Bihar but 25% in Gujarat. Route packages to the best-performing couriers by state."
      },
      {
        id: "delivery-time",
        title: "Delivery Time vs. RTO Rate Analysis",
        description: "If orders that take 7+ days have 50% RTO but 3-day delivery orders have 18% RTO, push for faster processing on high-value regions."
      },
      {
        id: "pin-code-analysis",
        title: "Pin Code-Level RTO Analysis",
        description: "Block high-RTO pin codes where 50%+ of orders are getting returned and reroute ads to better zones."
      }
    ]
  },
  {
    id: "retention-ltv",
    title: "Retention & LTV",
    icon: <PieChart className="h-5 w-5" />,
    color: "bg-red-100 text-red-700",
    insights: [
      {
        id: "upsell-timing",
        title: "Best Time to Send Upsell Offers",
        description: "If 60% of repeat orders happen 20 days after first purchase, send a personalized WhatsApp offer on day 18-19."
      },
      {
        id: "message-channel",
        title: "WhatsApp vs. SMS vs. Email Conversion",
        description: "If WhatsApp gets 20% response rate for prepaid nudges but SMS gets only 5%, prioritize WhatsApp follow-ups for COD-to-prepaid conversions."
      },
      {
        id: "loyalty-triggers",
        title: "Loyalty Program Trigger Points",
        description: "If customers who buy 3 times have 80% LTV uplift, run targeted discounts on their third purchase to lock them in for more."
      }
    ]
  },
  {
    id: "scalability-profitability",
    title: "Scalability & Profitability",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "bg-indigo-100 text-indigo-700",
    insights: [
      {
        id: "profit-per-order",
        title: "Profit-Per-Order, Not Just Revenue",
        description: "Some ads may bring ₹1,500 AOV customers but with 40% RTO, while others bring ₹1,200 AOV but 10% RTO. Scale ads with better profit per shipped order."
      },
      {
        id: "time-to-first-order",
        title: "Time-to-First Order Impact",
        description: "If customers who get a WhatsApp confirmation within 10 minutes of ordering have a 25% lower cancellation rate, automate instant messages."
      }
    ]
  }
];

// Define suggestion examples
const suggestionsData = [
  {
    id: "1",
    title: "Optimize your pricing strategy",
    description: "Based on your sales data, lowering prices on jackets from ₹1,499 to ₹1,299 could increase conversion by 22% with minimal margin impact.",
    impact: "High impact",
    impactColor: "text-green-600",
    category: "product-pricing"
  },
  {
    id: "2",
    title: "Shift ad spend to high-converting regions",
    description: "Your data shows Gujarat and Maharashtra have 70% lower RTO rates than UP and Bihar. Consider reallocating 30% of your ad budget.",
    impact: "Medium impact",
    impactColor: "text-amber-600",
    category: "advertising-marketing"
  },
  {
    id: "3",
    title: "Implement WhatsApp order confirmations",
    description: "Orders with WhatsApp confirmations sent within 5 minutes show 18% lower cancellation rates. Set up an automated system.",
    impact: "High impact",
    impactColor: "text-green-600",
    category: "retention-ltv"
  },
  {
    id: "4",
    title: "Bundle underperforming accessories",
    description: "Your wallets have a high inventory but low sales. Creating a bundle with your best-selling belts could increase sales by 45%.",
    impact: "Medium impact",
    impactColor: "text-amber-600",
    category: "product-pricing"
  },
  {
    id: "5",
    title: "Improve your courier mix",
    description: "Your data shows Delhivery has 35% lower RTO in South India while BlueDart performs 28% better in Eastern regions.",
    impact: "High impact",
    impactColor: "text-green-600",
    category: "shipping-logistics"
  }
];

// Create automatically scrolling carousel component
const AutoScrollCarousel = ({ items, activeCategory, setActiveCategory }) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Setup auto-scroll
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
      }, 4000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, items.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoPlay(false);
  const handleMouseLeave = () => setAutoPlay(true);

  return (
    <div 
      className="w-full relative py-4" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        setApi={(api) => {
          // Move to the current index when the carousel is initialized
          if (api) {
            api.scrollTo(currentIndex);
          }
        }}
      >
        <CarouselContent className="px-1">
          {items.map((category) => (
            <CarouselItem key={category.id} className="basis-1/4 md:basis-1/5 pl-1 pr-5">
              <div 
                className={`relative rounded-xl px-4 py-3 h-36 cursor-pointer transition-all duration-300 flex flex-col justify-between
                  ${activeCategory === category.id ? 'border-2 border-blue-500 bg-blue-50' : 'bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50'}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div>
                  <div className={`inline-flex items-center justify-center p-2 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="font-medium mt-2">{category.title}</h3>
                </div>
                <p className="text-xs text-slate-500">{category.insights.length} insights</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

// Main component
const SecondBrain = () => {
  const [activeCategory, setActiveCategory] = useState("product-pricing");
  const [activeTab, setActiveTab] = useState("insights");
  const activeInsights = insightCategories.find(cat => cat.id === activeCategory)?.insights || [];
  const filteredSuggestions = suggestionsData.filter(
    suggestion => suggestion.category === activeCategory
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Brain className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">Second Brain</h1>
        </div>
        <p className="text-white/80 text-lg">
          200 IQ Business Genius for your brand. Data-driven insights to supercharge your business decisions.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Business Intelligence Categories
        </h2>
        <AutoScrollCarousel 
          items={insightCategories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      </div>

      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{insightCategories.find(cat => cat.id === activeCategory)?.title} Insights</CardTitle>
              <CardDescription>
                Data-driven analysis to optimize your business performance
              </CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="insights" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeInsights.map((insight) => (
                <Card key={insight.id} className="overflow-hidden">
                  <div className="border-l-4 border-blue-500 pl-4 py-3 bg-gradient-to-r from-blue-50 to-transparent">
                    <h3 className="font-semibold text-blue-800">{insight.title}</h3>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-slate-700">{insight.description}</p>
                    {insight.detail && (
                      <p className="text-sm text-slate-500 mt-2">{insight.detail}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="mt-0">
            <div className="space-y-4">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="mt-1">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{suggestion.title}</h3>
                        <span className={`text-sm font-medium ${suggestion.impactColor}`}>
                          {suggestion.impact}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1">{suggestion.description}</p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="mr-2">
                          Implement
                        </Button>
                        <Button variant="ghost" size="sm">
                          Learn more
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <p>No suggestions available for this category yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecondBrain;
