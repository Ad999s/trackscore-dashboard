
import React, { useState, useEffect } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Paintbrush, Ruler, Tag, Plus, Save, Minus, Trash2, TrendingUp, Clock } from "lucide-react";
import { Product, ProductVariant } from '@/types/inventory';

interface ProductDetailProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, isOpen, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product });
  const [newVariant, setNewVariant] = useState<Partial<ProductVariant>>({
    color: '',
    size: '',
    sku: '',
    quantity: 0,
    daysRemaining: 0,
    salesPercentage: 0,
    dailyShipments: 0
  });
  const [isAddingVariant, setIsAddingVariant] = useState(false);

  useEffect(() => {
    // Reset edited product when the product changes
    setEditedProduct({ ...product });
  }, [product]);

  const calculateTotalQuantity = (variants: ProductVariant[]) => {
    return variants.reduce((sum, variant) => sum + variant.quantity, 0);
  };

  const calculateMinDaysRemaining = (variants: ProductVariant[]) => {
    if (variants.length === 0) return 0;
    return Math.min(...variants.map(v => v.daysRemaining));
  };

  const handleVariantQuantityChange = (variantId: string, value: number) => {
    const updatedVariants = editedProduct.variants.map(variant => 
      variant.id === variantId 
        ? { ...variant, quantity: value }
        : variant
    );
    
    setEditedProduct({
      ...editedProduct,
      variants: updatedVariants,
      totalQuantity: calculateTotalQuantity(updatedVariants),
      daysRemaining: calculateMinDaysRemaining(updatedVariants)
    });
  };

  const handleVariantDaysChange = (variantId: string, value: number) => {
    const updatedVariants = editedProduct.variants.map(variant => 
      variant.id === variantId 
        ? { ...variant, daysRemaining: value }
        : variant
    );
    
    setEditedProduct({
      ...editedProduct,
      variants: updatedVariants,
      daysRemaining: calculateMinDaysRemaining(updatedVariants)
    });
  };

  const handleDeleteVariant = (variantId: string) => {
    const updatedVariants = editedProduct.variants.filter(v => v.id !== variantId);
    
    setEditedProduct({
      ...editedProduct,
      variants: updatedVariants,
      totalQuantity: calculateTotalQuantity(updatedVariants),
      daysRemaining: calculateMinDaysRemaining(updatedVariants)
    });
  };

  const handleAddVariant = () => {
    if (!newVariant.sku || !newVariant.quantity) return;
    
    const variant: ProductVariant = {
      id: `new-${Date.now()}`,
      color: newVariant.color || undefined,
      size: newVariant.size || undefined,
      sku: newVariant.sku || '',
      quantity: newVariant.quantity || 0,
      daysRemaining: newVariant.daysRemaining || 0,
      salesPercentage: newVariant.salesPercentage || 0,
      dailyShipments: newVariant.dailyShipments || 0
    };
    
    const updatedVariants = [...editedProduct.variants, variant];
    
    setEditedProduct({
      ...editedProduct,
      variants: updatedVariants,
      totalQuantity: calculateTotalQuantity(updatedVariants),
      daysRemaining: calculateMinDaysRemaining(updatedVariants)
    });
    
    // Reset form
    setNewVariant({
      color: '',
      size: '',
      sku: '',
      quantity: 0,
      daysRemaining: 0,
      salesPercentage: 0,
      dailyShipments: 0
    });
    setIsAddingVariant(false);
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>{editedProduct.name} Inventory</SheetTitle>
          <SheetDescription>
            View and manage inventory for this product
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-slate-500">Total Quantity</p>
            <p className="text-xl font-bold">{editedProduct.totalQuantity} items</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Days Remaining</p>
            <p className={`text-xl font-bold ${editedProduct.daysRemaining < 10 ? 'text-amber-600' : 'text-green-600'}`}>
              {editedProduct.daysRemaining} days
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Sales Contribution</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <p className="text-xl font-bold">{editedProduct.salesPercentage || 0}%</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-500">Daily Shipments</p>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-purple-500" />
              <p className="text-xl font-bold">{editedProduct.dailyShipments?.toFixed(1) || 0}</p>
            </div>
          </div>
        </div>
        
        {editedProduct.minimumOrderQuantity && (
          <div className="bg-blue-50 p-3 rounded-md mb-6">
            <p className="text-sm font-medium flex items-center gap-1 text-blue-700">
              <Plus className="h-4 w-4" />
              Suggested Reorder: {editedProduct.minimumOrderQuantity} units
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Lead time: {editedProduct.leadTimeInDays} days
            </p>
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Product Variants</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => setIsAddingVariant(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Variant
              </Button>
            </div>
            
            {isAddingVariant && (
              <div className="p-4 border rounded-md mb-4 bg-slate-50">
                <h4 className="font-medium mb-3">New Variant</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label htmlFor="new-color">Color</Label>
                    <div className="flex items-center mt-1">
                      <Paintbrush className="h-4 w-4 mr-2 text-slate-400" />
                      <Input 
                        id="new-color"
                        value={newVariant.color || ''}
                        onChange={(e) => setNewVariant({...newVariant, color: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-size">Size</Label>
                    <div className="flex items-center mt-1">
                      <Ruler className="h-4 w-4 mr-2 text-slate-400" />
                      <Input 
                        id="new-size"
                        value={newVariant.size || ''}
                        onChange={(e) => setNewVariant({...newVariant, size: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <Label htmlFor="new-sku">SKU</Label>
                  <div className="flex items-center mt-1">
                    <Tag className="h-4 w-4 mr-2 text-slate-400" />
                    <Input 
                      id="new-sku"
                      value={newVariant.sku || ''}
                      onChange={(e) => setNewVariant({...newVariant, sku: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <Label htmlFor="new-quantity">Quantity</Label>
                    <Input 
                      id="new-quantity"
                      type="number"
                      min="0"
                      value={newVariant.quantity || ''}
                      onChange={(e) => setNewVariant({...newVariant, quantity: parseInt(e.target.value) || 0})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-days">Days Remaining</Label>
                    <Input 
                      id="new-days"
                      type="number"
                      min="0"
                      value={newVariant.daysRemaining || ''}
                      onChange={(e) => setNewVariant({...newVariant, daysRemaining: parseInt(e.target.value) || 0})}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddingVariant(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleAddVariant}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variant</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead>Sales %</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editedProduct.variants.map(variant => (
                  <TableRow key={variant.id}>
                    <TableCell>
                      {variant.color && <span className="text-sm">{variant.color}</span>}
                      {variant.color && variant.size && <span className="mx-1">•</span>}
                      {variant.size && <span className="text-sm">{variant.size}</span>}
                      {!variant.color && !variant.size && <span className="text-sm text-slate-500">Default</span>}
                    </TableCell>
                    <TableCell>{variant.sku}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => handleVariantQuantityChange(variant.id, Math.max(0, variant.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input 
                          className="mx-2 w-16 h-8 text-center" 
                          type="number" 
                          min="0"
                          value={variant.quantity}
                          onChange={(e) => handleVariantQuantityChange(variant.id, parseInt(e.target.value) || 0)}
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => handleVariantQuantityChange(variant.id, variant.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input 
                        className="w-16 h-8" 
                        type="number" 
                        min="0" 
                        value={variant.daysRemaining}
                        onChange={(e) => handleVariantDaysChange(variant.id, parseInt(e.target.value) || 0)}
                      />
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium rounded-full bg-blue-100 text-blue-800 px-2 py-0.5">
                        {variant.salesPercentage || 0}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-red-500"
                        onClick={() => handleDeleteVariant(variant.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDetail;
