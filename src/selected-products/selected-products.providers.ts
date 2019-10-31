import { Connection, Repository } from 'typeorm';
import { SelectedProducts } from './selected-products.entity';

export const selectedProductsProviders = [
    {
        provide: 'SELECTEDPRODUCTS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(SelectedProducts),
        inject: ['DATABASE_CONNECTION'],
    },
];