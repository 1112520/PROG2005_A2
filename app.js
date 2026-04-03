"use strict";
/**
 * PROG2005 Assignment 2 Part 1
 * Author: 你的名字
 * Student ID: 你的学号
 * Description: Main application logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
var item_js_1 = require("./item.js");
// 初始化提示
var output = document.getElementById('output');
if (output) {
    output.innerHTML = "\n    <h3>System Initialized</h3>\n    <p>Inventory system ready.</p>\n    <p>Total items: ".concat(item_js_1.inventory.length, "</p>\n  ");
}
console.log('Part 1 Loaded Successfully');
