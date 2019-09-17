import { Connection, Repository } from 'typeorm';
import { VariantType } from './variant-type.entity';


export const variantTypeProviders = [
    {
        provide: 'VARIANTTYPE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(VariantType),
        inject: ['DATABASE_CONNECTION'],
    },
];