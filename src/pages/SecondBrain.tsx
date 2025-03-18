
import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  LightbulbIcon, 
  BadgeDollarSign, 
  Users, 
  TrendingUp,
  Truck,
  Heart,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import InsightCategoryCard from '@/components/SecondBrain/InsightCategoryCard';
import QuestionTypeCarousel from '@/components/SecondBrain/QuestionTypeCarousel';
import SuggestionsList from '@/components/SecondBrain/SuggestionsList';
import { InsightCategory, QuestionType, Suggestion } from '@/types/secondBrain';

// Mock data for insights categories
const insightCategories: InsightCategory[] = [
  {
    id: '1',
    title: 'Product & Pricing Strategy',
    icon: 'BadgeDollarSign',
    description: 'Optimize your pricing and product strategy to maximize conversion and profitability.',
    insights: [
      {
        id: '1-1',
        title: 'Sweet Spot Pricing for Higher Conversion',
        description: [
          'Identify price points where conversion spikes (e.g., ₹1,299 might convert 20% better than ₹1,399).',
          'Test psychological pricing (₹999 vs. ₹1001 to see the breakpoints).'
        ],
        potentialImpact: 'high'
      },
      {
        id: '1-2',
        title: 'Hidden High-Margin Products',
        description: [
          'Find which products sell more to prepaid customers and have lower RTO but aren\'t currently being promoted heavily.',
          'Example: If Product A has a 5% RTO and ₹800 margin, but Product B has a 30% RTO and ₹1,200 margin, shifting marketing to A makes sense.'
        ],
        potentialImpact: 'high'
      },
      {
        id: '1-3',
        title: 'BOGO Optimization Based on RTO Rates',
        description: [
          'If a certain second-item combo has 40% RTO but another has 15%, prioritize the latter to increase profitability.'
        ],
        potentialImpact: 'medium'
      },
      {
        id: '1-4',
        title: 'Bundle Data to Boost AOV',
        description: [
          'Check what items are frequently bought together and create bundles with a slight discount to increase ticket size.'
        ],
        potentialImpact: 'medium'
      }
    ]
  },
  {
    id: '2',
    title: 'Customer Insights & Targeting',
    icon: 'Users',
    description: 'Understand your customers better to target the right audience with the right message.',
    insights: [
      {
        id: '2-1',
        title: 'Identifying the Highest Value Customers',
        description: [
          'Find out which states/cities have the best COD success rates and lowest RTO and focus ad spend there.'
        ],
        potentialImpact: 'high'
      },
      {
        id: '2-2',
        title: 'Reactivating Past Buyers Efficiently',
        description: [
          'If someone ordered twice, their COD success rate might be 80%+. Run a specific WhatsApp offer for repeat buyers instead of spending on new cold leads.'
        ],
        potentialImpact: 'high'
      },
      {
        id: '2-3',
        title: 'Payment Gateway-Specific Data for Prepaid Optimization',
        description: [
          'Some customers may prefer UPI over cards. If UPI converts 30% better in Tier 2 cities, offer it as the first option.'
        ],
        potentialImpact: 'medium'
      },
      {
        id: '2-4',
        title: 'Gender-Based Buying Trends',
        description: [
          'Example: If men aged 18-24 have 50% higher RTO than women 25-34, tweak ad targeting to shift the ratio towards lower-RTO customers.'
        ],
        potentialImpact: 'medium'
      }
    ]
  },
  {
    id: '3',
    title: 'Advertising & Marketing',
    icon: 'TrendingUp',
    description: 'Optimize your marketing efforts to get the best return on ad spend.',
    insights: [
      {
        id: '3-1',
        title: 'Best Ad Angles Based on Refund/Returns Data',
        description: [
          'If a specific problem (e.g., "too small") appears in 20% of refunds, modify ad creatives to address it upfront ("True to size, no need to size up/down").'
        ],
        potentialImpact: 'high'
      },
      {
        id: '3-2',
        title: 'Finding the Best Hook via CTR vs. Conversion Data',
        description: [
          'Some ad creatives get high CTR but don\'t convert well. If an ad has 5% CTR but 0.8% conversion and another has 3% CTR but 2% conversion, push the second one harder.'
        ],
        potentialImpact: 'high'
      },
      {
        id: '3-3',
        title: 'Ad Placement-Based RTO Rate',
        description: [
          'If Instagram Reels brings in more COD orders but has 40% RTO, and Facebook Feed ads have 20% RTO, allocate budget accordingly.'
        ],
        potentialImpact: 'medium'
      },
      {
        id: '3-4',
        title: 'Identifying the Best Hour to Run Ads',
        description: [
          'If 70% of high-intent prepaid purchases happen between 7 PM-11 PM, allocate more ad spend during that period.'
        ],
        potentialImpact: 'medium'
      }
    ]
  },
  {
    id: '4',
    title: 'Shipping & Logistics Optimization',
    icon: 'Truck',
    description: 'Optimize your shipping and logistics to reduce costs and improve customer satisfaction.',
    insights: [
      {
        id: '4-1',
        title: 'Courier Performance Optimization',
        description: [
          'Some couriers may have 60% COD RTO in Bihar but 25% in Gujarat. Route packages to the best-performing couriers by state.'
        ],
        potentialImpact: 'high'
      },
      {
        id: '4-2',
        title: 'Delivery Time vs. RTO Rate Analysis',
        description: [
          'If orders that take 7+ days have 50% RTO but 3-day delivery orders have 18% RTO, push for faster processing on high-value regions.'
        ],
        potentialImpact: 'high'
      },
      {
        id: '4-3',
        title: 'Pin Code-Level RTO Analysis',
        description: [
          'Block high-RTO pin codes where 50%+ of orders are getting returned and reroute ads to better zones.'
        ],
        potentialImpact: 'medium'
      }
    ]
  },
  {
    id: '5',
    title: 'Retention & Lifetime Value Boosting',
    icon: 'Heart',
    description: 'Increase customer lifetime value through better retention strategies.',
    insights: [
      {
        id: '5-1',
        title: 'Best Time to Send Upsell Offers',
        description: [
          'If 60% of repeat orders happen 20 days after first purchase, send a personalized WhatsApp offer on day 18-19.'
        ],
        potentialImpact: 'high'
      },
      {
        id: '5-2',
        title: 'WhatsApp vs. SMS vs. Email for Prepaid Conversion',
        description: [
          'If WhatsApp gets 20% response rate for prepaid nudges but SMS gets only 5%, prioritize WhatsApp follow-ups for COD-to-prepaid conversions.'
        ],
        potentialImpact: 'medium'
      },
      {
        id: '5-3',
        title: 'Loyalty Program Trigger Points',
        description: [
          'If customers who buy 3 times have 80% LTV uplift, run targeted discounts on their third purchase to lock them in for more.'
        ],
        potentialImpact: 'medium'
      }
    ]
  },
  {
    id: '6',
    title: 'Scalability & Profitability Tweaks',
    icon: 'BarChart3',
    description: 'Small tweaks that can have a big impact on your bottom line.',
    insights: [
      {
        id: '6-1',
        title: 'Profit-Per-Order, Not Just Revenue',
        description: [
          'Some ads may bring ₹1,500 AOV customers but with 40% RTO, while others bring ₹1,200 AOV but 10% RTO. Scale ads with better profit per shipped order, not just high ticket size.'
        ],
        potentialImpact: 'high'
      },
      {
        id: '6-2',
        title: 'Time-to-First Order Impact',
        description: [
          'If customers who get a WhatsApp confirmation within 10 minutes of ordering have a 25% lower cancellation rate, automate instant messages.'
        ],
        potentialImpact: 'high'
      }
    ]
  }
];

