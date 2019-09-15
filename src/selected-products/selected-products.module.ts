import { Module } from '@nestjs/common';
import { SelectedProductsService } from './selected-products.service';
import { SelectedProductsController } from './selected-products.controller';
import { DatabaseModule } from 'src/core/database.module';
import { selectedProductsProviders } from './selected-products.providers';

@Module({
  imports: [DatabaseModule],
  providers: [SelectedProductsService, ...selectedProductsProviders],
  controllers: [SelectedProductsController],
  exports: [SelectedProductsService]
})
export class SelectedProductsModule {}
