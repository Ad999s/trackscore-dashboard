
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComparativeCashflowGraph from '@/components/PnL/ComparativeCashflowGraph';

const CashflowGraph = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Cashflow Graph</h1>
        <p className="text-muted-foreground">
          Live cashflow visualization comparing performance with and without TrackScore.
        </p>
      </div>
      
      <div className="space-y-6">
        <ComparativeCashflowGraph />
      </div>
    </div>
  );
};

export default CashflowGraph;
