import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart.entity';
import { Product } from './product.entity';
import { IProduct } from './product.interface';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async creatUpdateProduct(product: IProduct, cart: Cart): Promise<Product> {
    const { price, id, quantity } = product;

    const registeredProduc = await this.findProduct(id);

    const newProduct = new Product();

    newProduct.id = id;
    newProduct.cart = cart.id;

    if (registeredProduc) {
      newProduct.price = registeredProduc.price;
      newProduct.quantity = registeredProduc.quantity + quantity;

      await this.productRepository.update(id, newProduct);

      return this.findProduct(id);
    }

    newProduct.price = price;
    newProduct.id = id;
    newProduct.quantity = quantity;

    return this.productRepository.save(newProduct);
  }

  findProduct(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  deleteProduct(id: string): Promise<any> {
    return this.productRepository.delete(id);
  }
}
