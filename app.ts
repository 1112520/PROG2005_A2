/**
 * PROG2005 Assignment 2 Part 1
 * Student ID: [你的学号]
 * Name: [你的名字]
 * HD Version - Inventory Management System
 */

import { inventory, Item, ItemCategory, StockStatus } from './item.js';

// UI Elements
const output = document.getElementById('output');
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const editBtn = document.getElementById('editBtn') as HTMLButtonElement;
const deleteBtn = document.getElementById('deleteBtn') as HTMLButtonElement;
const showAllBtn = document.getElementById('showAllBtn') as HTMLButtonElement;
const showPopularBtn = document.getElementById('showPopularBtn') as HTMLButtonElement;
const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;

// Initialize system with demo data (HD requirement)
initializeDemoData();
showMessage('✅ System initialized (HD Version) | Ready to use');

// Event Listeners
addBtn.addEventListener('click', addItem);
editBtn.addEventListener('click', editItem);
deleteBtn.addEventListener('click', deleteItem);
showAllBtn.addEventListener('click', showAllItems);
showPopularBtn.addEventListener('click', showPopularItems);
searchBtn.addEventListener('click', searchItem);

// ------------------------------
// Demo Data (for assessment demo)
// ------------------------------
function initializeDemoData() {
  if (inventory.length === 0) {
    const demoItems: Item[] = [
      {
        itemId: 'D001',
        itemName: 'Laptop',
        category: ItemCategory.Electronics,
        quantity: 15,
        price: 1299.99,
        supplierName: 'Dell',
        stockStatus: StockStatus.InStock,
        isPopular: true,
        comment: 'Business laptop'
      },
      {
        itemId: 'D002',
        itemName: 'Office Chair',
        category: ItemCategory.Furniture,
        quantity: 8,
        price: 199.99,
        supplierName: 'IKEA',
        stockStatus: StockStatus.LowStock,
        isPopular: false
      }
    ];
    demoItems.forEach(item => inventory.push(item));
  }
}

// ------------------------------
// Add Item
// ------------------------------
function addItem() {
  const itemId = (document.getElementById('itemId') as HTMLInputElement).value.trim();
  const itemName = (document.getElementById('itemName') as HTMLInputElement).value.trim();
  const categoryInput = (document.getElementById('category') as HTMLInputElement).value.trim() as ItemCategory;
  const quantity = Number((document.getElementById('quantity') as HTMLInputElement).value);
  const price = Number((document.getElementById('price') as HTMLInputElement).value);
  const supplierName = (document.getElementById('supplierName') as HTMLInputElement).value.trim();
  const stockStatusInput = (document.getElementById('stockStatus') as HTMLInputElement).value.trim() as StockStatus;
  const isPopular = (document.getElementById('isPopular') as HTMLInputElement).checked;
  const comment = (document.getElementById('comment') as HTMLInputElement).value.trim();

  if (!itemId || !itemName || !categoryInput || !supplierName || !stockStatusInput) {
    showMessage('❌ Error: All fields except comment are required!');
    return;
  }

  if (isNaN(quantity) || quantity < 0 || isNaN(price) || price < 0) {
    showMessage('❌ Error: Quantity & Price must be valid positive numbers!');
    return;
  }

  const exists = inventory.some(i => i.itemId === itemId);
  if (exists) {
    showMessage(`❌ Error: Item ID ${itemId} already exists!`);
    return;
  }

  const newItem: Item = {
    itemId, itemName, category: categoryInput, quantity, price,
    supplierName, stockStatus: stockStatusInput, isPopular,
    comment: comment || undefined
  };

  inventory.push(newItem);
  showMessage(`✅ Item added successfully! Total items: ${inventory.length}`);
  clearForm();
}

