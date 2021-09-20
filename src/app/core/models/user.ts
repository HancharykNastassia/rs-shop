export interface User {
  firstName: string,
  lastName: string,
  cart: string[],
  favorites: string[],
  orders: Order[]
}

export interface Order {
  items: OrderedItem[],
  details: OrderDetails,
  id: string;
}

interface OrderedItem {
  id: string,
  amount: number
}

interface OrderDetails {
  name: string,
  address: string,
  phone: string,
  timeToDeliver: string,
  comment: string
}
