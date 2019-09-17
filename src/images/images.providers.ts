import { Connection, Repository } from 'typeorm';
import { Image } from './images.entity';


export const imagesProviders = [
    {
        provide: 'IMAGE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Image),
        inject: ['DATABASE_CONNECTION'],
    },
];