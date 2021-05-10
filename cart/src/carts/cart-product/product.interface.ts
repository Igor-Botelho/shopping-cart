import { Cart } from '../cart.entity';

export interface IProduct {
  id: string;
  quantity: number;
  price: number;
  cart: Cart;
}
