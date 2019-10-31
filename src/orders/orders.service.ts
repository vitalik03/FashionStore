import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { IOrder } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { SelectedProductsService } from 'src/selected-products/selected-products.service';
import { CreateSelectedProductDto } from 'src/selected-products/dto/create-sp.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {orderNotFound} from '../constants/order-responses'
import { Order } from './orders.entity';
@Injectable()
export class OrdersService {
    constructor(
		@Inject('ORDERS_REPOSITORY')
        private readonly orderRepository: Repository<IOrder>,
    ){}
    
    async create(order: CreateOrderDto):Promise<IOrder>{        
        const orderOne = Object.assign(new Order(), order);
        return await this.orderRepository.save(orderOne);
    }
    async getAll(): Promise<IOrder[]>{
        return await this.orderRepository.find();
    }
    async getId(id: string):Promise<IOrder>{
        const order = await this.orderRepository.findOne(id);
        if(!order){
            throw new HttpException(orderNotFound, HttpStatus.NOT_FOUND);
        }
        return order;
    }
    async update(id: string, updateOrder: UpdateOrderDto):Promise<IOrder>{
        const order = await this.orderRepository.findOne(id);
        if(!order){
            throw new HttpException(orderNotFound, HttpStatus.NOT_FOUND);
        }
        return await this.orderRepository.save({ ...updateOrder, id: Number(id) });
    }
}
