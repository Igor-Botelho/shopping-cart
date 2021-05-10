import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cart } from '../cart.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column({ default: 0 })
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Cart, (cart) => cart.products)
  cart: number;
}
