
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MessageCircleQuestion, Send, Lightbulb, Loader2, ArrowUp, ArrowDown, TrendingUp, LineChart, BookText, BarChart4, Hash, Percent, Sparkles } from 'lucide-react';

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
  }
};

// Sample frequently asked questions
const SAMPLE_QUESTIONS = [
  "How can I improve conversion rate?",
  "What products should I bundle together?",
  "Which marketing channel is most effective?",
  "How can I reduce customer acquisition cost?",
  "What's the best pricing strategy for my premium products?"
];

const AskAITab = () => {
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

    // Simulate API call with timeout
    setTimeout(() => {
      // Check for predefined responses or generate a new one
      let response: SuggestionResponse;
      
      if (SAMPLE_RESPONSES[searchQuery.toLowerCase()]) {
        response = SAMPLE_RESPONSES[searchQuery.toLowerCase()];
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

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <MessageCircleQuestion className="h-5 w-5" />
          Ask AI About Your Business
        </CardTitle>
        <CardDescription>
          Get personalized suggestions and insights based on your business data
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Ask about your business (e.g., 'How can I increase prepaid sales of key chains?')"
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
                  <MessageCircleQuestion className="h-5 w-5 text-blue-600" />
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
                  <MessageCircleQuestion className="h-4 w-4 mr-2 flex-shrink-0" />
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
