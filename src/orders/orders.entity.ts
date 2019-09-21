import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterInsert, AfterUpdate } from 'typeorm';
import { User } from 'src/users/users.entity';
import { SelectedProducts } from 'src/selected-products/selected-products.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: 'Completed'| 'Opened';

    @Column()
    createdAt:Date;

    @AfterInsert()
    async createDate() {
        const date = new Date();
        this.createdAt = date;
    }

    @Column()
    updatedAt:Date;

    @AfterInsert()
    async createUpdateDate() {
        const date = new Date();
        this.updatedAt = date;
    }

    @AfterUpdate()
    async updateDate() {
        const date = new Date();
        this.updatedAt = date;
    }
    

    @OneToMany(() =>SelectedProducts, selectedProducts => selectedProducts.order, {cascade: true})
    selectedProducts: SelectedProducts[];

    @ManyToOne(() => User, user => user.orders)
    user: User;
}
