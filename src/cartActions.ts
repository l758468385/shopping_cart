import { IProduct } from 'models';

export const ADD_TO_CART = 'ADD_TO_CART';
export const OPEN_CART = 'OPEN_CART';

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: IProduct;
}

export interface OpenCartAction {
  type: typeof OPEN_CART;
}

export type CartActionTypes = AddToCartAction | OpenCartAction;

export const addToCart = (product: {
  quantity: number;
  installments: number;
  price: number;
  description: string;
  isFreeShipping: boolean;
  style: string;
  id: number;
  sku: number;
  title: string;
  availableSizes: string[];
  currencyId: string;
  currencyFormat: string
}): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: product,
});

export const openCart = (): OpenCartAction => ({
  type: OPEN_CART,
});
