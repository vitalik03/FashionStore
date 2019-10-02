import { ClothType } from "../enums/clothType.enum";
import { ApiModelProperty } from "@nestjs/swagger";
import { variantsOfName } from "../enums/variantsOfName";

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


export class CreateBody{
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

    @ApiModelProperty()
    readonly typeName:  variantsOfName;

    @ApiModelProperty()
    readonly valueName: string[];
    
}

export class CreateVariants{
    
    @ApiModelProperty()
    readonly typeName:  variantsOfName;

    @ApiModelProperty()
    readonly valueName: string[];
    
}

export class UpdateBody{
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
    readonly typeName:  variantsOfName;

    @ApiModelProperty()
    readonly valueName: string[];
    
}
