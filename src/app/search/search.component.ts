import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Item, ItemCategory } from '../item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText = '';
  selectedCategory = '';
  categories = Object.values(ItemCategory);

  constructor(public inventoryService: InventoryService) {}

  // 搜索过滤逻辑
  get filteredItems(): Item[] {
    let items = this.inventoryService.getItems();

    // 按关键词搜索（ID / 名称）
    if (this.searchText) {
      const keyword = this.searchText.toLowerCase();
      items = items.filter(i =>
        i.itemId.toLowerCase().includes(keyword) ||
        i.itemName.toLowerCase().includes(keyword)
      );
    }

    // 按分类过滤
    if (this.selectedCategory) {
      items = items.filter(i => i.category === this.selectedCategory);
    }

    return items;
  }
}