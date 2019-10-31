import { ApiModelProperty } from "@nestjs/swagger";

export class CreateVariantValueDto{

    @ApiModelProperty()
    readonly valueName: string[];
    
    @ApiModelProperty()
    readonly variantType: number;
}