import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { VariantValueService } from './variant-value.service';
import { variantValueProviders } from './variant-value.providers';

@Module({
    imports: [DatabaseModule],
    providers: [VariantValueService, ...variantValueProviders],
    exports: [VariantValueService]
})
export class VariantValueModule {}
