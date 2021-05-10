import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Product service testes', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get: cart by id', async () => {
    const cartId = 1;
    const userId = '1';

    const { body: cart } = await request(app.getHttpServer())
      .get(`/carts/${cartId}`)
      .expect(200);

    expect(cart.id).toBe(cartId);
    expect(cart.userId).toBe(userId);

    await app.close();
  });

  it('post: add product', async () => {
    const cartId = 1;
    const id = '8888';

    await request(app.getHttpServer())
      .delete(`/carts/remove-product/${cartId}`)
      .set('Content-type', 'application/json')
      .send({ id });

    const product = {
      id,
      quantity: 15,
      price: 399,
    };

    const userId = '1';

    const { body: cart } = await request(app.getHttpServer())
      .post(`/carts/${cartId}`)
      .set('Content-type', 'application/json')
      .send(product)
      .expect(200);

    const productFinded = cart.products.find((product) => product.id === id);

    await app.close();

    expect(cart.id).toBe(cartId);
    expect(cart.userId).toBe(userId);
    expect(productFinded.price).toBe(product.price);
    expect(productFinded.quantity).toBe(product.quantity);
  });

  it('remove: remove product', async () => {
    const cartId = 1;
    const id = '8888';

    const product = {
      id,
      quantity: 15,
      price: 399,
    };

    await request(app.getHttpServer())
      .post(`/carts/${cartId}`)
      .set('Content-type', 'application/json')
      .send(product)
      .expect(200);

    await request(app.getHttpServer())
      .delete(`/carts/${cartId}/product/${id}`)
      .set('Content-type', 'application/json')
      .send({ id });

    const { body: newCart } = await request(app.getHttpServer())
      .get(`/carts/${cartId}`)
      .expect(200);

    const productFinded = newCart.products.find((product) => product.id === id);

    await app.close();

    expect(productFinded).toBe(undefined);
  });
});
