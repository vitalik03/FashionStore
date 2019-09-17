import { variantsOfName } from "../enums/variantsOfName";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateVariantTypeDto{

    @ApiModelProperty()
    readonly typeName: variantsOfName;
}