import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { variantsOfName } from './enums/variantsOfName';
import { VariantValue } from 'src/variant-value/variant-value.entity';


@Entity()
export class VariantType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    typeName: variantsOfName;

    @OneToMany(() => VariantValue, variantValues => variantValues.variantType)
    variantValues: VariantValue[];


}
