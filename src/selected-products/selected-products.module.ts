import { Module } from '@nestjs/common';
import { SelectedProductsService } from './selected-products.service';
import { SelectedProductsController } from './selected-products.controller';

@Module({
  providers: [SelectedProductsService],
  controllers: [SelectedProductsController]
})
export class SelectedProductsModule {}
