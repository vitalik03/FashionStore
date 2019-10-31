import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class UpdateUserDto{
    @ApiModelProperty()
    readonly firstName: string;
    
    @ApiModelProperty()
    readonly lastName: string;

    @ApiModelProperty()
    @IsEmail()
    readonly email: string;
    
    @ApiModelProperty()
    readonly city: string;
    
    @ApiModelProperty()
    readonly state: string;
    
    @ApiModelProperty()
    readonly zip: string;

    readonly updatedAt: Date;
}