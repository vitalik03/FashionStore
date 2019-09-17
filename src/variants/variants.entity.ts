import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { VariantValue } from 'src/variant-value/variant-value.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class Variants {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => VariantValue, variantValue => variantValue.variants, {onDelete: 'CASCADE'})
    variantValue: VariantValue;

    @ManyToOne(() => Product, product => product.variants, {onDelete: 'CASCADE'})
    product: Product;
}
