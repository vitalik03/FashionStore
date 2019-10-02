import { createConnection } from 'typeorm';
import { User } from '../users/users.entity';
import { Order } from '../orders/orders.entity';
import { Product } from '../products/products.entity';
import { SelectedProducts } from '../selected-products/selected-products.entity';
import { VariantType } from '../variant-type/variant-type.entity';
import { VariantValue } from '../variant-value/variant-value.entity';
import { Variants } from '../variants/variants.entity';
import { Image } from '../images/images.entity';
export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 3306,
            username: 'postgres',
            password: 'admin',
            database: 'FashionStore',
            entities: [
                User,
                Order,
                Product,
                SelectedProducts,
                Image,
                VariantType,
                VariantValue,
                Variants
            ],
            synchronize: true,
        }),
    },
];