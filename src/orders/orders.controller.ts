import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder } from './interfaces/order.interface';
import { CreateSelectedProductDto } from 'src/selected-products/dto/create-sp.dto';
import { SelectedProductsService } from 'src/selected-products/selected-products.service';
import { UpdateOrderDto } from './dto/update-order.dto';


@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @Post()
    async createOrder(@Body() createOrder: CreateOrderDto):Promise<IOrder>{
        return await this.ordersService.create(createOrder);
    }
    @Get()
    async get():Promise<IOrder[]>{
        return await this.ordersService.getAll();
    }
    @Get(':id')
    async getId(@Param('id') id:string):Promise<IOrder>{
        return await this.ordersService.getId(id);
    }
    @Put(':id')
    async update(@Param('id') id:string,@Body() updateOrderDto:UpdateOrderDto):Promise<IOrder>{
        return this.ordersService.update(id, updateOrderDto);
    }
}
