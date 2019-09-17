import { ApiModelProperty } from "@nestjs/swagger";

export class CreateImageDto{
    @ApiModelProperty()
    readonly imageURL: string;
    
    @ApiModelProperty()
    readonly producti: number;
}