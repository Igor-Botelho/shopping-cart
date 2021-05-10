import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './create-product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {
    const products = [
      {
        brand: 'lg',
        description: 'description example',
        name: 'cellular',
        price: 1789,
        stock: 150,
      },
      {
        brand: 'playStation',
        description: 'dual shock',
        name: 'joystick',
        price: 800,
        stock: 60,
      },
      {
        brand: 'playStation',
        description: 'console 5',
        name: 'console',
        price: 399,
        stock: 15,
      },
    ];

    for (const product of products) {
      this.create(product);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findById(id: string): Promise<Product> {
    const produtoRecuperado = await this.productModel.findById(id);

    return produtoRecuperado;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
