import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IOrder } from './interfaces/order.interface';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
		@Inject('ORDERS_REPOSITORY')
        private readonly orderRepository: Repository<IOrder>,
    ){}

    async update(id: string, updateOrder: UpdateOrderDto):Promise<IOrder>{
        return await this.orderRepository.save({ ...updateOrder, id: Number(id) });
    }
}
