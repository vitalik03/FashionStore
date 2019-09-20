import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { Order } from 'src/orders/orders.entity';
import { Exclude } from "class-transformer";
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({select: false})
    @Exclude()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({})
    email: string;

    @Column({})
    city: string;

    @Column({})
    state: string;

    @Column({})
    zip: string;

    @Column({})
    role: "ADMIN" | "USER";
    
    @Column()
    createdAt:Date;

    @Column()
    updatedAt:Date;

    @OneToMany(() => Product, products => products.user, {cascade: true})
    products: Product[];

    @OneToMany(() => Order, order => order.user, {cascade: true})
    orders: Order[];
}

