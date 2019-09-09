import { ClothType } from "../enums/clothType.enum";

export interface IProduct{
    name: string;
    brandName: string;
    basicPrice: number;
    description: string;
    sizes: string[];
    images: string[];
    ownerId: number;
    colors: string[];
    cloth: ClothType;
}