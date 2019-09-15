import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Order } from 'src/orders/orders.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({})
    email: string;

    @Column()
    password: string;

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

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}

