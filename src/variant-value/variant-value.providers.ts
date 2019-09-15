import { Connection, Repository } from 'typeorm';
import { VariantValue } from './variant-value.entity';


export const variantValueProviders = [
    {
        provide: 'VARIANTVALUE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(VariantValue),
        inject: ['DATABASE_CONNECTION'],
    },
];