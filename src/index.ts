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
  return newPizza;
}

function placeOrder(itemName: string, quantity: number = 1): OrderItem | null {
  // look item in array
  // in 'menu' array, we look for .name item which equals arg
  const matchedItem = menu.find((m) => m.name === itemName);
  if (!matchedItem) {
    console.error(`Item "${itemName}" was not found in menu.`);
    return null;
  }
  console.log(`Item "${itemName}" was successfully retrieved from menu.`);

  // add price to cashRegisterBalance
  const totalOrderItemPrice: number = matchedItem.price * quantity;
  console.log("Total order item price: ", totalOrderItemPrice);

  const updatedCashRegisterBalanceBalance: number =
    totalOrderItemPrice + cashRegisterBalance;
  cashRegisterBalance = updatedCashRegisterBalanceBalance;
  console.log("New cash register balance: ", updatedCashRegisterBalanceBalance);

  // const newOrderQueueCount: number = orderQueueCount + 1;
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
  console.log("Order item added to order queue: ", newOrderItem);

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
  console.log(
    `Order ${orderID} was successfully found in order queue:`,
    matchedOrder
  );

  // mark it as completed
  const updatedOrder: OrderItem = {
    ID: matchedOrder.ID,
    date: matchedOrder.date,
    menuItem: matchedOrder.menuItem,
    quantity: matchedOrder.quantity,
    status: "completed",
  };
  // update index in array
  const index = orderQueue.findIndex((o) => o.ID === orderID);
  if (index !== -1) {
    // -1 -> no match is found
    orderQueue[index] = updatedOrder;
  }
  console.log(`Order ${orderID} was successfully updated: `, updatedOrder);
  // return the updated order
  return updatedOrder;
}

console.log("Menu: ", menu);
addNewPizza("sexyPizza", 11);
console.log("Menu: ", menu);
placeOrder("wazaaaa", 1);
placeOrder("sexyPizza", 1);
console.log("Current order queue: ", orderQueue);
completeOrder("111");
completeOrder("1");
console.log("Current order queue: ", orderQueue);
