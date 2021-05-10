import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Cart } from './cart.entity';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post(':id')
  addCart(
    @Param() params,
    @Res() response,
    @Body()
    addCartiDto: { price: number; id: string; quantity: number },
  ): Promise<Cart> {
    return handleRequest(
      this.cartsService.addCart(params.id, addCartiDto),
      response,
    );
  }

  @Delete(':id/product/:productId')
  removeProduct(
    @Param() params: { id: string; productId: string },
    @Res() response,
  ): Promise<void> {
    return handleRequest(
      this.cartsService.removeProduct(params.id, params.productId),
      response,
    );
  }

  @Get(':id')
  getCartById(@Param('id') id: string, @Res() response): Promise<Cart> {
    return handleRequest(this.cartsService.findCart(id), response);
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
