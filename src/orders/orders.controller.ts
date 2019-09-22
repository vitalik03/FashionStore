import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder } from './interfaces/order.interface';
import { CreateSelectedProductDto } from 'src/selected-products/dto/create-sp.dto';
import { SelectedProductsService } from 'src/selected-products/selected-products.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';


@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiResponse({ status: 201, description: 'Order was succcessfully created'})
    @ApiResponse({ status: 403, description: 'Order is in the database!'})
    async createOrder(@Body() createOrder: CreateOrderDto):Promise<IOrder>{
        return await this.ordersService.create(createOrder);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiResponse({ status: 200, description: 'List of Orders ```[new Order()]```' })
    async get():Promise<IOrder[]>{
        return await this.ordersService.getAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Order Object ```new Order()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    async getId(@Param('id') id:string):Promise<IOrder>{
        return await this.ordersService.getId(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id:string,@Body() updateOrderDto:UpdateOrderDto):Promise<IOrder>{
        return this.ordersService.update(id, updateOrderDto);
    }
}
