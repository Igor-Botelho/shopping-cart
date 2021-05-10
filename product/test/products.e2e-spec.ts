import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, connection, disconnect } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Product service testes', () => {
  let app: INestApplication;

  const produto = {
    brand: 'LG',
    description: 'webcam 1080p and USB Plug and Play',
    name: 'Webcam',
    price: 2459,
    stock: 600,
  };

  async function cleanColections() {
    const url = 'mongodb://localhost:27017/shopping-cart';

    await connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    await connection.collection('products').drop();
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await cleanColections();

    await disconnect();

    await app.close();
  });

  it('post: create a product doing one post', async () => {
    const { body: registeredProduct } = await request(app.getHttpServer())
      .post('/products')
      .set('Content-type', 'application/json')
      .send(produto)
      .expect(200);

    expect(registeredProduct.brand).toBe(produto.brand);
    expect(registeredProduct.description).toBe(produto.description);
    expect(registeredProduct.name).toBe(produto.name);
    expect(registeredProduct.price).toBe(produto.price);
    expect(registeredProduct.stock).toBe(produto.stock);
  });

  it('get: get all products', async () => {
    await cleanColections();

    return request(app.getHttpServer()).get('/products').expect(200).expect([]);
  });

  it('get: get product by id', async () => {
    const { body: registeredProduct } = await request(app.getHttpServer())
      .post('/products')
      .set('Content-type', 'application/json')
      .send(produto)
      .expect(200);

    const { body: productById } = await request(app.getHttpServer())
      .get(`/products/${registeredProduct._id}`)
      .expect(200);

    expect(registeredProduct.brand).toBe(productById.brand);
    expect(registeredProduct.description).toBe(productById.description);
    expect(registeredProduct.name).toBe(productById.name);
    expect(registeredProduct.price).toBe(productById.price);
    expect(registeredProduct.stock).toBe(productById.stock);
  });

  it('get: get product by id not found', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/609891f035df75da84a80600`)
      .expect(404);

    expect(response.body.message).toBe('not found');
  });

  it('get: route not valid', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });
});
