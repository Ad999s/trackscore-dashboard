
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BrainCircuit, BarChart3, Globe, Shield, LineChart, RefreshCcw } from 'lucide-react';

const features = [
  {
    id: "smart-order",
    title: "Smart Order Selection",
    description: "Doesn't just tag risk, decides which orders to ship for max profit.",
    icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
    traditional: "Simply flags high-risk orders based on fixed criteria."
  },
  {
    id: "real-time",
    title: "Real-Time Learning",
    description: "Adapts based on live customer behavior & courier trends, not static rules.",
    icon: <RefreshCcw className="h-6 w-6 text-blue-500" />,
    traditional: "Uses static rules that don't adapt to changing customer behaviors."
  },
  {
    id: "cross-store",
    title: "Cross-Store Fraud Detection",
    description: "Flags repeat RTO offenders across multiple stores, not just one.",
    icon: <Globe className="h-6 w-6 text-green-500" />,
    traditional: "Limited to analyzing data within a single store."
  },
  {
    id: "intent-based",
    title: "Intent-Based Tracking",
    description: "Predicts risk using real-time actions, not just past data.",
    icon: <BrainCircuit className="h-6 w-6 text-amber-500" />,
    traditional: "Relies on historical data patterns without considering intent."
  },
  {
    id: "profit-first",
    title: "Profit-First Approach",
    description: "Balances RTO prevention & revenue growth instead of over-blocking orders.",
    icon: <LineChart className="h-6 w-6 text-teal-500" />,
    traditional: "Often over-blocks orders, sacrificing revenue for safety."
  },
  {
    id: "continuous-learning",
    title: "Continuous Learning",
    description: "Learns your customer type, customer persona, demographics, and improves performance over time.",
    icon: <Shield className="h-6 w-6 text-indigo-500" />,
    traditional: "Uses the same ruleset for all businesses, ignoring unique customer bases."
  }
];

const ComparisonFeatures = () => {
  return (
    <div className="mx-auto mt-8 mb-12">
      <h3 className="text-xl font-semibold mb-4">TrackScore AI vs. Traditional RTO Tools</h3>
      <p className="text-slate-600 mb-6">
        Understand why TrackScore AI provides superior results compared to traditional risk assessment tools.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-2 border-purple-100 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-700">TrackScore AI</CardTitle>
            <CardDescription>Advanced AI-driven approach</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature.id} className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">{feature.icon}</div>
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-200 bg-slate-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-700">Traditional RTO Tools</CardTitle>
            <CardDescription>Rule-based risk tagging</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={`trad-${feature.id}`} className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0 text-slate-400">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{feature.title}</p>
                    <p className="text-sm text-slate-600">{feature.traditional}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
        <p className="text-blue-800 font-medium text-center">
          🔹 Traditional tools show the risk. TrackScore AI fixes it and grows your business. 🚀
        </p>
      </div>
      
      <Accordion type="single" collapsible className="mt-8">
        <AccordionItem value="detail-view">
          <AccordionTrigger className="text-sm font-medium">
            See detailed comparison
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {features.map((feature) => (
                <div key={`detail-${feature.id}`} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {feature.icon}
                    <h4 className="font-semibold">{feature.title}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-purple-50 rounded-md">
                      <p className="text-sm font-medium text-purple-700">TrackScore AI:</p>
                      <p className="text-sm">{feature.description}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-md">
                      <p className="text-sm font-medium text-slate-700">Traditional Tools:</p>
                      <p className="text-sm">{feature.traditional}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ComparisonFeatures;
