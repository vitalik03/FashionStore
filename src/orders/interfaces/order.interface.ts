export class IOrder {
    status: 'Completed' | 'Opened';
    user: number;
    createdAt: Date;
    updatedAt: Date;
    
    constructor(partial: Partial<IOrder>) {
        Object.assign(this, partial);
    }
}
