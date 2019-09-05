import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    selectedProducts: {
        productId: number;
        color: { name: string; hex: string }
        size: string;
        price: number;
    }[];

    @Column()
    totalPrice: number;

    @Column()
    status: 'Completed'| 'Opened';

    @Column()
    recipient: {
        firstName: string;
        lastName: string;
        email: string;
        city: string;
        state: string;
        street: string;
        phone: string;
        zip: string;
    };

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @OneToMany(() => Product, product => product.order)
    products: Product[];
}

