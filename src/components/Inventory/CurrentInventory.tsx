
import React, { useState } from 'react';
import { 
  Box, Boxes, Package, ShoppingBag, Plus, Search,
  Shirt, Tags, Paintbrush, Ruler
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import ProductDetail from './ProductDetail';
import { Product } from '@/types/inventory';

// Mock data for demonstration
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'T-Shirts',
    icon: 'Shirt',
    totalQuantity: 250,
    daysRemaining: 15,
    variants: [
      { id: '101', color: 'Red', size: 'S', sku: 'TS-RED-S', quantity: 50, daysRemaining: 10 },
      { id: '102', color: 'Red', size: 'M', sku: 'TS-RED-M', quantity: 75, daysRemaining: 15 },
      { id: '103', color: 'Blue', size: 'L', sku: 'TS-BLUE-L', quantity: 125, daysRemaining: 20 }
    ]
  },
  {
    id: '2',
    name: 'Jackets',
    icon: 'Package',
    totalQuantity: 120,
    daysRemaining: 30,
    variants: [
      { id: '201', color: 'Black', size: 'M', sku: 'JK-BLK-M', quantity: 45, daysRemaining: 25 },
      { id: '202', color: 'Black', size: 'L', sku: 'JK-BLK-L', quantity: 75, daysRemaining: 35 }
    ]
  },
  {
    id: '3',
    name: 'Shoes',
    icon: 'ShoppingBag',
    totalQuantity: 85,
    daysRemaining: 7,
    variants: [
      { id: '301', color: 'White', size: '9', sku: 'SH-WHT-9', quantity: 30, daysRemaining: 5 },
      { id: '302', color: 'White', size: '10', sku: 'SH-WHT-10', quantity: 35, daysRemaining: 7 },
      { id: '303', color: 'Black', size: '9', sku: 'SH-BLK-9', quantity: 20, daysRemaining: 10 }
    ]
  },
  {
    id: '4',
    name: 'Accessories',
    icon: 'Box',
    totalQuantity: 300,
    daysRemaining: 45,
    variants: [
      { id: '401', sku: 'ACC-BELT-S', quantity: 100, daysRemaining: 40 },
      { id: '402', sku: 'ACC-BELT-M', quantity: 200, daysRemaining: 50 }
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

const CurrentInventory = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalInventoryItems = products.reduce((sum, product) => sum + product.totalQuantity, 0);

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
          <div className="flex items-center justify-between mb-6">
            <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3">
              <Boxes className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Total Inventory</p>
                <p className="text-xl font-bold">{totalInventoryItems} items</p>
              </div>
            </div>
            
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Product
            </Button>
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
                  <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">
                    {getIconComponent(product.icon)}
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-slate-500">SKU: {product.variants[0]?.sku.split('-')[0]}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium">{product.totalQuantity} items</p>
                    <p className={`text-sm ${product.daysRemaining < 10 ? 'text-amber-600' : 'text-green-600'}`}>
                      {product.daysRemaining} days left
                    </p>
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
