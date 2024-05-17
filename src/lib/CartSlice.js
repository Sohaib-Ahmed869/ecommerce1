import { createSlice } from '@reduxjs/toolkit';


export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item._id !== action.payload._id);
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(item => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      return [];
    },
    calculateTotal: (state) => {
      const Total = state.reduce((acc, item) => acc + item.price * item.quantity, 0);
      console.log(Total);
      return Total;
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
