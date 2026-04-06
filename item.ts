/**
 * PROG2005 Assignment 2 Part 1
 * Author: xinruima
 * Student ID: 24832562
 * Description: Type definitions for inventory item
 */

// 物品分类枚举
export enum ItemCategory {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous'
}

// 库存状态枚举
export enum StockStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
  OutOfStock = 'Out of Stock'
}

// 物品接口（所有字段严格定义）
export interface Item {
  itemId: string;                  // 唯一
  itemName: string;                // 必填
  category: ItemCategory;          // 必填
  quantity: number;                // 必填（数字）
  price: number;                   // 必填（数字）
  supplierName: string;            // 必填
  stockStatus: StockStatus;        // 必填
  isPopular: boolean;              // 必填（Yes/No）
  comment?: string;                // 可选
}

// 初始化库存数组
export let inventory: Item[] = [];