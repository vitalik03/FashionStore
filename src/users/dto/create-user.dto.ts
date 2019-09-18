import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength, IsOptional } from "class-validator";



export class CreateUserDto{
    @MinLength(3)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly firstName: string;
    
    @IsString()
    @IsOptional()
    @ApiModelProperty()
    readonly lastName: string;

    @IsNotEmpty()
    @ApiModelProperty()
    password: string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    @ApiModelProperty()
    readonly city: string;
    
    @IsNotEmpty()
    @ApiModelProperty()
    readonly state: string;
    
    @IsNotEmpty()
    @ApiModelProperty()
    readonly zip: string;

    @ApiModelProperty()
    readonly createdAt: string;

    @ApiModelProperty()
    readonly updatedAt: string;
}

export class CreateUserLoginDto{
    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    password: string;
}