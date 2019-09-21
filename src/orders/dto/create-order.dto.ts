import { ApiModelProperty } from "@nestjs/swagger";

export class CreateOrderDto {

    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly status: 'Completed'| 'Opened';
    
    readonly createdAt: Date;
    
    readonly updatedAt: Date;
    
    @ApiModelProperty()
    readonly userId: number;
}
