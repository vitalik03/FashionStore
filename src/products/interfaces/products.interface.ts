import { ClothType } from "src/enum/clothType";

export interface IProduct {
    id: number;
    name: string;
    brandName: string;
    basicPrice: number;
    description: string;
    sizes: ['S', 'M', 'L', 'XL', 'XLL']; // avliable sizes
    images: string[];
    ownerId: number;
    colors: ['Yellow', 'White', 'Black', 'Orange'];
    cloth: ClothType;
};