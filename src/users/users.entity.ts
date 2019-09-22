import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, AfterUpdate, AfterInsert, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { Order } from 'src/orders/orders.entity';
import { Exclude, Expose } from "class-transformer";
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

    @BeforeInsert()
    async createDate() {
        const date = new Date();
        this.createdAt = date;
    }

    @Column()
    updatedAt:Date;

    @BeforeInsert()
    async createUpdateDate() {
        const date = new Date();
        this.updatedAt = date;
    }

    @BeforeUpdate()
    async updateDate() {
        const date = new Date();
        this.updatedAt = date;
    }

    @OneToMany(() => Product, products => products.user, {cascade: true})
    products: Product[];

    @OneToMany(() => Order, order => order.user, {cascade: true})
    orders: Order[];
    
    async setPassword(newPassword){
        console.log("2" + this.password);
        this.password = newPassword;
        console.log("3" + this.password);
    }
}

