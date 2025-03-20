
import React, { useState } from 'react';
import { 
  Box, Boxes, Package, ShoppingBag, Plus, Search,
  Shirt, Trophy, TrendingUp, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ProductDetail from './ProductDetail';
import { Product, InventorySummary } from '@/types/inventory';

// Mock data for demonstration
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'T-Shirts',
    icon: 'Shirt',
    totalQuantity: 250,
    daysRemaining: 15,
    salesPercentage: 35,
    isWinningProduct: true,
    dailyShipments: 16.7,
    minimumOrderQuantity: 300,
    leadTimeInDays: 21,
    variants: [
      { id: '101', color: 'Red', size: 'S', sku: 'TS-RED-S', quantity: 50, daysRemaining: 10, dailyShipments: 5, salesPercentage: 20 },
      { id: '102', color: 'Red', size: 'M', sku: 'TS-RED-M', quantity: 75, daysRemaining: 15, dailyShipments: 5, salesPercentage: 20 },
      { id: '103', color: 'Blue', size: 'L', sku: 'TS-BLUE-L', quantity: 125, daysRemaining: 20, dailyShipments: 6.7, salesPercentage: 60 }
    ]
  },
  {
    id: '2',
    name: 'Jackets',
    icon: 'Package',
    totalQuantity: 120,
    daysRemaining: 30,
    salesPercentage: 25,
    dailyShipments: 4,
    minimumOrderQuantity: 150,
    leadTimeInDays: 35,
    variants: [
      { id: '201', color: 'Black', size: 'M', sku: 'JK-BLK-M', quantity: 45, daysRemaining: 25, dailyShipments: 1.8, salesPercentage: 40 },
      { id: '202', color: 'Black', size: 'L', sku: 'JK-BLK-L', quantity: 75, daysRemaining: 35, dailyShipments: 2.2, salesPercentage: 60 }
    ]
  },
  {
    id: '3',
    name: 'Shoes',
    icon: 'ShoppingBag',
    totalQuantity: 85,
    daysRemaining: 7,
    salesPercentage: 22,
    dailyShipments: 12,
    minimumOrderQuantity: 200,
    leadTimeInDays: 28,
    variants: [
      { id: '301', color: 'White', size: '9', sku: 'SH-WHT-9', quantity: 30, daysRemaining: 5, dailyShipments: 6, salesPercentage: 35 },
      { id: '302', color: 'White', size: '10', sku: 'SH-WHT-10', quantity: 35, daysRemaining: 7, dailyShipments: 5, salesPercentage: 45 },
      { id: '303', color: 'Black', size: '9', sku: 'SH-BLK-9', quantity: 20, daysRemaining: 10, dailyShipments: 2, salesPercentage: 20 }
    ]
  },
  {
    id: '4',
    name: 'Accessories',
    icon: 'Box',
    totalQuantity: 300,
    daysRemaining: 45,
    salesPercentage: 18,
    dailyShipments: 6.7,
    minimumOrderQuantity: 250,
    leadTimeInDays: 14,
    variants: [
      { id: '401', sku: 'ACC-BELT-S', quantity: 100, daysRemaining: 40, dailyShipments: 2.5, salesPercentage: 35 },
      { id: '402', sku: 'ACC-BELT-M', quantity: 200, daysRemaining: 50, dailyShipments: 4.2, salesPercentage: 65 }
    ]
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Shirt': return <Shirt />;
    case 'Package': return <Package />;
    case 'ShoppingBag': return <ShoppingBag />;
    case 'Box': return <Box />;
    default: return <Box />;
  }
};

interface CurrentInventoryProps {
  inventorySummary?: InventorySummary;
}

const CurrentInventory: React.FC<CurrentInventoryProps> = ({ inventorySummary }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalInventoryItems = products.reduce((sum, product) => sum + product.totalQuantity, 0);
  const winningProducts = products.filter(product => product.isWinningProduct);

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleCloseProductDetail = () => {
    setIsDetailOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3">
              <Boxes className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Total Inventory</p>
                <p className="text-xl font-bold">{totalInventoryItems} units</p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-3 rounded-lg flex items-center gap-3">
              <Trophy className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm text-slate-500">Winning Products</p>
                <p className="text-xl font-bold">
                  {winningProducts.length > 0 ? winningProducts[0].name : 'None'}
                  <span className="ml-1 text-sm text-green-600">
                    {winningProducts.length > 0 ? `${winningProducts[0].salesPercentage}% of sales` : ''}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex justify-end items-center">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Product
              </Button>
            </div>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="p-4 bg-white border border-slate-200 rounded-lg flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleOpenProductDetail(product)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 relative">
                    {getIconComponent(product.icon)}
                    {product.isWinningProduct && (
                      <span className="absolute -top-1 -right-1 bg-amber-400 rounded-full w-4 h-4 flex items-center justify-center">
                        <Trophy className="h-3 w-3 text-white" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{product.name}</h3>
                      {product.salesPercentage && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {product.salesPercentage}% of sales
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">SKU: {product.variants[0]?.sku.split('-')[0]}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium">{product.totalQuantity} units</p>
                    <div className="flex items-center justify-end gap-1">
                      <p className={`text-sm ${product.daysRemaining < 10 ? 'text-amber-600' : 'text-green-600'}`}>
                        {product.daysRemaining} days left
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Based on {product.dailyShipments?.toFixed(1)} units shipped daily</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isOpen={isDetailOpen}
          onClose={handleCloseProductDetail}
          onSave={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default CurrentInventory;
