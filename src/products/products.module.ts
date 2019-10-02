import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { ImagesModule } from '../images/images.module';
import { VariantValueModule } from '../variant-value/variant-value.module';
import { VariantsModule } from '../variants/variants.module';
import { VariantTypeModule } from '../variant-type/variant-type.module';


@Module({
    imports: [DatabaseModule, ImagesModule, VariantValueModule, VariantsModule, VariantTypeModule],
    providers: [ProductsService, ...productsProviders],
    controllers: [ProductsController],
    exports: [ProductsService]
})
export class ProductsModule {}
