import { Connection, Repository } from 'typeorm';
import { Product } from './products.entity';


export const productsProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Product),
        inject: ['DATABASE_CONNECTION'],
    },
];