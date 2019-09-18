import { ApiModelProperty } from "@nestjs/swagger";

export class CreateOrderDto {

    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly status: 'Completed'| 'Opened';
    
    @ApiModelProperty()
    readonly createdAt: string;
    
    @ApiModelProperty()
    readonly updatedAt: string;
    
    @ApiModelProperty()
    readonly userId: number;
}
