import { ApiModelProperty } from "@nestjs/swagger";

export class CreateSelectedProductDto{
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly price: number;

    @ApiModelProperty()
    readonly quantity: number;

    @ApiModelProperty()
    readonly orderId :number;
    
    @ApiModelProperty()
    readonly variantsId: number;
}
