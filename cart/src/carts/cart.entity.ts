import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './cart-product/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  totalPrice: number;

  @Column()
  userId: string;

  @Column({ default: 0 })
  totalQuantity: number;

  @OneToMany(() => Product, (product) => product.cart)
  @JoinColumn()
  products: Product[];
}
