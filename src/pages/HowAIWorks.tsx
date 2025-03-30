
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, Search, Check, X, AlertTriangle, ThumbsDown, PackageX, ShieldAlert } from 'lucide-react';
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
          <TabsTrigger value="hml-scam">High,Mid,Low Risk Scam</TabsTrigger>
          <TabsTrigger value="comparison">AI vs Calling Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="founder" className="space-y-6">
          <Card className="bg-white shadow-soft">
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="leading-relaxed space-y-6 text-slate-800">
                  <div className="pt-4">
                    <h3 className="text-xl font-bold mb-6 text-trackscore-blue text-center">TrackScore: Credit-like Score for Customers</h3>
                    
                    <h3 className="text-xl font-bold mb-4">Why We Have the Best Solution (2 min read, but worth it):</h3>
                    
                    <p className="mb-4">
                      <span className="font-bold">I ran my own e-commerce store</span> and sold over 43,000 units of kitchen products.<br />
                      45% of orders were prepaid.<br />
                      55% of orders were COD.
                    </p>
                    
                    <p className="mb-4">
                      <span className="font-bold">When i noticed the problem:</span><br />
                      My Day 1 profit was negative, and my Day 7 profit was razor-thin.<br />
                      This was because upfront costs—supplier payments, shipping, and marketing—were higher than the prepaid revenue.<br />
                      I also had an RTO of 55%, meaning only 45% of total COD orders were successfully delivered.
                    </p>
                    
                    <p className="mb-4">
                      <span className="font-bold">My Net Profits:</span><br />
                      17%, despite a 75% gross margin and a 4.5x lifetime ROAS.
                    </p>
                    
                    <p className="mb-4">
                      <span className="font-bold">RTO Main Reason:</span><br />
                      RTO is a customer intent problem—customers liked the product on Day 1 but lost interest by Day 5-7.<br />
                      RTO is an industry-wide issue; every brand in India faces it.
                    </p>
                    
                    <p className="mb-4">
                      <span className="font-bold">Current solutions available in market:</span><br />
                      HML (high,medium and low risk) it never worked for us, it blocked huge number of orders, showing generic risk assesment and no actual results in our PNL.
                    </p>
                    
                    <p className="mb-4">
                      <span className="font-bold">Our Team:</span><br />
                      We are a group of 4 friends who have been in e-commerce, faced rto problem for a year.<br /> 
                      Now, all of us are dedicating ourselves full-time to building this solution.
                    </p>
                  </div>
                  
                  <p className="text-xl font-bold text-trackscore-blue mt-8">
                    Others solve RTO for part time hobby project, we do it for fulltime & for passion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hml-scam" className="space-y-6">
          <Card className="bg-white shadow-soft">
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[#f19819]">High,Mid,Low Risk Scam</h2>
                  </div>
                  <p className="text-slate-700 ml-15">They have built a 1 month summer hobby project for RTO.</p>
                </div>
                
                <div className="border-l-4 border-[#f19819] pl-6 py-2 my-6 bg-[#FEF7CD]">
                  <p className="text-lg text-slate-800 italic">
                    "What are you supposed to do with 'medium risk' order? Flip a coin?"
                  </p>
                </div>
                
                <p className="text-lg text-slate-700 mb-8">
                  RTO is not a simple problem, should be handled very carefully. Limiting COD to one kind of group will kill your business overnight and you'll be clueless:
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="bg-amber-100 text-[#f19819] rounded-full h-10 w-10 flex flex-shrink-0 items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="text-xl font-medium text-[#f19819] mb-2">They hurt ROAS by limiting COD to large audiences</h3>
                      <p className="text-slate-700">Lower risk = Lower orders = Wasted ad spend. They reduce RTO by reducing your revenue instead of fixing the problem.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-amber-100 text-[#f19819] rounded-full h-10 w-10 flex flex-shrink-0 items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="text-xl font-medium text-[#f19819] mb-2">They just tell you High, Medium, Low – and give no action plan</h3>
                      <p className="text-slate-700">What are you supposed to do with a "Medium Risk" order? Flip a coin?</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-amber-100 text-[#f19819] rounded-full h-10 w-10 flex flex-shrink-0 items-center justify-center font-bold">3</div>
                  <div>
                      <h3 className="text-xl font-medium text-[#f19819] mb-2">What's the final impact on profit if you reject 100 orders?</h3>
                      <p className="text-slate-700">If they reject 100 risky orders, what is the final impact on profit? What is the new PnL? They don't tell you.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-amber-100 text-[#f19819] rounded-full h-10 w-10 flex flex-shrink-0 items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="text-xl font-medium text-[#f19819] mb-2">They don't understand product-specific RTO trends</h3>
                      <p className="text-slate-700">We do product specific RTO model, our AI is trained on product specific trends and overall business trends.</p>
                      <p className="text-slate-700 mt-2">Different products in your brand have different RTO patterns, but they use the same model for all SKUs and products.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-amber-100 text-[#f19819] rounded-full h-10 w-10 flex flex-shrink-0 items-center justify-center font-bold">5</div>
                    <div>
                      <h3 className="text-xl font-medium text-[#f19819] mb-2">They don't differentiate between types of returns</h3>
                      <p className="text-slate-700">A buyer who RTO'd once due to delivery failure is not the same as a serial scammer—but they don't differentiate.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-amber-100 text-[#f19819] rounded-full h-10 w-10 flex flex-shrink-0 items-center justify-center font-bold">6</div>
                    <div>
                      <h3 className="text-xl font-medium text-[#f19819] mb-2">They don't show you the real P&L impact</h3>
                      <p className="text-slate-700">If they reject 100 risky orders, what if 30 were actually profitable? They don't tell you. We do.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-amber-100 text-[#f19819] rounded-full h-10 w-10 flex flex-shrink-0 items-center justify-center font-bold">7</div>
                    <div>
                      <h3 className="text-xl font-medium text-[#f19819] mb-2">They hurt ROAS by limiting COD to large audiences</h3>
                      <p className="text-slate-700">Lower risk = Lower orders = Wasted ad spend. They reduce RTO by reducing your revenue instead of fixing the problem.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-amber-100 text-[#f19819] rounded-full h-10 w-10 flex flex-shrink-0 items-center justify-center font-bold">8</div>
                    <div>
                      <h3 className="text-xl font-medium text-[#f19819] mb-2">Their job is to show you a better delivery percentage – by hiding COD orders</h3>
                      <p className="text-slate-700">They cut 200 out of 1000 orders and then claim they "improved RTO" when all they did was reject business.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-[#FEF7CD] rounded-lg">
                  <p className="text-xl font-semibold text-[#f19819]">
                    They provide checkout, when they can't actually solve RTO.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-white shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-trackscore-text mb-6">AI vs Calling Team: The Numbers</h2>
              
              <div className="overflow-x-auto">
                <Table className="w-full border-collapse">
                  <TableHeader className="bg-slate-100">
                    <TableRow>
                      <TableHead className="w-1/2 py-4 text-lg font-semibold text-slate-800 border border-slate-200">AI</TableHead>
                      <TableHead className="w-1/2 py-4 text-lg font-semibold text-slate-800 border border-slate-200">Calling Team</TableHead>
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
      </Tabs>
    </div>
  );
};

export default HowAIWorks;
