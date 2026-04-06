import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { Item, ItemCategory, StockStatus } from '../item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  itemId = '';
  itemName = '';
  category: ItemCategory = ItemCategory.Other;
  quantity = 0;
  price = 0;
  supplierName = '';
  stockStatus: StockStatus = StockStatus.InStock;
  isPopular = false;
  comment = '';

  categories = Object.values(ItemCategory);
  statuses = Object.values(StockStatus);

  constructor(public inventoryService: InventoryService) {}

  addItem(): void {
    if (!this.itemId || !this.itemName) {
      alert('ID & Name required!');
      return;
    }

    const newItem: Item = {
      itemId: this.itemId,
      itemName: this.itemName,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplierName: this.supplierName,
      stockStatus: this.stockStatus,
      isPopular: this.isPopular,
      comment: this.comment
    };

    const success = this.inventoryService.addItem(newItem);
    if (success) {
      alert('Item added!');
      this.clearForm();
    } else {
      alert('ID already exists!');
    }
  }

  deleteItem(id: string): void {
    if (confirm('Delete?')) {
      this.inventoryService.deleteItem(id);
      alert('Deleted!');
    }
  }

  clearForm(): void {
    this.itemId = '';
    this.itemName = '';
    this.category = ItemCategory.Other;
    this.quantity = 0;
    this.price = 0;
    this.supplierName = '';
    this.stockStatus = StockStatus.InStock;
    this.isPopular = false;
    this.comment = '';
  }
}
