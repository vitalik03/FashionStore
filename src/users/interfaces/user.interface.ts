import { Exclude } from "class-transformer";

export class IUser{
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    state: string;
    zip: string;
    role: "ADMIN" | "USER";
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    password: string;

    constructor(partial: Partial<IUser>) {
        Object.assign(this, partial);
    }
}