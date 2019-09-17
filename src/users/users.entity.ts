import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Product } from 'src/products/products.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({})
    password: string;

    @Column({})
    email: string;

    @Column({})
    city: string;

    @Column({})
    state: string;

    @Column({})
    zip: string;

    @OneToMany(() => Product, products => products.user)
    products: Product[];


}

