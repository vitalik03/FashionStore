import { ApiModelProperty } from "@nestjs/swagger";

export class CreateImageDto{
    
    readonly imageURL: string;
    
    readonly producti: number;
}