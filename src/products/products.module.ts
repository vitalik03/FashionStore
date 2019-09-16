import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { ImagesModule } from 'src/images/images.module';
import { VariantValueModule } from 'src/variant-value/variant-value.module';
import { VariantsModule } from 'src/variants/variants.module';
import { VariantTypeModule } from 'src/variant-type/variant-type.module';


@Module({
    imports: [DatabaseModule, ImagesModule, VariantValueModule, VariantsModule, VariantTypeModule],
    providers: [ProductsService, ...productsProviders],
    controllers: [ProductsController],
    exports: [ProductsService]
})
export class ProductsModule {}
