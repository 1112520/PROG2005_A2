"use strict";
/**
 * PROG2005 Assignment 2 Part 1
 * Student ID: [你的学号]
 * Name: [你的名字]
 * HD Version - Inventory Management System
 */
Object.defineProperty(exports, "__esModule", { value: true });
var item_js_1 = require("./item.js");
// UI Elements
var output = document.getElementById('output');
var addBtn = document.getElementById('addBtn');
var editBtn = document.getElementById('editBtn');
var deleteBtn = document.getElementById('deleteBtn');
var showAllBtn = document.getElementById('showAllBtn');
var showPopularBtn = document.getElementById('showPopularBtn');
var searchBtn = document.getElementById('searchBtn');
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
    if (item_js_1.inventory.length === 0) {
        var demoItems = [
            {
                itemId: 'D001',
                itemName: 'Laptop',
                category: item_js_1.ItemCategory.Electronics,
                quantity: 15,
                price: 1299.99,
                supplierName: 'Dell',
                stockStatus: item_js_1.StockStatus.InStock,
                isPopular: true,
                comment: 'Business laptop'
            },
            {
                itemId: 'D002',
                itemName: 'Office Chair',
                category: item_js_1.ItemCategory.Furniture,
                quantity: 8,
                price: 199.99,
                supplierName: 'IKEA',
                stockStatus: item_js_1.StockStatus.LowStock,
                isPopular: false
            }
        ];
        demoItems.forEach(function (item) { return item_js_1.inventory.push(item); });
    }
}
// ------------------------------
// Add Item
// ------------------------------
function addItem() {
    var itemId = document.getElementById('itemId').value.trim();
    var itemName = document.getElementById('itemName').value.trim();
    var categoryInput = document.getElementById('category').value.trim();
    var quantity = Number(document.getElementById('quantity').value);
    var price = Number(document.getElementById('price').value);
    var supplierName = document.getElementById('supplierName').value.trim();
    var stockStatusInput = document.getElementById('stockStatus').value.trim();
    var isPopular = document.getElementById('isPopular').checked;
    var comment = document.getElementById('comment').value.trim();
    if (!itemId || !itemName || !categoryInput || !supplierName || !stockStatusInput) {
        showMessage('❌ Error: All fields except comment are required!');
        return;
    }
    if (isNaN(quantity) || quantity < 0 || isNaN(price) || price < 0) {
        showMessage('❌ Error: Quantity & Price must be valid positive numbers!');
        return;
    }
    var exists = item_js_1.inventory.some(function (i) { return i.itemId === itemId; });
    if (exists) {
        showMessage("\u274C Error: Item ID ".concat(itemId, " already exists!"));
        return;
    }
    var newItem = {
        itemId: itemId,
        itemName: itemName,
        category: categoryInput,
        quantity: quantity,
        price: price,
        supplierName: supplierName,
        stockStatus: stockStatusInput,
        isPopular: isPopular,
        comment: comment || undefined
    };
    item_js_1.inventory.push(newItem);
    showMessage("\u2705 Item added successfully! Total items: ".concat(item_js_1.inventory.length));
    clearForm();
}
// ------------------------------
// Edit Item (Fixed for ES5 Compatibility)
// ------------------------------
function editItem() {
    var itemId = document.getElementById('itemId').value.trim();
    var itemName = document.getElementById('itemName').value.trim();
    var categoryInput = document.getElementById('category').value.trim();
    var quantity = Number(document.getElementById('quantity').value);
    var price = Number(document.getElementById('price').value);
    var supplierName = document.getElementById('supplierName').value.trim();
    var stockStatusInput = document.getElementById('stockStatus').value.trim();
    var isPopular = document.getElementById('isPopular').checked;
    var comment = document.getElementById('comment').value.trim();
    // 修复：手写查找 index，不使用 findIndex
    var index = -1;
    for (var i = 0; i < item_js_1.inventory.length; i++) {
        if (item_js_1.inventory[i].itemId === itemId) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        showMessage("\u274C Error: Item ID ".concat(itemId, " not found!"));
        return;
    }
    item_js_1.inventory[index] = {
        itemId: itemId,
        itemName: itemName,
        category: categoryInput,
        quantity: quantity,
        price: price,
        supplierName: supplierName,
        stockStatus: stockStatusInput,
        isPopular: isPopular,
        comment: comment || undefined
    };
    showMessage("\u2705 Item ID ".concat(itemId, " updated successfully!"));
    clearForm();
}
// ------------------------------
// Delete Item
// ------------------------------
function deleteItem() {
    var targetId = document.getElementById('searchInput').value.trim();
    if (!targetId) {
        showMessage('❌ Please enter an Item ID to delete!');
        return;
    }
    if (!confirm('⚠️ Are you sure you want to delete this item?'))
        return;
    var originalLength = item_js_1.inventory.length;
    var filteredItems = item_js_1.inventory.filter(function (i) { return i.itemId !== targetId; });
    if (filteredItems.length === originalLength) {
        showMessage("\u274C Item ID ".concat(targetId, " not found!"));
        return;
    }
    item_js_1.inventory.length = 0;
    filteredItems.forEach(function (item) { return item_js_1.inventory.push(item); });
    showMessage("\u2705 Item ID ".concat(targetId, " deleted successfully!"));
}
// ------------------------------
// Show All Items
// ------------------------------
function showAllItems() {
    if (item_js_1.inventory.length === 0) {
        showMessage('📦 Inventory is empty.');
        return;
    }
    renderTable(item_js_1.inventory, "All Inventory Items (Total: ".concat(item_js_1.inventory.length, ")"));
}
// ------------------------------
// Show Popular Items
// ------------------------------
function showPopularItems() {
    var popularItems = item_js_1.inventory.filter(function (item) { return item.isPopular; });
    if (popularItems.length === 0) {
        showMessage('⭐ No popular items in inventory.');
        return;
    }
    renderTable(popularItems, "Popular Items (Total: ".concat(popularItems.length, ")"));
}
// ------------------------------
// Search by Name
// ------------------------------
function searchItem() {
    var keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!keyword) {
        showMessage('🔍 Please enter an item name to search!');
        return;
    }
    var results = item_js_1.inventory.filter(function (item) {
        return item.itemName.toLowerCase().indexOf(keyword) !== -1;
    });
    if (results.length === 0) {
        showMessage("\u274C No items found for: \"".concat(keyword, "\""));
        return;
    }
    renderTable(results, "Search Results (Found: ".concat(results.length, ")"));
}
// ------------------------------
// Render Table (Reusable HD Function)
// ------------------------------
function renderTable(items, title) {
    var html = "<h3>".concat(title, "</h3>");
    html += "\n  <table>\n    <tr>\n      <th>ID</th>\n      <th>Name</th>\n      <th>Category</th>\n      <th>Qty</th>\n      <th>Price</th>\n      <th>Supplier</th>\n      <th>Stock</th>\n      <th>Popular</th>\n    </tr>\n  ";
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        html += "\n    <tr>\n      <td>".concat(item.itemId, "</td>\n      <td>").concat(item.itemName, "</td>\n      <td>").concat(item.category, "</td>\n      <td>").concat(item.quantity, "</td>\n      <td>$").concat(item.price.toFixed(2), "</td>\n      <td>").concat(item.supplierName, "</td>\n      <td>").concat(item.stockStatus, "</td>\n      <td>").concat(item.isPopular ? '✅' : '❌', "</td>\n    </tr>\n    ");
    }
    html += "</table>";
    if (output)
        output.innerHTML = html;
}
// ------------------------------
// Helper Functions
// ------------------------------
function showMessage(msg) {
    if (output)
        output.innerText = msg;
}
function clearForm() {
    document.getElementById('itemId').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('category').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    document.getElementById('supplierName').value = '';
    document.getElementById('stockStatus').value = '';
    document.getElementById('isPopular').checked = false;
    document.getElementById('comment').value = '';
}
