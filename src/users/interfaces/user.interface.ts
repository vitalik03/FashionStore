export interface IUser{
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    city: string;
    state: string;
    zip: string;
    role: "ADMIN"|"USER";
    createdAt: string;
    updatedAt: string;
}