import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { VariantsService } from './variants.service';
import { variantsProviders } from './variants.providers';

@Module({
    imports: [DatabaseModule],
    providers: [VariantsService, ...variantsProviders],
    exports: [VariantsService]
})
export class VariantsModule {}
