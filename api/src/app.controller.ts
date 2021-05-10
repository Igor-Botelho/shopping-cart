import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/products')
  async getAllProducts(@Request() request, @Res() response) {
    const validation = await this.verifyToken(request.headers.authorization);
    if (validation) {
      return handleRequest(this.appService.getAllProducts(), response);
    }

    return response.status(404).send({ error: 'invalid signature' });
  }

  @Get('/product/:id')
  async getProductById(@Request() request, @Param() params, @Res() response) {
    const validation = await this.verifyToken(request.headers.authorization);

    if (validation) {
      return handleRequest(this.appService.getProductById(params.id), response);
    }

    return response.status(404).send({ error: 'invalid signature' });
  }

  @Get('cart/:id')
  async getCart(@Request() request, @Param() params, @Res() response) {
    const validation = await this.verifyToken(request.headers.authorization);

    if (validation) {
      return handleRequest(this.appService.getCart(params.id), response);
    }

    return response.status(404).send({ error: 'invalid signature' });
  }

  @Post('addProduct/:id')
  async addProduct(
    @Request() request,
    @Param() params,
    @Res() response,
    @Body() body,
  ) {
    const validation = await this.verifyToken(request.headers.authorization);

    if (validation) {
      return handleRequest(
        this.appService.addProduct(params.id, body),
        response,
      );
    }

    return response.status(404).send({ error: 'invalid signature' });
  }

  @Delete(':id/product/:productId')
  async deleteProduct(
    @Request() request,
    @Param() params: { id: string; productId: string },
    @Res() response,
  ) {
    const validation = await this.verifyToken(request.headers.authorization);

    if (validation) {
      return handleRequest(
        this.appService.removeProduct(params.id, params.productId),
        response,
      );
    }

    return response.status(404).send({ error: 'invalid signature' });
  }

  async verifyToken(authorization: string) {
    try {
      const [, token] = authorization.split(' ');

      const responde = await this.authService.verifyToken(token);

      return responde;
    } catch (error) {
      return false;
    }
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
