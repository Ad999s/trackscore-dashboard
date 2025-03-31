
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MessageSquare, Send, Lightbulb, Loader2, ArrowUp, ArrowDown, TrendingUp, LineChart, BookText, BarChart4, Hash, Percent, Sparkles, Play } from 'lucide-react';

interface SuggestionResponse {
  id: string;
  query: string;
  answer: string;
  metrics: { 
    label: string; 
    value: string; 
    trend: 'up' | 'down' | 'neutral';
    change?: string;
  }[];
  actionItems: string[];
  timestamp: Date;
  hasImplementationPlan?: boolean;
  implementationGoal?: {
    goal: string;
    timeframe: string;
    steps: {
      title: string;
      category: string;
      done: boolean;
      details: string;
    }[];
  };
}

interface AskAITabProps {
  onStartInPlayground?: (goalData: any) => void;
}

const SAMPLE_RESPONSES: Record<string, SuggestionResponse> = {
  'increase prepaid sales of key chain': {
    id: '1',
    query: 'I want to increase prepaid sales of key chain',
    answer: "Based on your historical sales data and customer behavior analysis, there are several strategies you can implement to boost prepaid sales for key chains. Your current prepaid ratio for key chains is 32%, which is below your overall prepaid average of 47%. The data suggests that offering a small discount for prepaid orders could significantly increase conversion rates.",
    metrics: [
      { 
        label: 'Current Prepaid Ratio', 
        value: '32%', 
        trend: 'neutral' 
      },
      { 
        label: 'Overall Prepaid Average', 
        value: '47%', 
        trend: 'up',
        change: '+15%'
      },
      { 
        label: 'Potential Growth', 
        value: '53%', 
        trend: 'up',
        change: '+21%'
      }
    ],
    actionItems: [
      "Offer a 5% discount exclusively for prepaid key chain orders",
      "Create time-limited flash sales with prepaid-only options",
      "Bundle key chains with complementary items that have high prepaid ratios",
      "Highlight 'faster shipping' benefit for prepaid orders",
      "Implement trust badges at checkout to increase confidence in prepaid payments"
    ],
    timestamp: new Date()
  },
  'reduce returns for t-shirts': {
    id: '2',
    query: 'How can I reduce returns for t-shirts?',
    answer: "Your t-shirt return rate is currently at 18%, which is 7% higher than your overall product return average. Analysis shows that 62% of t-shirt returns are due to size issues, followed by 24% for fabric quality concerns. Implementing better size guides and quality control measures could significantly reduce your return rate.",
    metrics: [
      { 
        label: 'Current Return Rate', 
        value: '18%', 
        trend: 'down',
        change: '-3% (last 30 days)'
      },
      { 
        label: 'Size-related Returns', 
        value: '62%', 
        trend: 'down',
        change: '-5% (last 30 days)'
      },
      { 
        label: 'Quality-related Returns', 
        value: '24%', 
        trend: 'neutral'
      }
    ],
    actionItems: [
      "Implement detailed size charts with actual measurements",
      "Add customer review section highlighting size fit experience",
      "Introduce a 'size finder' quiz for customers",
      "Partner with a higher quality fabric supplier",
      "Follow up with customers post-delivery to collect feedback"
    ],
    timestamp: new Date()
  },
  'implementation plan for 5 lakh monthly profit': {
    id: '3',
    query: 'Create implementation plan for 5 lakh monthly profit',
    answer: "I've analyzed your business data and created a comprehensive 90-day implementation plan to achieve ₹5 lakh monthly profit. Based on your current performance, this will require optimizing your product mix, improving marketing efficiency, reducing costs, and implementing better tracking systems.",
    metrics: [
      { 
        label: 'Current Monthly Profit', 
        value: '₹2.3L', 
        trend: 'neutral' 
      },
      { 
        label: 'Target Monthly Profit', 
        value: '₹5L', 
        trend: 'up',
        change: '+117%'
      },
      { 
        label: 'Estimated Timeframe', 
        value: '90 days', 
        trend: 'neutral'
      }
    ],
    actionItems: [
      "Focus on products with >30% margin",
      "Optimize ad spend on high-converting audiences",
      "Reduce COGS by 15% through supplier negotiation",
      "Implement weekly KPI tracking system"
    ],
    timestamp: new Date(),
    hasImplementationPlan: true,
    implementationGoal: {
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
    }
  },
  'make graph of sales vs marketing spend': {
    id: '4',
    query: 'Make a graph of sales vs marketing spend',
    answer: "I've analyzed your historical data and created a graph comparing your sales revenue against marketing spend over the past 12 months. The visualization shows a positive correlation with an average ROI of 4.2x (each rupee spent on marketing generates ₹4.2 in sales). There are seasonal patterns worth noting, with higher efficiency in Q2 and Q4.",
    metrics: [
      { 
        label: 'Avg. Marketing ROI', 
        value: '4.2x', 
        trend: 'up',
        change: '+0.5x (YoY)'
      },
      { 
        label: 'Best Month ROI', 
        value: '5.7x', 
        trend: 'up',
        change: 'December'
      },
      { 
        label: 'Lowest Month ROI', 
        value: '2.9x', 
        trend: 'down',
        change: 'July'
      }
    ],
    actionItems: [
      "Increase budget allocation during high-ROI months (Dec-Jan, Apr-May)",
      "Reduce spend during July-August when ROI is consistently lower",
      "Test new channels to improve summer performance",
      "Implement more granular tracking to identify best-performing campaigns"
    ],
    timestamp: new Date()
  }
};

