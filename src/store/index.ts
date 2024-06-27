// src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 使用 localStorage 作为默认存储
// @ts-ignore
import thunk from 'redux-thunk';
// @ts-ignore
import { composeWithDevTools } from 'redux-devtools-extension';
// @ts-ignore
import cartReducer from '../reducers/cartReducer';
// @ts-ignore
import productsReducer from '../reducers/productsReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(persistConfig, cartReducer as any),
  products: productsReducer,
});


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
