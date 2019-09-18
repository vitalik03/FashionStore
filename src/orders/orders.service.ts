import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IOrder } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { SelectedProductsService } from 'src/selected-products/selected-products.service';
import { CreateSelectedProductDto } from 'src/selected-products/dto/create-sp.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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
        const order = await this.orderRepository.findOne(id);
        if(!order){
            throw new HttpException('Not found', 404);
        }
        return order;
    }
    async update(id: string, updateOrder: UpdateOrderDto):Promise<IOrder>{
        const order = await this.orderRepository.findOne(id);
        if(!order){
            throw new HttpException('Not found', 404);
        }
        return await this.orderRepository.save({ ...updateOrder, id: Number(id) });
    }
}
