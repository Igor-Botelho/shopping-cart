import { IProduct } from './cart-product/product.interface';

export class CreateCartDto {
  totalPrice: number;
  userId: string;
  totalQuantity: number;
  products: IProduct;
}
