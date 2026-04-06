// 库存物品分类
export enum ItemCategory {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Stationery = 'Stationery',
  Other = 'Other'
}

// 库存状态
export enum StockStatus {
  InStock = 'InStock',
  LowStock = 'LowStock',
  OutOfStock = 'OutOfStock'
}

// 物品接口（强类型）
export interface Item {
  itemId: string;
  itemName: string;
  category: ItemCategory;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: StockStatus;
  isPopular: boolean;
  comment?: string;
}