
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import CurrentInventory from '@/components/Inventory/CurrentInventory';
import InventoryForecast from '@/components/Inventory/InventoryForecast';
import { InventorySummary } from '@/types/inventory';

// Mock data for inventory summary
const MOCK_INVENTORY_SUMMARY: InventorySummary = {
  totalInventory: 755,
  winningProducts: [
    {
      id: '1',
      name: 'T-Shirts',
      icon: 'Shirt',
      totalQuantity: 250,
      daysRemaining: 15,
      salesPercentage: 35,
      isWinningProduct: true,
      variants: []
    }
  ],
  criticalProducts: [
    {
      id: '3',
      name: 'Shoes',
      icon: 'ShoppingBag',
      totalQuantity: 85,
      daysRemaining: 7,
      salesPercentage: 22,
      dailyShipments: 12,
      variants: []
    }
  ]
};

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [inventorySummary] = useState<InventorySummary>(MOCK_INVENTORY_SUMMARY);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Link to="/second-brain">
          <Button variant="outline" className="gap-2">
            <Brain className="h-4 w-4" />
            Second Brain
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="current">Current Inventory</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="mt-6">
          <CurrentInventory inventorySummary={inventorySummary} />
        </TabsContent>
        <TabsContent value="forecast" className="mt-6">
          <InventoryForecast />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
