// Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the cart slice reducer
import cartReducer from './CartSlice'; // adjust path if CartSlice is in another folder

// Create Redux store
const store = configureStore({
    reducer: {
        // 'cart' slice managed by cartReducer
        cart: cartReducer,
    },
});

// Export store so it can be used by Provider in index.js
export default store;
