import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder } from './interfaces/order.interface';
import { CreateSelectedProductDto } from 'src/selected-products/dto/create-sp.dto';
import { SelectedProductsService } from 'src/selected-products/selected-products.service';


@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService, 
                private readonly selectedProductsService: SelectedProductsService){}

    @Post()
    async createOrder(@Body() createOrder: CreateOrderDto, @Body()createSelectedProduct: CreateSelectedProductDto):Promise<IOrder>{
        await this.selectedProductsService.create(createSelectedProduct);
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
}
