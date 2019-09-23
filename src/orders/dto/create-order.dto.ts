import { ApiModelProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    readonly id: number;

    @ApiModelProperty()
    readonly status: 'Completed'| 'Opened';
    
    @ApiModelProperty()
    readonly user: number;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}
