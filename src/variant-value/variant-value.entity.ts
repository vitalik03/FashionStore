import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { VariantType } from '../variant-type/variant-type.entity';
import { Variants } from '../variants/variants.entity';

@Entity()
export class VariantValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text", array: true})
    valueName: string[] = [];

    @ManyToOne(() => VariantType, variantType => variantType.variantValues, {onDelete: 'CASCADE'})
    variantType: VariantType;
    
    @OneToMany(() => Variants, variants => variants.variantValue, {cascade: true})
    variants: Variants[];

}
