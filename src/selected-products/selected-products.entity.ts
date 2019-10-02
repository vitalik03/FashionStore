import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from '../orders/orders.entity';
import { Variants } from '../variants/variants.entity';

@Entity()
export class SelectedProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    quantity: number;
    
    @ManyToOne(() => Order, order => order.selectedProducts)
    order: Order;

    @ManyToOne(() => Variants, variants => variants.selectedProducts)
    variants: Variants;
}