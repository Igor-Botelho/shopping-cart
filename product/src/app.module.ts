import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/shopping-cart'),
    ProductModule,
  ],
})
export class AppModule {}
