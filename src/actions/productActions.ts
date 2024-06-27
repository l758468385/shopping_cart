// src/actions/productActions.ts
import axios from 'axios';
import { Dispatch } from 'redux';

export const setProducts = (products: any) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const setLoading = () => ({
  type: 'SET_LOADING',
});

export const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading());
    try {
      const response = await axios.get('https://react-shopping-cart-67954.firebaseio.com/products.json');
      console.log('response',response);
      dispatch(setProducts(response.data.products));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
};
export const filterProducts = (filters: string[]) => ({
  type: 'FILTER_PRODUCTS',
  payload: filters,
});
