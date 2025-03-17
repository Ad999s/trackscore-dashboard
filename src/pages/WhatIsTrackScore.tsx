
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, X, Check } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WhatIsTrackScore = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">What is TrackScore?</h1>
          <p className="text-lg text-slate-600">
            TrackScore is an AI-powered RTO management platform that doesn't just identify risks — it helps you solve them.
          </p>
        </div>

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
      </div>
    </div>
  );
};

export default WhatIsTrackScore;
