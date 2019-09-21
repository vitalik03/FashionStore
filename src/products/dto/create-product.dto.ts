import { ClothType } from "../enums/clothType.enum";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateProductDto{
    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly brandName: string;

    @ApiModelProperty()
    readonly basicPrice: number;
    
    @ApiModelProperty()
    readonly description: string;
    
    @ApiModelProperty()
    readonly cloth: ClothType;
    
    @ApiModelProperty()
    readonly quantity: number;
    
    @ApiModelProperty()
    readonly user: number;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}