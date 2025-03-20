
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CashflowComparison from '@/components/PnL/CashflowComparison';
import CashflowGoalForecast from '@/components/PnL/CashflowGoalForecast';
import LiveCashflowGraph from '@/components/PnL/LiveCashflowGraph';

const CashflowImpact = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Cashflow Impact</h1>
        <p className="text-muted-foreground">
          AI-powered insights and suggestions to improve your business cashflow.
        </p>
      </div>
      
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 h-auto p-0 mb-6 bg-slate-100 rounded-lg">
          <TabsTrigger value="analysis" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            Cashflow Analysis
          </TabsTrigger>
          <TabsTrigger value="forecast" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            Cashflow Forecast
          </TabsTrigger>
          <TabsTrigger value="livegraph" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            Cashflow Graph
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis" className="space-y-6">
          <CashflowComparison />
        </TabsContent>
        
        <TabsContent value="forecast" className="space-y-6">
          <CashflowGoalForecast />
        </TabsContent>
        
        <TabsContent value="livegraph" className="space-y-6">
          <LiveCashflowGraph />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashflowImpact;
