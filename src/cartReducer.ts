import { CartActionTypes, ADD_TO_CART, OPEN_CART } from './cartActions';
import { IProduct } from 'models';

export interface CartState {
  isOpen: boolean;
  products: IProduct[];
}

const initialState: CartState = {
  isOpen: false,
  products: [],
};

const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case OPEN_CART:
      return {
        ...state,
        isOpen: true,
      };
    default:
      return state;
  }
};

export default cartReducer;
