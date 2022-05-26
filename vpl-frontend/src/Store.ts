import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';
import bookReducer from './Slices/BookSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        books: bookReducer
    }
});

//for state
export type RootState = ReturnType<typeof store.getState>;

// for dispatch actions
export type AppDispatch = typeof store.dispatch;