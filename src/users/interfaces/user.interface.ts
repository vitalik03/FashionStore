export interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    state: string;
    zip: string;
    role: "ADMIN"|"USER";
    createdAt: string;
    updatedAt: string;
}