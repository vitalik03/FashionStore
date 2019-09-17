import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IOrder } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { SelectedProductsService } from 'src/selected-products/selected-products.service';
import { CreateSelectedProductDto } from 'src/selected-products/dto/create-sp.dto';

@Injectable()
export class OrdersService {
    constructor(
		@Inject('ORDERS_REPOSITORY')
        private readonly orderRepository: Repository<IOrder>,
    ){}
    
    async create(order: CreateOrderDto):Promise<IOrder>{
        return await this.orderRepository.save(order);
    }
    async getAll(): Promise<IOrder[]>{
        return await this.orderRepository.find();
    }
    async getId(id: string):Promise<IOrder>{
        return await this.orderRepository.findOne(id);
    }
}
