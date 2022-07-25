import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
  reducer: {
    // TodoReducer is todo slice
    todo: todoReducer,
  },
});
