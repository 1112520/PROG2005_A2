"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_js_1 = require("./item.js");
var output = document.getElementById('output');
var addBtn = document.getElementById('addBtn');
var showAllBtn = document.getElementById('showAllBtn');
var searchBtn = document.getElementById('searchBtn');
showMessage('System initialized. Ready to add items.');
addBtn.addEventListener('click', addItem);
showAllBtn.addEventListener('click', showAllItems);
searchBtn.addEventListener('click', searchItem);
// ------------------------------
// 添加物品
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
        showMessage('❌ Error: Quantity and price must be valid positive numbers!');
        return;
    }
    var exists = item_js_1.inventory.some(function (item) { return item.itemId === itemId; });
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
    showMessage("\u2705 Item added successfully!\nTotal items: ".concat(item_js_1.inventory.length));
    clearForm();
}
// ------------------------------
// 显示所有物品（表格）
// ------------------------------
function showAllItems() {
    if (item_js_1.inventory.length === 0) {
        showMessage('📦 No items in inventory.');
        return;
    }
    var html = "<h3>All Items (Total: ".concat(item_js_1.inventory.length, ")</h3>");
    html += "\n  <table>\n    <tr>\n      <th>ID</th>\n      <th>Name</th>\n      <th>Category</th>\n      <th>Qty</th>\n      <th>Price</th>\n      <th>Supplier</th>\n      <th>Stock</th>\n      <th>Popular</th>\n    </tr>\n  ";
    for (var _i = 0, inventory_1 = item_js_1.inventory; _i < inventory_1.length; _i++) {
        var item = inventory_1[_i];
        html += "\n    <tr>\n      <td>".concat(item.itemId, "</td>\n      <td>").concat(item.itemName, "</td>\n      <td>").concat(item.category, "</td>\n      <td>").concat(item.quantity, "</td>\n      <td>$").concat(item.price.toFixed(2), "</td>\n      <td>").concat(item.supplierName, "</td>\n      <td>").concat(item.stockStatus, "</td>\n      <td>").concat(item.isPopular ? '✅' : '❌', "</td>\n    </tr>\n    ");
    }
    html += "</table>";
    if (output)
        output.innerHTML = html;
}
// ------------------------------
// 按名称搜索（修复兼容版）
// ------------------------------
function searchItem() {
    var keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!keyword) {
        showMessage('🔍 Please enter a name to search.');
        return;
    }
    // 修复：includes → indexOf (全版本兼容)
    var results = item_js_1.inventory.filter(function (item) {
        return item.itemName.toLowerCase().indexOf(keyword) !== -1;
    });
    if (results.length === 0) {
        showMessage("\u274C No items found for: \"".concat(keyword, "\""));
        return;
    }
    var html = "<h3>Search Results (".concat(results.length, ")</h3>");
    html += "\n  <table>\n    <tr>\n      <th>ID</th>\n      <th>Name</th>\n      <th>Category</th>\n      <th>Qty</th>\n      <th>Price</th>\n      <th>Supplier</th>\n      <th>Stock</th>\n      <th>Popular</th>\n    </tr>\n  ";
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var item = results_1[_i];
        html += "\n    <tr>\n      <td>".concat(item.itemId, "</td>\n      <td>").concat(item.itemName, "</td>\n      <td>").concat(item.category, "</td>\n      <td>").concat(item.quantity, "</td>\n      <td>$").concat(item.price.toFixed(2), "</td>\n      <td>").concat(item.supplierName, "</td>\n      <td>").concat(item.stockStatus, "</td>\n      <td>").concat(item.isPopular ? '✅' : '❌', "</td>\n    </tr>\n    ");
    }
    html += "</table>";
    if (output)
        output.innerHTML = html;
}
// ------------------------------
// 工具函数
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
