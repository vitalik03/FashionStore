import { ApiModelProperty } from "@nestjs/swagger";

export class CreateSelectedProductDto{
    readonly id: number;

    @ApiModelProperty()
    readonly price: number;

    @ApiModelProperty()
    readonly quantity: number;

    @ApiModelProperty()
    readonly order :number;
    
    @ApiModelProperty()
    readonly variants: number;
}
