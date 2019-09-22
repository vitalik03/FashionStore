import { ClothType } from "../enums/clothType.enum";

export interface IProduct{
    id?: number;
    name: string;
    brandName: string;
    basicPrice: number;
    description: string;
    cloth: ClothType;
    quantity: number;
    user: number;
    createdAt?: Date;
    updatedAt: Date;
}