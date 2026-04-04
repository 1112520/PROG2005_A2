import { inventory, Item, ItemCategory, StockStatus } from './item.js';

const output = document.getElementById('output');
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const showAllBtn = document.getElementById('showAllBtn') as HTMLButtonElement;
const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;

showMessage('System initialized. Ready to add items.');

addBtn.addEventListener('click', addItem);
showAllBtn.addEventListener('click', showAllItems);
searchBtn.addEventListener('click', searchItem);

// ------------------------------
// 添加物品
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
    showMessage('❌ Error: Quantity and price must be valid positive numbers!');
    return;
  }

  const exists = inventory.some(item => item.itemId === itemId);
  if (exists) {
    showMessage(`❌ Error: Item ID ${itemId} already exists!`);
    return;
  }

  const newItem: Item = {
    itemId,
    itemName,
    category: categoryInput,
    quantity,
    price,
    supplierName,
    stockStatus: stockStatusInput,
    isPopular,
    comment: comment || undefined
  };

  inventory.push(newItem);
  showMessage(`✅ Item added successfully!\nTotal items: ${inventory.length}`);
  clearForm();
}

// ------------------------------
// 显示所有物品（表格）
// ------------------------------
function showAllItems() {
  if (inventory.length === 0) {
    showMessage('📦 No items in inventory.');
    return;
  }

  let html = `<h3>All Items (Total: ${inventory.length})</h3>`;
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

  for (const item of inventory) {
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
// 按名称搜索（修复兼容版）
// ------------------------------
function searchItem() {
  const keyword = (document.getElementById('searchInput') as HTMLInputElement).value.trim().toLowerCase();

  if (!keyword) {
    showMessage('🔍 Please enter a name to search.');
    return;
  }

  // 修复：includes → indexOf (全版本兼容)
  const results = inventory.filter(item =>
    item.itemName.toLowerCase().indexOf(keyword) !== -1
  );

  if (results.length === 0) {
    showMessage(`❌ No items found for: "${keyword}"`);
    return;
  }

  let html = `<h3>Search Results (${results.length})</h3>`;
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

  for (const item of results) {
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
// 工具函数
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