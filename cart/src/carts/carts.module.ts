import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './cart-product/product.entity';
import { ProdutoService } from './cart-product/product.service';
import { Cart } from './cart.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [CartsService, ProdutoService],
  controllers: [CartsController],
})
export class CartsModule {}
