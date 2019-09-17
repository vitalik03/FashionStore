export class CreateOrderDto {
    readonly id: number;
    readonly status: 'Completed'| 'Opened';
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly userId: number;
}
