import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ClothType } from "src/enum/clothType";
import { Order } from 'src/orders/order.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brandName: string;

    @Column()
    basicPrice: number;

    @Column()
    description: string;

    @Column()
    sizes: ['S', 'M', 'L', 'XL', 'XLL'];

    @Column()
    images: string[];

    @Column()
    ownerId: number;

    @Column()
    colors: ['Yellow', 'White', 'Black', 'Orange'];

    @Column()
    cloth: ClothType;

    @ManyToOne(type => Order, order => order.products)
    order: Order;

}

