/**
 * PROG2005 Assignment 2 Part 1
 * Author: 你的名字
 * Student ID: 你的学号
 * Description: Main application logic
 */

import { inventory, Item } from './item.js';

// 初始化提示
const output = document.getElementById('output');
if (output) {
  output.innerHTML = `
    <h3>System Initialized</h3>
    <p>Inventory system ready.</p>
    <p>Total items: ${inventory.length}</p>
  `;
}

console.log('Part 1 Loaded Successfully');