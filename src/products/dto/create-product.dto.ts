import { ClothType } from "../enums/clothType.enum";

export class CreateProductDto{
    readonly name: string;
    readonly brandName: string;
    readonly basicPrice: number;
    readonly description: string;
    readonly sizes: string[];
    readonly images: string[];
    readonly ownerId: number;
    readonly colors: string[];
    readonly cloth: ClothType;
}