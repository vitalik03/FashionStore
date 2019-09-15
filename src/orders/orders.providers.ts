import { Connection, Repository } from 'typeorm';
import { Order } from './orders.entity';

export const ordersProviders = [
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Order),
        inject: ['DATABASE_CONNECTION'],
    },
];