import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item: { name, image, description, cost, category, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      // If item already exists (by name), increase quantity; otherwise push new item.
      const incoming = action.payload;
      const existingIndex = state.items.findIndex(i => i.name === incoming.name);
      if (existingIndex !== -1) {
        state.items[existingIndex].quantity = (state.items[existingIndex].quantity || 1) + (incoming.quantity || 1);
      } else {
        state.items.push(incoming);
      }
    },
    removeItem: (state, action) => {
      // action.payload expected to be item name or unique id
      const key = action.payload;
      state.items = state.items.filter(i => i.name !== key);
    },
    updateQuantity: (state, action) => {
      // action.payload expected { name, quantity }
      const { name, quantity } = action.payload;
      const idx = state.items.findIndex(i => i.name === name);
      if (idx !== -1) {
        state.items[idx].quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
