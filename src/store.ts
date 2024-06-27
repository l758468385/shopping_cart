import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认是 localStorage
import thunkMiddleware from 'redux-thunk';
import productReducer, { ProductState } from './productReducer'; // 假设这是你的产品 reducer
export interface RootState {
  products: ProductState;
  // 可以添加其他 reducer 的状态
}
// 根 reducer
const rootReducer = combineReducers({
  products: productReducer,
  // 可以添加其他 reducer，比如购物车的 reducer
});

// Redux Persist 配置
const persistConfig = {
  key: 'root',
  storage,
};

// 创建 persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建 Redux store
const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

export { store, persistor };
