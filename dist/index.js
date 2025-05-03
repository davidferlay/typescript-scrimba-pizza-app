"use strict";
const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
];
let cashRegister = 100;
const orderQueue = [];
function addNewPizza(name, price) {
    const newPizza = {
        name,
        price,
    };
    menu.push(newPizza);
    return newPizza;
}
addNewPizza("xxxx", 11);
function placeOrder(itemName, quantity = 1) {
    const matchedItem = menu.find((m) => m.name === itemName);
    if (!matchedItem) {
        console.error(`Item "${itemName}" was not found in menu.`);
        return null;
    }
    console.log(`Item "${itemName}" was successfully found in menu.`);
    const totalOrderItemPrice = matchedItem.price * quantity;
    console.log(`Total order item price: ${totalOrderItemPrice}`);
    const newCashRegisterBalance = totalOrderItemPrice + cashRegister;
    cashRegister = newCashRegisterBalance;
    console.log(`New cash register balance ${newCashRegisterBalance}`);
    const newOrderItem = {
        menuItem: matchedItem,
        quantity,
    };
    orderQueue.push(newOrderItem);
    console.log(`Order item added to order queue: ${JSON.stringify(newOrderItem)}.`);
    return newOrderItem;
}
placeOrder("xxxx", 1);
