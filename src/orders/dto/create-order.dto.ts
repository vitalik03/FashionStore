export class IOrder {
    id: number;
    selectedProducts: {
        productId: number;
        color: { name: string; hex: string }
        size: string;
        price: number;
    }[];
    totalPrice: number;
    status: 'Completed'| 'Opened';
    recipient: {
        firstName: string;
        lastName: string;
        email: string;
        city: string;
        state: string;
        street: string;
        phone: string;
        zip: string;
    }
}
