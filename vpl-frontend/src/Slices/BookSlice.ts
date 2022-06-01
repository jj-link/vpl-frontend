import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBook } from '../Interfaces/IBook';
import axios from 'axios';

interface BookSliceState {
    loading: boolean;
    error: boolean;
    book?: IBook;
    books?: IBook[]
}

// initial state
const initialBookState: BookSliceState = {
    loading: false,
    error: false
};

type addBook = {
    title: string;
    author: string;
    genreId: number;
    summary: string;
    //checkedOutCount: number;
    isbn: number;
    yearPublished: number
}

export const addBook = createAsyncThunk(
    'book/addbook',
    async (credentials: addBook, thunkAPI) => {
        
        try {
            //axios.defaults.withCredentials = true;
            console.log(credentials);
            await axios.post('http://localhost:8000/book/create', credentials)
            .then(res => {
                if(res){
                    console.log(res.data);
                    return res.data;
                }
            });
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)