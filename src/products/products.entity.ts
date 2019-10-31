import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate} from 'typeorm';
import { ClothType } from './enums/clothType.enum';
import { User } from '../users/users.entity';
import { Image } from '../images/images.entity';
import { Variants } from '../variants/variants.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    brandName: string;

    @Column({})
    basicPrice: number;

    @Column({})
    description: string;

    @Column({})
    cloth: ClothType;

    @Column({})
    quantity: number;

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
    
    @ManyToOne(() => User, user => user.products,  {onDelete: 'CASCADE'})
    user: User;

    @OneToMany(() => Image, images => images.producti, {cascade: true})
    images: Image[];

    @OneToMany(() => Variants, variants => variants.product, {cascade: true})
    variants: Variants[];

}
