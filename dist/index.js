"use strict";
const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
];
let cashRegisterBalance = 100;
let orderQueueCount = 0;
const orderQueue = [];
function addNewPizza(name, price) {
    const newPizza = {
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
console.log("📋 Current menu:");
console.table(menu);
addNewPizza("sexyPizza", 11);
console.log("📋 Current menu:");
console.table(menu);
placeOrder("wazaaaa", 1);
placeOrder("sexyPizza", 1);
console.log("📦 Current order queue:");
console.table(orderQueue);
completeOrder("111");
completeOrder("1");
console.log("📦 Current order queue:");
console.table(orderQueue);
