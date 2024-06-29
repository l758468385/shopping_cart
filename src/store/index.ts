import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer, { ProductsState } from './slices/productsSlice';
import cartReducer, { CartState } from './slices/cartSlice';

// 定义临时的 RootState 类型
export interface RootState {
  products: ProductsState;
  cart: CartState;
  // 其他 slice 的状态类型...
}

// 配置购物车的持久化
const cartPersistConfig = {
  key: 'cart',
  storage,
  blacklist: [], // 如果需要排除某些属性，可以在这里列出
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// 组合 reducer
const rootReducer = combineReducers({
  products: productsReducer,
  cart: persistedCartReducer,
});

// 配置 store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
