import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { SelectedProductsModule } from './selected-products/selected-products.module';

@Module({
  imports: [UsersModule, OrdersModule, SelectedProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
