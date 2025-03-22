
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComparativeCashflowGraph from '@/components/PnL/ComparativeCashflowGraph';
import CashflowGoalForecast from '@/components/PnL/CashflowGoalForecast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CashflowGraph = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Cashflow Graph</h1>
        <p className="text-muted-foreground">
          Live cashflow visualization comparing performance with and without TrackScore.
        </p>
      </div>
      
      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="live">Live Comparison</TabsTrigger>
          <TabsTrigger value="forecast">Order Goal Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="live" className="space-y-6">
          <ComparativeCashflowGraph />
        </TabsContent>
        
        <TabsContent value="forecast" className="space-y-6">
          <CashflowGoalForecast />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashflowGraph;
