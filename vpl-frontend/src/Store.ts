import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';
import bookReducer from './Slices/BookSlice';

export const Store = configureStore({
    reducer: {
        user: userReducer,
        book: bookReducer
    }
});

//for state
export type RootState = ReturnType<typeof Store.getState>;

// for dispatch actions
export type AppDispatch = typeof Store.dispatch;