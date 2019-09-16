import { ClothType } from "../enums/clothType.enum";

export interface IProduct{
    name: string;
    brandName: string;
    basicPrice: number;
    description: string;
    cloth: ClothType;
    quantity: number;
    user: number;
}