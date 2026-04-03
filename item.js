"use strict";
/**
 * PROG2005 Assignment 2 Part 1
 * Author: xinruima
 * Student ID: 24832562
 * Description: Type definitions for inventory item
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = exports.StockStatus = exports.ItemCategory = void 0;
// 物品分类枚举
var ItemCategory;
(function (ItemCategory) {
    ItemCategory["Electronics"] = "Electronics";
    ItemCategory["Furniture"] = "Furniture";
    ItemCategory["Clothing"] = "Clothing";
    ItemCategory["Tools"] = "Tools";
    ItemCategory["Miscellaneous"] = "Miscellaneous";
})(ItemCategory || (exports.ItemCategory = ItemCategory = {}));
// 库存状态枚举
var StockStatus;
(function (StockStatus) {
    StockStatus["InStock"] = "In Stock";
    StockStatus["LowStock"] = "Low Stock";
    StockStatus["OutOfStock"] = "Out of Stock";
})(StockStatus || (exports.StockStatus = StockStatus = {}));
// 初始化库存数组
exports.inventory = [];
