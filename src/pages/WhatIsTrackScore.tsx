
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
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
                      <TableHead className="w-1/2 py-3 text-center">High Medium Low Risk Tools</TableHead>
                      <TableHead className="w-1/2 text-center bg-blue-50 text-blue-700">TrackScore AI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Generic RTO predictor based on static rules</TableCell>
                      <TableCell className="bg-blue-50 text-blue-700">Personalized order selection tailored to your needs</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>No product-specific RTO analysis; same analysis for every product</TableCell>
                      <TableCell className="bg-blue-50 text-blue-700">PST (Product-Specific Training), e.g., separate AI for each product's performance</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>No seller-specific RTO model; a generic RTO model for every business</TableCell>
                      <TableCell className="bg-blue-50 text-blue-700">Seller-specific RTO model</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>No actionable steps</TableCell>
                      <TableCell className="bg-blue-50 text-blue-700">Intelligently separates profitable orders from risk orders</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>No active learning based on the seller's business/brand</TableCell>
                      <TableCell className="bg-blue-50 text-blue-700">Continuously trains based on the seller's specific business type</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Trained on 25+ parameters</TableCell>
                      <TableCell className="bg-blue-50 text-blue-700">Trained on 180+ parameters</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Performance on Day 1 remains the same on Day 100</TableCell>
                      <TableCell className="bg-blue-50 text-blue-700">AI improves over time, learning from past and current data</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>No tracking of canceled orders' impact on the P&L sheet</TableCell>
                      <TableCell className="bg-blue-50 text-blue-700">Tracks canceled orders' impact on the P&L sheet with real-time learning</TableCell>
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
