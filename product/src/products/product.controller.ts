import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() response,
  ): Promise<Product> {
    return handleRequest(
      this.productService.create(createProductDto),
      response,
    );
  }

  @Get()
  async findAllProducts(@Res() response): Promise<Product[]> {
    return handleRequest(this.productService.findAll(), response);
  }

  @Get(':id')
  async getProductById(@Param() params, @Res() response): Promise<Product> {
    return handleRequest(this.productService.findById(params.id), response);
  }
}

async function handleRequest(fn, response) {
  try {
    const result = await fn;

    if (result) {
      return response.status(200).send(result);
    }

    return response.status(404).send({ message: 'not found' });
  } catch (error) {
    return response.status(500).send({ error: error.message });
  }
}
