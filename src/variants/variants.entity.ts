import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { VariantValue } from 'src/variant-value/variant-value.entity';
import { Product } from 'src/products/products.entity';
import { SelectedProducts } from 'src/selected-products/selected-products.entity';

@Entity()
export class Variants {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => VariantValue, variantValue => variantValue.variants, {onDelete: 'CASCADE'})
    variantValue: VariantValue;

    @ManyToOne(() => Product, product => product.variants, {onDelete: 'CASCADE'})
    product: Product;

    @OneToMany(() => SelectedProducts, selectedProducts => selectedProducts.variants, {cascade: true})
    selectedProducts: SelectedProducts[];
}
