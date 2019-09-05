import { ClothType } from "src/enum/clothType";

export class IProduct {
    readonly id: number;
    readonly name: string;
    readonly brandName: string;
    readonly basicPrice: number;
    readonly description: string;
    readonly sizes: ['S', 'M', 'L', 'XL', 'XLL']; // avliable sizes
    readonly images: string[];
    readonly ownerId: number;
    readonly colors: ['Yellow', 'White', 'Black', 'Orange'];
    readonly cloth: ClothType;
};