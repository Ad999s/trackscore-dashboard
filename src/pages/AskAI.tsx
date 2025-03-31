
import React, { useState } from 'react';
import { MessageSquare, LineChart, CheckSquare } from 'lucide-react';
import AskAITab from '@/components/AskAI/AskAITab';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AskAI = () => {
  const navigate = useNavigate();
  const [activeTabValue, setActiveTabValue] = useState("ask");

  const handleTabChange = (value: string) => {
    setActiveTabValue(value);
  };

  const handleStartInPlayground = (goalData: any) => {
    // Save goal data to localStorage to access it in the playground
    localStorage.setItem('playgroundGoal', JSON.stringify(goalData));
    navigate('/playground');
    toast.success('Goal saved to playground!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">AI Assistant</h1>
          <p className="text-slate-500 mt-1">
            Get personalized suggestions, insights, and implementation plans based on your business data
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="ask" value={activeTabValue} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="ask" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Ask AI</span>
          </TabsTrigger>
          <TabsTrigger value="graphs" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Business Graphs</span>
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span>Implementation Plans</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ask" className="space-y-6">
          <AskAITab onStartInPlayground={handleStartInPlayground} />
        </TabsContent>
        
        <TabsContent value="graphs" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Custom Business Graphs</h2>
            <p className="text-slate-600 mb-6">
              Ask AI to generate custom graphs comparing any metrics you want to analyze.
              <br />
              Examples: "Create a graph comparing sales vs marketing spend", "Show me profit trends by product category"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-medium mb-2">Sales vs Marketing ROI</h3>
                <div className="bg-slate-100 h-40 rounded-md flex items-center justify-center text-slate-400">
                  Graph Preview Placeholder
                </div>
                <Button 
                  variant="outline" 
                  className="mt-3 w-full"
                  onClick={() => toast.info('This would generate a detailed graph')}
                >
                  Generate Full Graph
                </Button>
              </div>
              
              <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-medium mb-2">Profit by Product Category</h3>
                <div className="bg-slate-100 h-40 rounded-md flex items-center justify-center text-slate-400">
                  Graph Preview Placeholder
                </div>
                <Button 
                  variant="outline" 
                  className="mt-3 w-full" 
                  onClick={() => toast.info('This would generate a detailed graph')}
                >
                  Generate Full Graph
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="implementation" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Business Implementation Plans</h2>
            <p className="text-slate-600 mb-6">
              Ask AI to create detailed implementation plans for achieving your business goals.
              <br />
              Example: "Create a plan to reach ₹5 lakh monthly profit" or "How to increase conversion rate by 20%"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">₹5 Lakh Monthly Profit Plan</h3>
                <p className="text-sm text-slate-500 mb-3">A comprehensive 90-day plan to reach ₹5 lakh monthly profit</p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Optimize product mix for higher margins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Launch targeted marketing campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Reduce COGS by 15% through negotiation</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleStartInPlayground({
                    goal: "₹5 Lakh Monthly Profit",
                    timeframe: "90 days",
                    steps: [
                      { 
                        title: "Optimize product mix", 
                        category: "overview",
                        done: false,
                        details: "Focus on products with >30% margin"
                      },
                      { 
                        title: "Launch targeted campaigns", 
                        category: "marketing",
                        done: false,
                        details: "Increase ad spend on high-converting audiences"
                      },
                      { 
                        title: "Reduce COGS by 15%", 
                        category: "cogs",
                        done: false,
                        details: "Renegotiate with suppliers for bulk discounts"
                      },
                      { 
                        title: "Track weekly KPIs", 
                        category: "numbers",
                        done: false,
                        details: "Monitor conversion rates, AOV, and margins weekly"
                      }
                    ]
                  })}
                  className="w-full"
                >
                  Start in Playground
                </Button>
              </div>
              
              <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">20% Conversion Rate Improvement</h3>
                <p className="text-sm text-slate-500 mb-3">A focused 60-day plan to boost conversion rates by 20%</p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Improve website UX and checkout flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Add social proof elements to product pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Optimize pricing and offer structure</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleStartInPlayground({
                    goal: "20% Conversion Rate Improvement",
                    timeframe: "60 days",
                    steps: [
                      { 
                        title: "Improve website UX", 
                        category: "overview",
                        done: false,
                        details: "Simplify checkout flow from 5 to 3 steps"
                      },
                      { 
                        title: "Add social proof", 
                        category: "marketing",
                        done: false,
                        details: "Add reviews and testimonials to product pages"
                      },
                      { 
                        title: "Optimize pricing", 
                        category: "cogs",
                        done: false,
                        details: "Test different price points and bundle offers"
                      },
                      { 
                        title: "Monitor funnel metrics", 
                        category: "numbers",
                        done: false,
                        details: "Set up detailed tracking for each step of the customer journey"
                      }
                    ]
                  })}
                  className="w-full"
                >
                  Start in Playground
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AskAI;
