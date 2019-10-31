import { Connection, Repository } from 'typeorm';
import { Variants } from './variants.entity';


export const variantsProviders = [
    {
        provide: 'VARIANTS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Variants),
        inject: ['DATABASE_CONNECTION'],
    },
];