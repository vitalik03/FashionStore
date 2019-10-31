import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { variantsOfName } from './enums/variantsOfName';
import { VariantValue } from '../variant-value/variant-value.entity';


@Entity()
export class VariantType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    typeName: variantsOfName;

    @OneToMany(() => VariantValue, variantValues => variantValues.variantType, {cascade: true})
    variantValues: VariantValue[];


}
