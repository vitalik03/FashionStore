export interface IOrder {
    id: number;
    status: 'Completed' | 'Opened';
    createdAt: string;
    updatedAt: string;
}
