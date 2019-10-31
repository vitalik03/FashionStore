import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterInsert, AfterUpdate, BeforeUpdate, BeforeInsert } from 'typeorm';
import { User } from '../users/users.entity';
import { SelectedProducts } from '../selected-products/selected-products.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: 'Completed'| 'Opened';

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
    

    @OneToMany(() =>SelectedProducts, selectedProducts => selectedProducts.order, {cascade: true})
    selectedProducts: SelectedProducts[];

    @ManyToOne(() => User, user => user.orders)
    user: User;
}
