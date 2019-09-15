import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { VariantTypeService } from './variant-type.service';
import { variantTypeProviders } from './variant-type.providers'

@Module({
    imports: [DatabaseModule],
    providers: [VariantTypeService, ...variantTypeProviders],
    exports: [VariantTypeService]
})
export class VariantTypeModule {}