// Mock data for question types
const questionTypes: QuestionType[] = [
  {
    id: '1',
    title: 'Pricing Optimization',
    description: 'Discover the perfect price points for maximum conversion',
    examples: [
      'What price points convert best for my top products?',
      'Are there psychological pricing barriers I should consider?'
    ],
    category: 'Product & Pricing Strategy',
    icon: 'BadgeDollarSign'
  },
  {
    id: '2',
    title: 'Product Marketing Focus',
    description: 'Find hidden high-margin, low-RTO products',
    examples: [
      'Which products have the highest margins after accounting for RTO?',
      'What products should I prioritize in my marketing?'
    ],
    category: 'Product & Pricing Strategy',
    icon: 'Package'
  },
  {
    id: '3',
    title: 'High-Value Customer Segments',
    description: 'Identify and target your most profitable customers',
    examples: [
      'Which regions have the best COD success rates?',
      'What customer demographics show the lowest RTO rates?'
    ],
    category: 'Customer Insights & Targeting',
    icon: 'Users'
  },
  {
    id: '4',
    title: 'Ad Performance Optimization',
    description: 'Maximize ROAS with data-driven insights',
    examples: [
      'Which ad creatives have the best conversion-to-CTR ratio?',
      'What time of day should I schedule my ads for maximum ROI?'
    ],
    category: 'Advertising & Marketing',
    icon: 'TrendingUp'
  },
  {
    id: '5',
    title: 'Logistics Enhancement',
    description: 'Reduce RTO and optimize delivery times',
    examples: [
      'Which courier partners perform best in specific regions?',
      'What delivery timeframes reduce my RTO rates?'
    ],
    category: 'Shipping & Logistics Optimization',
    icon: 'Truck'
  },
  {
    id: '6',
    title: 'Retention Strategies',
    description: 'Increase repeat purchases and customer lifetime value',
    examples: [
      'When is the optimal time to send upsell offers?',
      'Which communication channels drive the best retention?'
    ],
    category: 'Retention & Lifetime Value Boosting',
    icon: 'Heart'
  },
  {
    id: '7',
    title: 'Profitability Insights',
    description: 'Focus on profit-per-order, not just revenue',
    examples: [
      'Which marketing channels deliver the highest profit per order?',
      'How can I improve my operational efficiency for better margins?'
    ],
    category: 'Scalability & Profitability Tweaks',
    icon: 'BarChart3'
  }
];

