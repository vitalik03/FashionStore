import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { Order } from 'src/orders/orders.entity';
import { Exclude } from "class-transformer";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({})
    @Exclude()
    password: string;

    @Column({})
    email: string;

    @Column({})
    city: string;

    @Column({})
    state: string;

    @Column({})
    zip: string;

    @Column()
    role: "ADMIN"|"USER";

    @Column()
    createdAt:string;

    @Column()
    updatedAt:string;

    @OneToMany(() => Product, products => products.user)
    products: Product[];

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}

