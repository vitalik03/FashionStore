export interface IOrder {
    id: number;
    status: 'Completed' | 'Opened';
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}
