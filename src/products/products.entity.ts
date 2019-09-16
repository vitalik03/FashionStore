import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { ClothType } from './enums/clothType.enum';
import { User } from '../users/users.entity';
import { Image } from 'src/images/images.entity';
import { Variants } from 'src/variants/variants.entity';

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

    @ManyToOne(() => User, user => user.products)
    user: User;

    @OneToMany(() => Image, images => images.producti)
    images: Image[];

    @OneToMany(() => Variants, variants => variants.product)
    variants: Variants[];

}
