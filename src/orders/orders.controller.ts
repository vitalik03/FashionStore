import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from './interfaces/order.interface';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @Get()
    async get():Promise<IOrder[]>{
        return await this.ordersService.getAll();
    }
}
