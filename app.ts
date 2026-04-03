import { inventory, Item, ItemCategory, StockStatus } from './item.js';

const output = document.getElementById('output');
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;

showMessage('System initialized. Ready to add items.');

addBtn.addEventListener('click', addItem);

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

  // 校验
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