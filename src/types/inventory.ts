
export type ProductVariant = {
  id: string;
  color?: string;
  size?: string;
  sku: string;
  quantity: number;
  daysRemaining: number;
};

export type Product = {
  id: string;
  name: string;
  icon: string;
  totalQuantity: number;
  daysRemaining: number;
  variants: ProductVariant[];
};

export type InventoryAlert = {
  id: string;
  productId: string;
  daysThreshold: number;
  notificationType: 'email' | 'sms' | 'app';
  isActive: boolean;
};
