
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SuggestionTab from '@/components/Reports/SuggestionTab';

const CashflowCompanion = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Cashflow Companion</h1>
        <p className="text-muted-foreground">
          AI-powered insights and suggestions to improve your business cashflow.
        </p>
      </div>
      
      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 h-auto p-0 mb-6">
          <TabsTrigger value="suggestions" className="py-2.5">Suggestions</TabsTrigger>
          <TabsTrigger value="analysis" className="py-2.5">Cashflow Analysis</TabsTrigger>
          <TabsTrigger value="forecast" className="py-2.5">Cashflow Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggestions" className="space-y-6">
          <SuggestionTab />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cashflow Analysis</CardTitle>
              <CardDescription>
                Detailed analysis of your business cashflow over time.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center border-t">
              <p className="text-muted-foreground">Cashflow analysis content coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cashflow Forecast</CardTitle>
              <CardDescription>
                Predictive analysis of your future cashflow based on historical data.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center border-t">
              <p className="text-muted-foreground">Cashflow forecast content coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashflowCompanion;
