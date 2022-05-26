import {IUser} from './IUser';

export interface IBook {
    bookId?: number,
    title: string,
    author: string,
    genreId: number,
    summary?: string,
    checkedOutCount?: number,
    isbn: number,
    yearPublished: number
}