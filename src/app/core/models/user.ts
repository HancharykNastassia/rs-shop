export interface User {
  firstName: string;
  lastName: string;
  cart: string[];
  favorites: string[];
  orders: Order[];
}

export interface Order {
  items: OrderedItem[];
  details: OrderDetails;
  id?: string;
}

export interface OrderedItem {
  id: string;
  amount: number;
}

export interface OrderDetails {
  name: string;
  address: string;
  phone: string;
  timeToDeliver: string;
  comment: string;
}
