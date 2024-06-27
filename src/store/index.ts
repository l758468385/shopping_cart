import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { ProductsState } from './slices/productsSlice';
import cartReducer, { CartState } from './slices/cartSlice';

// 定义临时的 RootState 类型
export interface RootState {
  products: ProductsState;
  cart: CartState;
  // 其他 slice 的状态类型...
}


const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
