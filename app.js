"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_js_1 = require("./item.js");
var output = document.getElementById('output');
var addBtn = document.getElementById('addBtn');
showMessage('System initialized. Ready to add items.');
addBtn.addEventListener('click', addItem);
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
    // 校验
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
