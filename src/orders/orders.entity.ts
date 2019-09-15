import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';

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
    
    @ManyToOne(() => User, user => user.orders)
    user: User;
}
