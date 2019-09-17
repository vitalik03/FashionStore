import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/users.entity';
import { SelectedProducts } from 'src/selected-products/selected-products.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: 'Completed'| 'Opened';

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;
    

    @OneToMany(() =>SelectedProducts, selectedProducts => selectedProducts.order)
    selectedProducts: SelectedProducts[];

    @ManyToOne(() => User, user => user.orders)
    user: User;
}
