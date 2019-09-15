import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/core/database.module';
import { ordersProviders } from './orders.providers';

@Module({
  imports: [DatabaseModule],
  providers: [OrdersService, ...ordersProviders],
  controllers: [OrdersController],
  exports: [OrdersService]
})
export class OrdersModule {}
