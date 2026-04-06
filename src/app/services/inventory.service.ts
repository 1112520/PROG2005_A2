import { Injectable } from '@angular/core';
import { Item, ItemCategory, StockStatus } from '../item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // 全局库存数据
  inventory: Item[] = [];

  constructor() {
    this.initializeDemoData();
  }

  // 初始化测试数据
  private initializeDemoData(): void {
    const demoItems: Item[] = [
      {
        itemId: 'A001',
        itemName: 'Dell Laptop',
        category: ItemCategory.Electronics,
        quantity: 10,
        price: 1299.99,
        supplierName: 'Dell Tech',
        stockStatus: StockStatus.InStock,
        isPopular: true,
        comment: 'Business laptop'
      },
      {
        itemId: 'A002',
        itemName: 'Office Chair',
        category: ItemCategory.Furniture,
        quantity: 5,
        price: 199.99,
        supplierName: 'IKEA',
        stockStatus: StockStatus.LowStock,
        isPopular: false
      }
    ];

    this.inventory = [...demoItems];
  }

  // 获取所有物品
  getItems(): Item[] {
    return [...this.inventory];
  }

  // 根据ID查找
  getItemById(id: string): Item | undefined {
    return this.inventory.find(item => item.itemId === id);
  }

  // 添加物品
  addItem(item: Item): boolean {
    const exists = this.inventory.some(i => i.itemId === item.itemId);
    if (exists) return false;

    this.inventory.push(item);
    return true;
  }

  // 删除物品
  deleteItem(id: string): boolean {
    const index = this.inventory.findIndex(i => i.itemId === id);
    if (index === -1) return false;

    this.inventory.splice(index, 1);
    return true;
  }
}