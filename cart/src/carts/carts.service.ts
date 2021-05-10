import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoService } from './cart-product/product.service';
import { Cart } from './cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,
    private readonly produtoService: ProdutoService,
  ) {
    this.createCart('1');
  }

  async addCart(cartId, product): Promise<Cart> {
    const cart = await this.findCart(cartId);

    if (!cart) {
      throw new Error('Cart not found.');
    }

    const newProduct = await this.produtoService.creatUpdateProduct(
      {
        ...product,
      },
      cart,
    );

    const productData = {
      id: newProduct.id,
      quantity: newProduct.quantity,
      price: newProduct.price,
      cart: cart.id,
    };

    let productFinded = false;

    cart.products = cart.products.map((product) => {
      if (product.id === newProduct.id) {
        productFinded = true;
        return { ...productData };
      }

      return { ...product };
    });

    if (cart.products.length === 0 || !productFinded) {
      cart.products.push({ ...productData });
    }

    cart.totalPrice += product.price * product.quantity;
    cart.totalQuantity += product.quantity;

    return this.cartsRepository.save(cart);
  }

  async removeProduct(cartId: string, productId: string): Promise<Cart> {
    const cart = await this.findCart(cartId);

    if (!cart) {
      throw new Error('Cart not found.');
    }

    let productFinded;

    const newProductsArray = [];

    for (const product of cart.products) {
      if (product.id === productId) {
        productFinded = product;
        continue;
      }

      newProductsArray.push(product);
    }

    if (!productFinded) {
      throw new Error('Product not found.');
    }

    await this.produtoService.deleteProduct(productId);

    cart.products = newProductsArray;
    cart.totalQuantity -= productFinded.quantity;
    cart.totalPrice -= productFinded.quantity * productFinded.price;

    return this.cartsRepository.save(cart);
  }

  createCart(userId: string): Promise<Cart> {
    const cart = new Cart();

    cart.products = [];
    cart.userId = userId;

    return this.cartsRepository.save(cart);
  }

  findCart(id: string): Promise<Cart> {
    return this.cartsRepository.findOne(id, { relations: ['products'] });
  }
}
