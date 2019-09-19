import { ApiModelProperty } from "@nestjs/swagger";

export class UpdateUserDto{
    @ApiModelProperty()
    readonly firstName: string;
    
    @ApiModelProperty()
    readonly lastName: string;
    
    @ApiModelProperty()
    readonly email: string;
    
    @ApiModelProperty()
    readonly city: string;
    
    @ApiModelProperty()
    readonly state: string;
    
    @ApiModelProperty()
    readonly zip: string;

    @ApiModelProperty()
    readonly role: "ADMIN" | "USER";

    @ApiModelProperty()
    createdAt: string;

    @ApiModelProperty()
    updatedAt: string;
}