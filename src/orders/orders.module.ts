import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/core/database.module';
import { ordersProviders } from './orders.providers';
import { SelectedProductsModule } from 'src/selected-products/selected-products.module';

@Module({
  imports: [DatabaseModule, SelectedProductsModule],
  providers: [OrdersService, ...ordersProviders],
  controllers: [OrdersController],
  exports:[OrdersService]
})
export class OrdersModule {}