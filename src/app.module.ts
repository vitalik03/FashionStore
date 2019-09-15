import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { VariantTypeModule } from './variant-type/variant-type.module';
import { VariantValueService } from './variant-value/variant-value.service';
import { VariantValueModule } from './variant-value/variant-value.module';
import { VariantsService } from './variants/variants.service';
import { VariantsModule } from './variants/variants.module';

@Module({
  imports: [UsersModule, ProductsModule, ImagesModule, VariantTypeModule, VariantValueModule, VariantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
