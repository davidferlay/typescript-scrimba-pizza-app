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
    return newPizza;
}
function placeOrder(itemName, quantity = 1) {
    const matchedItem = menu.find((m) => m.name === itemName);
    if (!matchedItem) {
        console.error(`Item "${itemName}" was not found in menu.`);
        return null;
    }
    console.log(`Item "${itemName}" was successfully retrieved from menu.`);
    const totalOrderItemPrice = matchedItem.price * quantity;
    console.log("Total order item price: ", totalOrderItemPrice);
    const updatedCashRegisterBalanceBalance = totalOrderItemPrice + cashRegisterBalance;
    cashRegisterBalance = updatedCashRegisterBalanceBalance;
    console.log("New cash register balance: ", updatedCashRegisterBalanceBalance);
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
    console.log("Order item added to order queue: ", newOrderItem);
    return newOrderItem;
}
function completeOrder(orderID) {
    const matchedOrder = orderQueue.find((o) => o.ID === orderID);
    if (!matchedOrder) {
        console.error(`Order ${orderID} was not found in order queue.`);
        return null;
    }
    console.log(`Order ${orderID} was successfully found in order queue:`, matchedOrder);
    const updatedOrder = {
        ID: matchedOrder.ID,
        date: matchedOrder.date,
        menuItem: matchedOrder.menuItem,
        quantity: matchedOrder.quantity,
        status: "completed",
    };
    const index = orderQueue.findIndex((o) => o.ID === orderID);
    if (index !== -1) {
        orderQueue[index] = updatedOrder;
    }
    console.log(`Order ${orderID} was successfully updated: `, updatedOrder);
    return updatedOrder;
}
console.log("Menu: ", menu);
addNewPizza("sexyPizza", 11);
console.log("Menu: ", menu);
placeOrder("sexyPizza", 1);
console.log("Current order queue: ", orderQueue);
completeOrder("111");
completeOrder("1");
console.log("Current order queue: ", orderQueue);
