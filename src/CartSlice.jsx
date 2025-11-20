// CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    // each item object shape:
    // { name, image, description, cost, category, quantity }
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // action.payload expected: { name, image, description, cost, category, quantity? }
      const incoming = action.payload;
      const name = incoming.name;

      // Find existing item by name
      const existingIndex = state.items.findIndex(item => item.name === name);

      if (existingIndex !== -1) {
        // Item exists: increment its quantity
        const existing = state.items[existingIndex];
        const inc = incoming.quantity || 1;
        existing.quantity = (existing.quantity || 1) + inc;
      } else {
        // New item: add with quantity defaulting to 1 if not provided
        const toAdd = {
          ...incoming,
          quantity: incoming.quantity || 1,
        };
        state.items.push(toAdd);
      }
    },

    removeItem: (state, action) => {
      // action.payload expected to be item name (string) or { name }
      const payload = action.payload;
      const name = typeof payload === 'string' ? payload : payload.name;

      // Remove items matching the name
      state.items = state.items.filter(item => item.name !== name);
    },

    updateQuantity: (state, action) => {
      // action.payload expected: { name, quantity }
      const { name, quantity } = action.payload;
      if (typeof name === 'undefined' || typeof quantity === 'undefined') {
        return;
      }

      const idx = state.items.findIndex(item => item.name === name);
      if (idx !== -1) {
        // If quantity <= 0 remove the item
        if (quantity <= 0) {
          state.items.splice(idx, 1);
        } else {
          state.items[idx].quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
