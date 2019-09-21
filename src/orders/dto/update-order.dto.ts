import { ApiModelProperty } from "@nestjs/swagger";

export class UpdateOrderDto {
    @ApiModelProperty()
    readonly status: 'Completed'| 'Opened';

    readonly updatedAt: Date;
}