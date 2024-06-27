import { createSlice } from '@reduxjs/toolkit';
import { ICartProduct } from 'models';
export interface CartState {
  items: ICartProduct[];
  isOpen:boolean
}
const initialState: CartState = {
  items: [],
  isOpen:false
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedSize } = action.payload;
      const item = state.items.find(item => item.id === id && item.selectedSize === selectedSize);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedSize } = action.payload;
      const index = state.items.findIndex(item => item.id === id && item.selectedSize === selectedSize);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const item = state.items.find(item => item.id === id && item.selectedSize === selectedSize);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const item = state.items.find(item => item.id === id && item.selectedSize === selectedSize);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        const index = state.items.findIndex(item => item.id === id && item.selectedSize === selectedSize);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addToCart, removeFromCart, clearCart,toggleCart,openCart,closeCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
