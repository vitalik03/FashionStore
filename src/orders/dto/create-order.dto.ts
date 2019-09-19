import { ApiModelProperty } from "@nestjs/swagger";

export class CreateOrderDto {

    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly status: 'Completed'| 'Opened';
    
    @ApiModelProperty()
    createdAt: Date;
    
    @ApiModelProperty()
    updatedAt: Date;
    
    @ApiModelProperty()
    readonly userId: number;
}
