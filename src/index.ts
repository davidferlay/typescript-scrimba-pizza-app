interface MenuItem {
  name: string;
  price: number;
}

type OrderStatus = "ordered" | "completed";

interface OrderItem {
  ID: string;
  date: Date;
  menuItem: MenuItem;
  quantity: number;
  status: OrderStatus;
}

const menu: MenuItem[] = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let cashRegisterBalance: number = 100;

let orderQueueCount: number = 0;

const orderQueue: OrderItem[] = [];

function addNewPizza(name: string, price: number): MenuItem {
  const newPizza: MenuItem = {
    name,
    price,
  };
  menu.push(newPizza);
  console.log(`New pizza '${name}' was added to menu.`);
  return newPizza;
}

function placeOrder(itemName: string, quantity: number = 1): OrderItem | null {
  // look item in array
  // in 'menu' array, we look for .name item which equals arg
  const matchedItem = menu.find((m) => m.name === itemName);
  if (!matchedItem) {
    console.error(`Item '${itemName}' was not found in menu.`);
    return null;
  }
  console.log(`Item '${itemName}' was successfully retrieved from menu.`);

  // add price to cashRegisterBalance
  const totalOrderItemPrice: number = matchedItem.price * quantity;
  console.log("Total order item price: ", totalOrderItemPrice);

  const updatedCashRegisterBalance: number = totalOrderItemPrice + cashRegisterBalance;
  cashRegisterBalance = updatedCashRegisterBalance;
  console.log("New cash register balance: ", updatedCashRegisterBalance);

  const newOrderQueueCount: number = ++orderQueueCount;
  orderQueueCount = newOrderQueueCount;
  // add item to orderQueue
  const newOrderItem: OrderItem = {
    ID: newOrderQueueCount.toString(),
    date: new Date(),
    menuItem: matchedItem,
    quantity: quantity,
    status: "ordered",
  };
  orderQueue.push(newOrderItem);
  console.log("Order item added to order queue: ");
  console.table(newOrderItem);

  // return order for info
  return newOrderItem;
}

function completeOrder(orderID: string): OrderItem | null {
  // look for order in orderQueue
  const matchedOrder = orderQueue.find((o) => o.ID === orderID);
  if (!matchedOrder) {
    console.error(`Order ${orderID} was not found in order queue.`);
    return null;
  }
  console.log(`Order ${orderID} was successfully found in order queue.`);

  // mark it as completed
  matchedOrder.status = "completed";
  console.log(`Order ${orderID} was successfully updated: `);
  console.table(matchedOrder);

  // return the updated order
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