const SAMPLE_QUESTIONS = [
  "How can I improve conversion rate?",
  "What products should I bundle together?",
  "Which marketing channel is most effective?",
  "How can I reduce customer acquisition cost?",
  "What's the best pricing strategy for my premium products?",
  "Create implementation plan for 5 lakh monthly profit",
  "Make a graph of sales vs marketing spend"
];

const AskAITab: React.FC<AskAITabProps> = ({ onStartInPlayground }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<SuggestionResponse | null>(null);
  const [history, setHistory] = useState<SuggestionResponse[]>([]);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a valid question');
      return;
    }

    setIsLoading(true);
    setQuery(searchQuery);

    setTimeout(() => {
      let response: SuggestionResponse;
      
      if (SAMPLE_RESPONSES[searchQuery.toLowerCase()]) {
        response = SAMPLE_RESPONSES[searchQuery.toLowerCase()];
      } else {
        // Check if this is an implementation plan request
        const isImplementation = searchQuery.toLowerCase().includes('implementation') || 
                               searchQuery.toLowerCase().includes('plan') || 
                               searchQuery.toLowerCase().includes('goal') ||
                               searchQuery.toLowerCase().includes('lakh') || 
                               searchQuery.toLowerCase().includes('profit');
                               
        // Check if this is a graph request
        const isGraph = searchQuery.toLowerCase().includes('graph') || 
                      searchQuery.toLowerCase().includes('chart') || 
                      searchQuery.toLowerCase().includes('vs') || 
                      searchQuery.toLowerCase().includes('versus') ||
                      searchQuery.toLowerCase().includes('compare');
        
        if (isImplementation) {
          // Generate a custom implementation plan
          const profitTarget = searchQuery.includes('lakh') ? 
            searchQuery.match(/(\d+)\s*lakh/i)?.[1] + " Lakh" : "3 Lakh";
          
          response = {
            id: Date.now().toString(),
            query: searchQuery,
            answer: `I've analyzed your business data and created a comprehensive implementation plan to achieve ₹${profitTarget} monthly profit. The plan focuses on key areas that will have the biggest impact on your bottom line based on your current performance metrics.`,
            metrics: [
              { 
                label: 'Current Monthly Profit', 
                value: `₹${(Math.random() * 2 + 1).toFixed(1)}L`, 
                trend: 'neutral' 
              },
              { 
                label: 'Target Monthly Profit', 
                value: `₹${profitTarget}`, 
                trend: 'up',
                change: '+95%'
              },
              { 
                label: 'Estimated Timeframe', 
                value: '90 days', 
                trend: 'neutral'
              }
            ],
            actionItems: [
              "Focus on high-margin products",
              "Optimize marketing spend on best channels",
              "Reduce COGS through better sourcing",
              "Implement KPI tracking system"
            ],
            timestamp: new Date(),
            hasImplementationPlan: true,
            implementationGoal: {
              goal: `₹${profitTarget} Monthly Profit`,
              timeframe: "90 days",
              steps: [
                { 
                  title: "Optimize product portfolio", 
                  category: "overview",
                  done: false,
                  details: "Prioritize products with >30% profit margin"
                },
                { 
                  title: "Launch targeted ad campaigns", 
                  category: "marketing",
                  done: false,
                  details: "Increase spend on channels with lowest CAC"
                },
                { 
                  title: "Reduce COGS by 15%", 
                  category: "cogs",
                  done: false,
                  details: "Renegotiate with suppliers and optimize logistics"
                },
                { 
                  title: "Implement weekly tracking", 
                  category: "numbers",
                  done: false,
                  details: "Monitor key metrics and make data-driven adjustments"
                }
              ]
            }
          };
        } else if (isGraph) {
          // Generate a custom graph response
          const metrics = searchQuery.match(/of\s+([a-z\s]+)\s+vs\s+([a-z\s]+)/i);
          const metric1 = metrics?.[1] || "sales";
          const metric2 = metrics?.[2] || "marketing spend";
          
          response = {
            id: Date.now().toString(),
            query: searchQuery,
            answer: `I've analyzed your historical data and created a graph comparing your ${metric1} against ${metric2} over the past 12 months. The visualization reveals important patterns and correlations that can help optimize your business strategy.`,
            metrics: [
              { 
                label: `Avg. ${metric1.charAt(0).toUpperCase() + metric1.slice(1)} Growth`, 
                value: `${(Math.random() * 25 + 5).toFixed(1)}%`, 
                trend: 'up',
                change: `+${(Math.random() * 10).toFixed(1)}% (YoY)`
              },
              { 
                label: `${metric2.charAt(0).toUpperCase() + metric2.slice(1)} Efficiency`, 
                value: `${(Math.random() * 3 + 2).toFixed(1)}x`, 
                trend: Math.random() > 0.5 ? 'up' : 'down',
                change: Math.random() > 0.5 ? 'Improving' : 'Declining'
              },
              { 
                label: 'Correlation Strength', 
                value: `${(Math.random() * 0.5 + 0.5).toFixed(2)}`, 
                trend: 'neutral'
              }
            ],
            actionItems: [
              `Optimize ${metric2} allocation during high-performance periods`,
              `Reduce ${metric2} during historically low-return months`,
              `Test new approaches to improve ${metric1} efficiency`,
              `Implement more detailed tracking of ${metric1} vs ${metric2}`
            ],
            timestamp: new Date()
          };
        } else {
          // Generate a generic response
          response = {
            id: Date.now().toString(),
            query: searchQuery,
            answer: `Based on your business data analysis, here are insights about "${searchQuery}". We've analyzed your sales patterns, customer behavior, and market trends to provide actionable recommendations.`,
            metrics: [
              { 
                label: 'Current Performance', 
                value: Math.floor(Math.random() * 100) + '%', 
                trend: Math.random() > 0.5 ? 'up' : 'down',
                change: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 20)}%`
              },
              { 
                label: 'Market Average', 
                value: Math.floor(Math.random() * 100) + '%', 
                trend: Math.random() > 0.5 ? 'up' : 'down' 
              },
              { 
                label: 'Growth Potential', 
                value: Math.floor(Math.random() * 50) + '%', 
                trend: 'up' 
              }
            ],
            actionItems: [
              "Analyze customer segments to identify high-value targets",
              "Optimize pricing strategy based on competitive analysis",
              "Implement targeted marketing campaigns for specific segments",
              "Consider product bundling to increase average order value",
              "Monitor key performance indicators weekly to track progress"
            ],
            timestamp: new Date()
          };
        }
      }
      
      setCurrentResponse(response);
      setHistory(prev => [response, ...prev]);
      setIsLoading(false);
    }, 2000);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <span className="h-4 w-4" />;
    }
  };

  const handleStartInPlayground = () => {
    if (currentResponse?.implementationGoal && onStartInPlayground) {
      onStartInPlayground(currentResponse.implementationGoal);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Ask AI About Your Business
        </CardTitle>
        <CardDescription>
          Get personalized suggestions, insights, and implementation plans based on your business data
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Ask about your business (e.g., 'How can I increase prepaid sales?' or 'Create implementation plan for 5 lakh profit')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            {query && (
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setQuery('')}
              >
                <span className="sr-only">Clear</span>
                &times;
              </button>
            )}
          </div>
          <Button 
            onClick={() => handleSearch()} 
            disabled={isLoading || !query.trim()}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Ask
          </Button>
        </div>
        
        {!currentResponse && !isLoading && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Try asking about:
            </h3>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_QUESTIONS.map((question, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSearch(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
              <p className="text-muted-foreground">Analyzing your business data...</p>
            </div>
          </div>
        )}
        
        {currentResponse && !isLoading && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-blue-100 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{currentResponse.query}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(currentResponse.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-lg">
                <div className="mt-1 bg-blue-100 p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{currentResponse.answer}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <BarChart4 className="h-4 w-4" />
                Key Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentResponse.metrics.map((metric, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      </div>
                      <div className="flex items-center">
                        {getTrendIcon(metric.trend)}
                        {metric.change && (
                          <span className={`text-xs ml-1 ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : ''}`}>
                            {metric.change}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <BookText className="h-4 w-4" />
                Recommended Actions
              </h3>
              <Card>
                <CardContent className="p-4">
                  <ol className="space-y-2">
                    {currentResponse.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-blue-100 text-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
            
            {currentResponse.hasImplementationPlan && (
              <div className="mt-4">
                <Button 
                  onClick={handleStartInPlayground} 
                  className="w-full gap-2"
                >
                  <Play className="h-4 w-4" />
                  Start Implementation in Playground
                </Button>
              </div>
            )}
          </div>
        )}
        
        {history.length > 1 && (
          <div className="mt-8">
            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-3">Recent Questions</h3>
            <div className="space-y-2">
              {history.slice(1).map((item) => (
                <Button 
                  key={item.id} 
                  variant="ghost" 
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    setCurrentResponse(item);
                    setQuery(item.query);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                  <div className="truncate">{item.query}</div>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AskAITab;
