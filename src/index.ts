interface MenuItem {
  name: string;
  price: number;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

const menu: MenuItem[] = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let cashRegister: number = 100;

const orderQueue: OrderItem[] = [];

function addNewPizza(name: string, price: number): MenuItem {
  const newPizza: MenuItem = {
    name,
    price,
  };
  menu.push(newPizza);
  return newPizza;
}

addNewPizza("xxxx", 11);

function placeOrder(itemName: string, quantity: number = 1): OrderItem | null {
  // look item in array
  // in 'menu' array, we look for .name item which equals arg
  const matchedItem = menu.find((m) => m.name === itemName);
  if (!matchedItem) {
    console.error(`Item "${itemName}" was not found in menu.`);
    return null;
  }
  console.log(`Item "${itemName}" was successfully found in menu.`);

  // add price to cashRegister
  const totalOrderItemPrice: number = matchedItem.price * quantity;
  console.log(`Total order item price: ${totalOrderItemPrice}`);

  const newCashRegisterBalance: number = totalOrderItemPrice + cashRegister;
  cashRegister = newCashRegisterBalance;
  console.log(`New cash register balance ${newCashRegisterBalance}`);

  // add item to orderQueue
  const newOrderItem: OrderItem = {
    menuItem: matchedItem,
    quantity,
  };
  orderQueue.push(newOrderItem);
  console.log(
    `Order item added to order queue: ${JSON.stringify(newOrderItem)}.`
  );

  // return order for info
  return newOrderItem;
}

placeOrder("xxxx", 1);
