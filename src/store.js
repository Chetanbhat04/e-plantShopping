// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/CartSlice'; // adjust path

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
