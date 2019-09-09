import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ClothType } from './enums/clothType.enum';

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

    @Column({type: "text", array: true})
    sizes: string[] = [];

    @Column({type: "text", array: true})
    images: string[] = [];

    @Column({})
    ownerId: number;

    @Column({type: "text", array: true})
    colors: string[] = [];

    @Column({})
    cloth: ClothType;

}
