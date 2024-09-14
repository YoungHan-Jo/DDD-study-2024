import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';

@Module({
  providers: [OrderController],
})
export class OrderModule {}
