
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentInventory from '@/components/Inventory/CurrentInventory';
import InventoryForecast from '@/components/Inventory/InventoryForecast';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
      </div>

      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="current">Current Inventory</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="mt-6">
          <CurrentInventory />
        </TabsContent>
        <TabsContent value="forecast" className="mt-6">
          <InventoryForecast />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
