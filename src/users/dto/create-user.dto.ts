export class CreateUserDto{
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly city: string;
    readonly state: string;
    readonly zip: string;
    readonly role: "ADMIN" | "USER";
    readonly createdAt: string;
    readonly updatedAt: string;
}