// Mock data for suggestions
const suggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Shift pricing on your top 5 products',
    description: 'Data shows your conversion rate drops significantly at certain price points.',
    actionItems: [
      'Test ₹1,299 instead of ₹1,399 for your bestseller',
      'Consider bundling accessories for products priced at ₹899 to justify a ₹999 price point'
    ],
    category: 'Product & Pricing Strategy',
    impact: 'high'
  },
  {
    id: '2',
    title: 'Focus marketing on these 3 high-performing products',
    description: 'These products have significantly lower RTO rates with good margins.',
    actionItems: [
      'Increase ad spend for Product X by 15%',
      'Create dedicated landing pages highlighting reliability and fit accuracy'
    ],
    category: 'Product & Pricing Strategy',
    impact: 'high'
  },
  {
    id: '3',
    title: 'Target these high-value geographic regions',
    description: 'Gujarat, Karnataka and parts of Maharashtra show 20-30% higher COD success rates.',
    actionItems: [
      'Increase ad budget for these regions by 25%',
      'Create region-specific ad creatives highlighting local events/themes'
    ],
    category: 'Customer Insights & Targeting',
    impact: 'high'
  },
  {
    id: '4',
    title: 'Optimize your ad timing for maximum impact',
    description: 'Conversion rates spike between 7-10 PM across all platforms.',
    actionItems: [
      'Shift 40% of your ad budget to evening hours',
      'Test weekend vs. weekday performance for higher-ticket items'
    ],
    category: 'Advertising & Marketing',
    impact: 'medium'
  },
  {
    id: '5',
    title: 'Route packages through these courier partners',
    description: 'Data shows significant RTO variation between courier services in specific regions.',
    actionItems: [
      'Use Courier A for North India shipments',
      'Switch to Courier B for Bihar, Jharkhand, and Odisha'
    ],
    category: 'Shipping & Logistics Optimization',
    impact: 'high'
  }
];

const SecondBrain = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Auto-advance the question carousel
  useEffect(() => {
    if (!autoAdvance) return;
    
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => 
        prev === questionTypes.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoAdvance, questionTypes.length]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-6 h-6" />;
      case 'LightbulbIcon': return <LightbulbIcon className="w-6 h-6" />;
      case 'BadgeDollarSign': return <BadgeDollarSign className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'Heart': return <Heart className="w-6 h-6" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const selectedCategoryData = insightCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section with Gradient Background */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Second Brain</h1>
          </div>
          <h2 className="text-4xl font-extrabold mb-4">
            200IQ Business Genius for Your Brand
          </h2>
          <p className="text-lg opacity-90 max-w-3xl">
            AI-powered insights from your business data. Uncover hidden opportunities, 
            optimize strategy, and make data-driven decisions that boost your bottom line.
          </p>
        </div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Question Types Carousel */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">What would you like to know?</h2>
          <button 
            onClick={() => setAutoAdvance(!autoAdvance)}
            className={`text-sm px-3 py-1 rounded-full ${autoAdvance ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
          >
            {autoAdvance ? 'Auto-scrolling On' : 'Auto-scrolling Off'}
          </button>
        </div>

        <QuestionTypeCarousel 
          questionTypes={questionTypes} 
          currentIndex={currentQuestionIndex}
          onIndexChange={setCurrentQuestionIndex}
          autoAdvance={autoAdvance}
        />
      </div>

      {/* Insight Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insightCategories.map((category) => (
          <InsightCategoryCard
            key={category.id}
            category={category}
            isSelected={category.id === selectedCategory}
            onClick={() => setSelectedCategory(category.id)}
            icon={getIconComponent(category.icon)}
          />
        ))}
      </div>

      {/* Selected Category Insights */}
      {selectedCategoryData && (
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <div className="flex items-center gap-3">
              {getIconComponent(selectedCategoryData.icon)}
              <CardTitle>{selectedCategoryData.title}</CardTitle>
            </div>
            <CardDescription className="text-white/90">{selectedCategoryData.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {selectedCategoryData.insights.map((insight) => (
                <div key={insight.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`rounded-full p-1.5 ${
                      insight.potentialImpact === 'high' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      <LightbulbIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{insight.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        insight.potentialImpact === 'high' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-amber-100 text-amber-600'
                      }`}>
                        {insight.potentialImpact === 'high' ? 'High Impact' : 'Medium Impact'}
                      </span>
                    </div>
                  </div>
                  <ul className="ml-8 space-y-2">
                    {insight.description.map((point, i) => (
                      <li key={i} className="list-disc text-gray-700">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations and Suggestions */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <h2 className="text-xl font-semibold">Smart Suggestions</h2>
        </div>
        <SuggestionsList suggestions={suggestions} />
      </div>
    </div>
  );
};

export default SecondBrain;
