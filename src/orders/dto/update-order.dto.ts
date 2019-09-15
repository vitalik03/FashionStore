export class UpdateOrderDto {
    readonly status: 'Completed'| 'Opened';
    readonly updatedAt: string;
}