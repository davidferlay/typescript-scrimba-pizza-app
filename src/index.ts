interface MenuItem {
  ID: number;
  name: string;
  price: number;
}

interface OrderItem {
  ID: string;
  date: Date;
  menuItem: MenuItem;
  quantity: number;
  status: "ordered" | "completed";
}

let menuItemID: number = 1;

const menu: MenuItem[] = [
  { ID: menuItemID++, name: "Margherita", price: 8 },
  { ID: menuItemID++, name: "Pepperoni", price: 10 },
  { ID: menuItemID++, name: "Hawaiian", price: 10 },
  { ID: menuItemID++, name: "Veggie", price: 9 },
];

let cashRegisterBalance: number = 100;

let orderQueueCount: number = 0;

const orderQueue: OrderItem[] = [];

function addNewPizza(name: string, price: number): MenuItem {
  const newPizza: MenuItem = {
    ID: menuItemID++,
    name,
    price,
  };
  menu.push(newPizza);
  console.log(`New pizza '${name}' was added to menu.`);
  return newPizza;
}

// To illustrate the Omit type
function addNewPizzaVariant(pizza: Omit<MenuItem, "ID">): MenuItem {
  const newPizza: MenuItem = {
    ID: menuItemID++,
    ...pizza,
  };
  menu.push(newPizza);
  console.log(`New pizza '${pizza.name}' was added to menu.`);
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

function getMenuItem(identifier: string): MenuItem | undefined {
  if (typeof identifier === "string") {
    return menu.find((pizza) => pizza.name.toLowerCase() === identifier.toLowerCase());
  } else {
    throw new TypeError("Parameter `identifier` must be a string");
  }
}

// to illustrate partial Updates type
type UpdatedMenuItem = Partial<MenuItem>;
function updateMenuItem(ID: number, updates: UpdatedMenuItem): MenuItem | null {
  const matchedItem = menu.find((m) => m.ID === ID);
  if (!matchedItem) {
    console.error(`Item with ID '${ID}' was not found in menu.`);
    return null;
  }

  if (updates.name !== undefined) {
    if (typeof updates.name !== "string" || updates.name.trim() === "") {
      // trim() used to avoid accidental spaces
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

// Execution logic

addNewPizza("SexyPizza", 11);
addNewPizzaVariant({ name: "SexyPizzaVariant", price: 12 });

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

// to illustrate Generics
// 1st arg is an array of generic type
// return value is an item from of that generic type, or undefined in case logic fails
function getLastArrayItem<Type>(array: Type[]): Type | undefined {
  // "Type" here is an arbitrary defined placeholder, it could be anything
  return array[array.length - 1];
}

console.table(getLastArrayItem(menu));
console.table(getLastArrayItem(orderQueue));

// to illustrate Generics with several args
// 1st arg is an array of generic type
// 2nd arg is a item of this array
// return value is an array of generic type
function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

console.table(addToArray(menu, { ID: menuItemID++, name: "Generic Margherita", price: 7 }));
// For better readability, specify type when executing function
console.table(addToArray<MenuItem>(menu, { ID: menuItemID++, name: "Generic Margherita specified", price: 7 }));

console.log(
  addToArray(orderQueue, {
    ID: (++orderQueueCount).toString(),
    date: new Date(),
    menuItem: menu[2],
    quantity: 1,
    status: "Some unauthorized value", // But values of union type defined are not enforced by default here
  })
);
console.log(
  addToArray<OrderItem>(orderQueue, {
    // Note '<OrderItem>' here, to enforce union type of 'status' field
    ID: (++orderQueueCount).toString(),
    date: new Date(),
    menuItem: menu[2],
    quantity: 1,
    status: "ordered", // Value now enforced
  })
);
