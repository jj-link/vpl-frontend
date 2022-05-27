import { IBook } from './IBook';

export interface IUser {
    userId?: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    books?: IBook[],
    userRole?: number
}