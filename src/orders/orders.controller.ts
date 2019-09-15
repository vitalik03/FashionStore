import { Controller, Put, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from './interfaces/order.interface';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @Put(':id')
    async update(@Param('id') id:string,@Body() updateOrderDto:UpdateOrderDto):Promise<IOrder>{
        return this.ordersService.update(id, updateOrderDto);
    }
}
