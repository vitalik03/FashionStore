import { ApiModelProperty } from "@nestjs/swagger";

export class UpdateUserDto{
    @ApiModelProperty()
    readonly firstName: string;
    
    @ApiModelProperty()
    readonly lastName: string;
    
    @ApiModelProperty()
    readonly city: string;
    
    @ApiModelProperty()
    readonly state: string;
    
    @ApiModelProperty()
    readonly zip: string;

    readonly updatedAt: Date;
}