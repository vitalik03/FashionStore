import { ApiModelProperty } from '@nestjs/swagger';
export class ChangePasswordDto{
    @ApiModelProperty()
    readonly id: string;

    @ApiModelProperty()
    readonly oldPassword: string;
    
    @ApiModelProperty()
    readonly newPassword: string;
}