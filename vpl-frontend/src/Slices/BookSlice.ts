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
    mybooks?: IBook[],
    genrebooklist?: IBook[],
    searchResults?: IBook[]
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
            //console.log(credentials);
            const res = await axios.post('http://3.96.174.192:8000/book/create', credentials);
            return res.data;
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

type editbook = {
    bookId?: number,
    title?: string;
    author?: string;
    genreId?: number;
    summary?: string;
    isbn?: number;
    yearPublished?: number;
}
export const editBook = createAsyncThunk(
    'book/editbook',
    async (credentials: editbook, thunkAPI) => {
        
        try {
            //axios.defaults.withCredentials = true;
            console.log(credentials);
            const res = await axios.put('http://3.96.174.192:8000/book/update', credentials);
            //console.log(res.data);
            return res.data;
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
        const res = await axios.get('http://3.96.174.192:8000/book/get-all-books');
        //console.log(res.data);
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
      const res = await axios.get('http://3.96.174.192:8000/book/get-books-most-popular');
      //console.log(res.data);
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
      const res = await axios.get('http://3.96.174.192:8000/book/recent');
      //console.log(res.data);
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
        //console.log(userId);
        const res = await axios.get(`http://3.96.174.192:8000/user/checkout-show/${userId}`);
        //console.log(res.data);
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
            const res = await axios.delete('http://3.96.174.192:8000/book/remove-books-by-isbn', {data:{isbn}})
            //console.log(res.data);
            return res.data;
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

export const getBooksByGenreId = createAsyncThunk(
    'book/genrelist',
    async (genreId: number, thunkAPI) => {
        //console.log(genreId);
        try {
            let res = await axios.get(`http://3.96.174.192:8000/book/get-books-by-genreId/${genreId}`)
            //console.log(res.data);
            return res.data;
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);


export const getBookByIsbn = createAsyncThunk(
    'book/getbyisbn',
    async (isbn: number | undefined, thunkAPI) => {
        //console.log(isbn);
        try {
            let res = await axios.get(`http://3.96.174.192:8000/book/get-books-by-isbn/${isbn}`)
            //console.log(res.data);
            return res.data;
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

type checkoutCredentials = {
    userId?: number,
    isbn: number
}

export const checkoutBook = createAsyncThunk(
    'book/checkoutBook',
    async (credentials: checkoutCredentials, thunkAPI) => {
    try {
        //axios.defaults.withCredentials = true;
        //console.log("from checkout book" + credentials);
        const res = await axios.post('http://3.96.174.192:8000/user/checkout-book', credentials);
        //console.log(res.data);
        return res.data;
      } catch (e) {
        console.log(e);
      }
    }
);


export const searchBooks = createAsyncThunk(
    'book/searchbooks',
    async (input: string, thunkAPI) => {
        console.log(input);
        try {
            let res = await axios.get(`http://3.96.174.192:8000/book/search/${input}`)
            console.log(res.data);
            return res.data;
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
        //for genre list
        builder.addCase(getBooksByGenreId.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getBooksByGenreId.fulfilled, (state, action) => {
            state.genrebooklist = action.payload;
            //console.log("hello from redux " + state.genrebooklist);
            state.error = false;
            state.loading = false;
        });
        builder.addCase(getBooksByGenreId.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });

        // get book by isbn
        builder.addCase(getBookByIsbn.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getBookByIsbn.fulfilled, (state, action) => {
            state.book = action.payload;
            console.log("hello from redux " + state.book);
            state.error = false;
            state.loading = false;
        });
        builder.addCase(getBookByIsbn.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });

        //update book
        builder.addCase(editBook.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(editBook.fulfilled, (state, action) => {
            state.book = action.payload;
            console.log("hello from redux " + state.book);
            state.error = false;
            state.loading = false;
        });
        builder.addCase(editBook.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });

        //checkout book
        builder.addCase(checkoutBook.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(checkoutBook.fulfilled, (state, action) => {
            //state.book = action.payload;
            //console.log("hello from redux " + state.book);
            state.error = false;
            state.loading = false;
        });
        builder.addCase(checkoutBook.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });

        //search book
        builder.addCase(searchBooks.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(searchBooks.fulfilled, (state, action) => {
            state.searchResults = action.payload;
            //console.log("hello from redux " + state.book);
            state.error = false;
            state.loading = false;
        });
        builder.addCase(searchBooks.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
    }
})


export const { toggleError } = BookSlice.actions;

export default BookSlice.reducer;