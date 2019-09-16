import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Product } from '../products/products.entity';


@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    imageURL: string;

    @ManyToOne(() => Product, producti => producti.images)
    producti: Product;
    

}
