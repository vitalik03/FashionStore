import { ApiModelProperty } from "@nestjs/swagger";

export class CreateVariantsDto{

    @ApiModelProperty()
    readonly variantValue: number;
    
    @ApiModelProperty()
    readonly product: number;
}