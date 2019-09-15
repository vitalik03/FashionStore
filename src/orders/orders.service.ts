import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
    constructor(
		@Inject('ORDERS_REPOSITORY')
        private readonly orderRepository: Repository<IOrder>,
    ){}

    async getId(id: string):Promise<IOrder>{
        return await this.orderRepository.findOne(id);
    }
}
