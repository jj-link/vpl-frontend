import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBook } from '../Interfaces/IBook';
import axios from 'axios';

interface BookSliceState {
    loading: boolean,
    error: boolean,
    book?: IBook,
    books?: IBook[],
    recentbooks?: IBook[],
    popularbooks?: IBook[],
    mybooks?: IBook[]
}

const initialBookState: BookSliceState = {
    loading: false,
    error: false
};

type addbook = {
    title: string;
    author: string;
    genreId: number;
    summary: string;
    isbn: number;
    yearPublished: number;
    //checkedOutCount: number;
}
export const addBook = createAsyncThunk(
    'book/addbook',
    async (credentials: addbook, thunkAPI) => {
        
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
);

type editbook = {
    bookId: number,
    title: string;
    author: string;
    genreId: number;
    summary: string;
    isbn: number;
    yearPublished: number;
    checkedOutCount: number;
}
export const editBook = createAsyncThunk(
    'book/editbook',
    async (credentials: editbook, thunkAPI) => {
        
        try {
            //axios.defaults.withCredentials = true;
            console.log(credentials);
            await axios.post('http://localhost:8000/book/update', credentials)
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
);

export const getAllBooks = createAsyncThunk(
    'book/getallbooks',
    async (thunkAPI) => {
    try {
        //axios.defaults.withCredentials = true;
        const res = await axios.get('http://localhost:8000/book/get-all-books');
        console.log(res.data);
        return res.data;
      } catch (e) {
        console.log(e);
      }
    }
);

export const getPopularBooks = createAsyncThunk(
  'book/getpopularbooks',
  async (thunkAPI) => {
  try {
      //axios.defaults.withCredentials = true;
      const res = await axios.get('http://localhost:8000/book/get-books-most-popular');
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getRecentBooks = createAsyncThunk(
  'book/getrecentbooks',
  async (thunkAPI) => {
  try {
      //axios.defaults.withCredentials = true;
      const res = await axios.get('http://localhost:8000/book/recent');
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getMyBooks = createAsyncThunk(
    'book/getmybooks',
    async (userId: number, thunkAPI) => {
    try {
        //axios.defaults.withCredentials = true;
        console.log(userId);
        const res = await axios.get('http://localhost:8000/user/checkout-show', {data:{userId}});
        console.log(res.data);
        return res.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

export const deleteBook = createAsyncThunk(
    'book/deletebook',
    async (isbn: number, thunkAPI) => {
        
        try {
            await axios.delete('http://localhost:8000/book/remove-books-by-isbn', {data:{isbn}})
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
);

export const BookSlice = createSlice({
    name: 'book',
    initialState: initialBookState,
  
    // these are actions inside reducers
    reducers: {
      toggleError: (state) => {
        state.error = !state.error;
      },
    },

    extraReducers: (builder) => {
        // for all books
        builder.addCase(getAllBooks.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            state.books = action.payload;
            state.error = false;
            state.loading = false;
        });
        builder.addCase(getAllBooks.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        // for popular books
        builder.addCase(getPopularBooks.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPopularBooks.fulfilled, (state, action) => {
            state.popularbooks = action.payload;
            state.error = false;
            state.loading = false;
        });
        builder.addCase(getPopularBooks.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        // for recent books
        builder.addCase(getRecentBooks.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getRecentBooks.fulfilled, (state, action) => {
            state.recentbooks = action.payload;
            state.error = false;
            state.loading = false;
        });
        builder.addCase(getRecentBooks.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        // for my books
        builder.addCase(getMyBooks.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getMyBooks.fulfilled, (state, action) => {
            state.mybooks = action.payload;
            state.error = false;
            state.loading = false;
        });
        builder.addCase(getMyBooks.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
    }
})


export const { toggleError } = BookSlice.actions;

export default BookSlice.reducer;