// ------------------------------
// Edit Item (Fixed for ES5 Compatibility)
// ------------------------------
function editItem() {
  const itemId = (document.getElementById('itemId') as HTMLInputElement).value.trim();
  const itemName = (document.getElementById('itemName') as HTMLInputElement).value.trim();
  const categoryInput = (document.getElementById('category') as HTMLInputElement).value.trim() as ItemCategory;
  const quantity = Number((document.getElementById('quantity') as HTMLInputElement).value);
  const price = Number((document.getElementById('price') as HTMLInputElement).value);
  const supplierName = (document.getElementById('supplierName') as HTMLInputElement).value.trim();
  const stockStatusInput = (document.getElementById('stockStatus') as HTMLInputElement).value.trim() as StockStatus;
  const isPopular = (document.getElementById('isPopular') as HTMLInputElement).checked;
  const comment = (document.getElementById('comment') as HTMLInputElement).value.trim();

  // 修复：手写查找 index，不使用 findIndex
  let index = -1;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].itemId === itemId) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    showMessage(`❌ Error: Item ID ${itemId} not found!`);
    return;
  }

  inventory[index] = {
    itemId, itemName, category: categoryInput, quantity, price,
    supplierName, stockStatus: stockStatusInput, isPopular,
    comment: comment || undefined
  };

  showMessage(`✅ Item ID ${itemId} updated successfully!`);
  clearForm();
}

// ------------------------------
// Delete Item
// ------------------------------
function deleteItem() {
  const targetId = (document.getElementById('searchInput') as HTMLInputElement).value.trim();
  if (!targetId) {
    showMessage('❌ Please enter an Item ID to delete!');
    return;
  }

  if (!confirm('⚠️ Are you sure you want to delete this item?')) return;

  const originalLength = inventory.length;
  const filteredItems = inventory.filter(i => i.itemId !== targetId);

  if (filteredItems.length === originalLength) {
    showMessage(`❌ Item ID ${targetId} not found!`);
    return;
  }

  inventory.length = 0;
  filteredItems.forEach(item => inventory.push(item));
  showMessage(`✅ Item ID ${targetId} deleted successfully!`);
}

// ------------------------------
// Show All Items
// ------------------------------
function showAllItems() {
  if (inventory.length === 0) {
    showMessage('📦 Inventory is empty.');
    return;
  }
  renderTable(inventory, `All Inventory Items (Total: ${inventory.length})`);
}

// ------------------------------
// Show Popular Items
// ------------------------------
function showPopularItems() {
  const popularItems = inventory.filter(item => item.isPopular);
  if (popularItems.length === 0) {
    showMessage('⭐ No popular items in inventory.');
    return;
  }
  renderTable(popularItems, `Popular Items (Total: ${popularItems.length})`);
}

// ------------------------------
// Search by Name
// ------------------------------
function searchItem() {
  const keyword = (document.getElementById('searchInput') as HTMLInputElement).value.trim().toLowerCase();
  if (!keyword) {
    showMessage('🔍 Please enter an item name to search!');
    return;
  }

  const results = inventory.filter(item =>
    item.itemName.toLowerCase().indexOf(keyword) !== -1
  );

  if (results.length === 0) {
    showMessage(`❌ No items found for: "${keyword}"`);
    return;
  }

  renderTable(results, `Search Results (Found: ${results.length})`);
}

// ------------------------------
// Render Table (Reusable HD Function)
// ------------------------------
function renderTable(items: Item[], title: string) {
  let html = `<h3>${title}</h3>`;
  html += `
  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Supplier</th>
      <th>Stock</th>
      <th>Popular</th>
    </tr>
  `;

  for (const item of items) {
    html += `
    <tr>
      <td>${item.itemId}</td>
      <td>${item.itemName}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.supplierName}</td>
      <td>${item.stockStatus}</td>
      <td>${item.isPopular ? '✅' : '❌'}</td>
    </tr>
    `;
  }

  html += `</table>`;
  if (output) output.innerHTML = html;
}

// ------------------------------
// Helper Functions
// ------------------------------
function showMessage(msg: string) {
  if (output) output.innerText = msg;
}

function clearForm() {
  (document.getElementById('itemId') as HTMLInputElement).value = '';
  (document.getElementById('itemName') as HTMLInputElement).value = '';
  (document.getElementById('category') as HTMLInputElement).value = '';
  (document.getElementById('quantity') as HTMLInputElement).value = '';
  (document.getElementById('price') as HTMLInputElement).value = '';
  (document.getElementById('supplierName') as HTMLInputElement).value = '';
  (document.getElementById('stockStatus') as HTMLInputElement).value = '';
  (document.getElementById('isPopular') as HTMLInputElement).checked = false;
  (document.getElementById('comment') as HTMLInputElement).value = '';
}