
export type ProductVariant = {
  id: string;
  color?: string;
  size?: string;
  sku: string;
  quantity: number;
  daysRemaining: number;
  salesPercentage?: number;
  dailyShipments?: number;
};

export type Product = {
  id: string;
  name: string;
  icon: string;
  totalQuantity: number;
  daysRemaining: number;
  isWinningProduct?: boolean;
  salesPercentage?: number;
  dailyShipments?: number;
  minimumOrderQuantity?: number;
  leadTimeInDays?: number;
  variants: ProductVariant[];
};

export type InventoryAlert = {
  id: string;
  productId: string;
  daysThreshold: number;
  notificationType: 'email' | 'sms' | 'app';
  isActive: boolean;
};

export type InventorySummary = {
  totalInventory: number;
  winningProducts: Product[];
  criticalProducts: Product[];
};
