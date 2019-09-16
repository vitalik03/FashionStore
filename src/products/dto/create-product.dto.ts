import { ClothType } from "../enums/clothType.enum";

export class CreateProductDto{
    readonly name: string;
    readonly brandName: string;
    readonly basicPrice: number;
    readonly description: string;
    readonly cloth: ClothType;
    readonly quantity: number;
    readonly user: number;
}