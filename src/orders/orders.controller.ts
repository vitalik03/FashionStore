import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from './interfaces/order.interface';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @Get(':id')
    async getId(@Param('id') id:string):Promise<IOrder>{
        return await this.ordersService.getId(id);
    }
}
