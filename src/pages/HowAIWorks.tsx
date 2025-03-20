
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brain, zap, search, check, x } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const HowAIWorks = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-trackscore-text mb-4">How AI Works at TrackScore</h1>
        <p className="text-slate-600">Understand how our AI-powered systems revolutionize order verification</p>
      </div>

      <Tabs defaultValue="founder" className="w-full">
        <TabsList className="mb-6 bg-trackscore-lightblue">
          <TabsTrigger value="founder">Founder's Message</TabsTrigger>
          <TabsTrigger value="comparison">AI vs Manual Verification</TabsTrigger>
          <TabsTrigger value="technology">Our Technology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="founder" className="space-y-6">
          <Card className="bg-white shadow-soft">
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center">
                  <div className="w-16 h-16 rounded-full bg-trackscore-blue/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-trackscore-blue"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line></svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-trackscore-text">From the Founder's Desk</h2>
                    <p className="text-slate-500">Unfiltered thoughts on the power of AI</p>
                  </div>
                </div>
                
                <div className="border-l-4 border-trackscore-blue pl-6 py-2 my-6 bg-blue-50/50">
                  <p className="text-lg text-slate-700 italic">
                    "AI at its 10% capability is STILL better than your manual verification team."
                  </p>
                </div>

                <div className="font-light text-lg leading-relaxed space-y-6 text-slate-800" style={{ fontFamily: 'Georgia, serif', lineHeight: '1.7' }}>
                  <p>
                    Give your manual calling team a break. 
                    
                    We are lighting fast in distinguishing between high intent orders vs low intent orders. 
                    We've done a PhD in RTO reduction.
                  </p>
                  
                  <p>
                    On calls they can lie "we will accept", but their past?
                    WE HOLD IT ALL.
                  </p>
                  
                  <p>
                    1000% data driven approach.
                    
                    Even our 10% of AI can verify 10k orders in less than 2 seconds.
                    Takes days to call everyone...
                  </p>
                  
                  <p>
                    Can't lie to us - we have their data.
                    Will lie to your call center.
                  </p>

                  <p>
                    We know about your customers in depth and their behavior.
                    Your team? They don't know about customers at all.
                  </p>
                  
                  <p>
                    We keep credit-like scores for each customer.
                    No tracking, just calling on your end.
                  </p>
                  
                  <p className="font-medium text-trackscore-blue">
                    In short: even 10% of our AI {'>>>>>>>>>>'} manual team.
                  </p>
                  
                  <p className="text-xl">
                    Give your manual verification team a break for 15 days and see the difference.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-white shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-trackscore-text mb-6">AI vs Manual Verification: The Numbers</h2>
              
              <div className="overflow-x-auto">
                <Table className="w-full border-collapse">
                  <TableHeader className="bg-slate-100">
                    <TableRow>
                      <TableHead className="w-1/2 py-4 text-lg font-semibold text-slate-800 border border-slate-200">AI</TableHead>
                      <TableHead className="w-1/2 py-4 text-lg font-semibold text-slate-800 border border-slate-200">Manual Verification Team</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-base border border-slate-200 p-4 font-medium">Verifies <span className="text-trackscore-blue font-bold">10,000 orders</span> in <span className="text-trackscore-blue font-bold">2 seconds</span></TableCell>
                      <TableCell className="text-base border border-slate-200 p-4">Takes <span className="text-red-500 font-medium">days</span> to call</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-base border border-slate-200 p-4 font-medium">Can't be fooled – we have past data</TableCell>
                      <TableCell className="text-base border border-slate-200 p-4">Buyers <span className="text-red-500 font-medium">will lie</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-base border border-slate-200 p-4 font-medium">Knows <span className="text-trackscore-blue font-bold">customer behavior</span> in depth</TableCell>
                      <TableCell className="text-base border border-slate-200 p-4">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-base border border-slate-200 p-4 font-medium">Tracks <span className="text-trackscore-blue font-bold">every order's history</span></TableCell>
                      <TableCell className="text-base border border-slate-200 p-4">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-base border border-slate-200 p-4 font-medium"><span className="text-trackscore-blue font-bold">15x</span> cheaper</TableCell>
                      <TableCell className="text-base border border-slate-200 p-4">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-base border border-slate-200 p-4 font-medium"><span className="text-trackscore-blue font-bold">6x</span> smarter</TableCell>
                      <TableCell className="text-base border border-slate-200 p-4">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-base border border-slate-200 p-4 font-medium"><span className="text-trackscore-blue font-bold">1000x</span> faster</TableCell>
                      <TableCell className="text-base border border-slate-200 p-4">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-base border border-slate-200 p-4 font-medium">Keeps track of <span className="text-trackscore-blue font-bold">₹90 Cr+ buyer data</span> in India</TableCell>
                      <TableCell className="text-base border border-slate-200 p-4">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-trackscore-text mb-3">The ROI is Clear</h3>
                <p className="text-slate-700">
                  Our AI verification system offers dramatically better results at a fraction of the cost. 
                  With comprehensive data coverage, instant processing, and sophisticated behavioral analysis, 
                  TrackScore AI outperforms manual verification in every measurable way.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="technology" className="space-y-6">
          <Card className="bg-white shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-trackscore-text mb-6">Our AI Technology</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-2">Advanced Pattern Recognition</h3>
                  <p className="text-slate-600">
                    Our AI analyzes thousands of data points per customer to identify patterns
                    predictive of return behavior, allowing for precise risk assessment.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><circle cx="18" cy="16" r="3"></circle><circle cx="6" cy="16" r="3"></circle><circle cx="12" cy="10" r="3"></circle><path d="M6 16v-3a5.98 5.98 0 0 1 6-6 5.98 5.98 0 0 1 6 6v3"></path></svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-2">Dynamic Customer Scoring</h3>
                  <p className="text-slate-600">
                    Each customer receives a proprietary risk score that evolves with every
                    transaction, providing a real-time assessment of order reliability.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-2">Behavioral Analysis</h3>
                  <p className="text-slate-600">
                    Our system detects subtle behavioral indicators that human verification teams miss,
                    like ordering patterns, timing preferences, and product selection habits.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-2">Instant Processing</h3>
                  <p className="text-slate-600">
                    Process thousands of orders simultaneously with our distributed AI infrastructure,
                    eliminating the delays inherent in manual verification processes.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 border border-slate-200 rounded-lg">
                <h3 className="text-xl font-semibold text-trackscore-text mb-3">How Our AI Evolves</h3>
                <p className="text-slate-700 mb-4">
                  TrackScore's AI system improves with every order processed, continuously learning from order outcomes
                  to refine its predictive capabilities and adapt to changing customer behaviors.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M20 6 9 17l-5-5"></path></svg>
                    </div>
                    <span className="text-slate-700">Self-learning algorithms that improve with every transaction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M20 6 9 17l-5-5"></path></svg>
                    </div>
                    <span className="text-slate-700">Regional adaptations to account for geographic differences in buying behavior</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M20 6 9 17l-5-5"></path></svg>
                    </div>
                    <span className="text-slate-700">Seasonal adjustments that account for changing purchasing patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M20 6 9 17l-5-5"></path></svg>
                    </div>
                    <span className="text-slate-700">Weekly model retraining with the latest customer data</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HowAIWorks;
