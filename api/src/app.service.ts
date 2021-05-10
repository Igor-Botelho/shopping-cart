import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getAllProducts(): Promise<AxiosResponse<any>> {
    return this.httpService
      .get('http://localhost:3000/products')
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err.message);
  }

  getProductById(productId: string): Promise<AxiosResponse<any>> {
    return this.httpService
      .get(`http://localhost:3000/products/${productId}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err.message);
  }

  getCart(cartId: string): Promise<AxiosResponse<any>> {
    return this.httpService
      .get(`http://localhost:4000/carts/${cartId}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err.message);
  }

  async addProduct(cartId: string, body): Promise<AxiosResponse<any>> {
    const product = await this.httpService
      .get(`http://localhost:3000/products/${body.id}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err.message);

    if (!product.price) {
      throw new Error('product not found');
    }

    return this.httpService
      .post(`http://localhost:4000/carts/${cartId}`, {
        ...body,
        price: product.price,
      })
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err.message);
  }

  removeProduct(
    cartId: string,
    productId: string,
  ): Promise<AxiosResponse<any>> {
    return this.httpService
      .delete(`http://localhost:4000/carts/${cartId}/product/${productId}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err.message);
  }
}
