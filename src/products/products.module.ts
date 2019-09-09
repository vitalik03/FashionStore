import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';

@Module({
    imports: [DatabaseModule],
    providers: [ProductsService, ...productsProviders],
    controllers: [ProductsController],
    exports: [ProductsService]
})
export class ProductsModule {}
