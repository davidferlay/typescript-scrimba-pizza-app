"use strict";
let menuItemID = 1;
const menu = [
    { ID: menuItemID++, name: "Margherita", price: 8 },
    { ID: menuItemID++, name: "Pepperoni", price: 10 },
    { ID: menuItemID++, name: "Hawaiian", price: 10 },
    { ID: menuItemID++, name: "Veggie", price: 9 },
];
let cashRegisterBalance = 100;
let orderQueueCount = 0;
const orderQueue = [];
function addNewPizza(name, price) {
    const newPizza = {
        ID: menuItemID++,
        name,
        price,
    };
    menu.push(newPizza);
    console.log(`New pizza '${name}' was added to menu.`);
    return newPizza;
}
function placeOrder(itemName, quantity = 1) {
    const matchedItem = menu.find((m) => m.name === itemName);
    if (!matchedItem) {
        console.error(`Item '${itemName}' was not found in menu.`);
        return null;
    }
    console.log(`Item '${itemName}' was successfully retrieved from menu.`);
    const totalOrderItemPrice = matchedItem.price * quantity;
    console.log("Total order item price: ", totalOrderItemPrice);
    const updatedCashRegisterBalance = totalOrderItemPrice + cashRegisterBalance;
    cashRegisterBalance = updatedCashRegisterBalance;
    console.log("New cash register balance: ", updatedCashRegisterBalance);
    const newOrderQueueCount = ++orderQueueCount;
    orderQueueCount = newOrderQueueCount;
    const newOrderItem = {
        ID: newOrderQueueCount.toString(),
        date: new Date(),
        menuItem: matchedItem,
        quantity: quantity,
        status: "ordered",
    };
    orderQueue.push(newOrderItem);
    console.log("Order item added to order queue: ");
    console.table(newOrderItem);
    return newOrderItem;
}
function completeOrder(orderID) {
    const matchedOrder = orderQueue.find((o) => o.ID === orderID);
    if (!matchedOrder) {
        console.error(`Order ${orderID} was not found in order queue.`);
        return null;
    }
    console.log(`Order ${orderID} was successfully found in order queue.`);
    matchedOrder.status = "completed";
    console.log(`Order ${orderID} was successfully updated: `);
    console.table(matchedOrder);
    return matchedOrder;
}
function getMenuItem(identifier) {
    if (typeof identifier === "string") {
        return menu.find((pizza) => pizza.name.toLowerCase() === identifier.toLowerCase());
    }
    else {
        throw new TypeError("Parameter `identifier` must be a string");
    }
}
function updateMenuItem(ID, updates) {
    const matchedItem = menu.find((m) => m.ID === ID);
    if (!matchedItem) {
        console.error(`Item with ID '${ID}' was not found in menu.`);
        return null;
    }
    if (updates.name !== undefined) {
        if (typeof updates.name !== "string" || updates.name.trim() === "") {
            console.error("Invalid name provided for update.");
            return null;
        }
        matchedItem.name = updates.name.trim();
    }
    if (updates.price !== undefined) {
        if (typeof updates.price !== "number" || updates.price < 0) {
            console.error("Invalid price provided for update.");
            return null;
        }
        matchedItem.price = updates.price;
    }
    console.log(`Item '${ID}' was successfully updated in menu:`);
    console.table(matchedItem);
    return matchedItem;
}
addNewPizza("SexyPizza", 11);
console.log("📋 Current menu:");
console.table(menu);
placeOrder("wazaaaa", 1);
placeOrder("SexyPizza", 1);
placeOrder("Margherita", 1);
placeOrder("Hawaiian", 1);
console.log("📦 Current order queue:");
console.table(orderQueue);
completeOrder("111");
completeOrder("1");
console.log("📦 Current order queue:");
console.table(orderQueue);
console.table(getMenuItem("SexyPizza"));
updateMenuItem(1, { price: 17 });
updateMenuItem(1, { name: "Super Margherita" });
