import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { imagesProviders } from './images.providers';
import { ImagesService } from './images.service';

@Module({
    imports: [DatabaseModule],
    providers: [ImagesService, ...imagesProviders],
    exports: [ImagesService]
})
export class ImagesModule {}
