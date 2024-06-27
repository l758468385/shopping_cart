import { ProductActionTypes, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, APPLY_SIZE_FILTER } from './productActions';
import { IProduct } from 'models';

export interface ProductState {
  isFetching: boolean;
  products: IProduct[];
  error: string | null;
  filters: string[];
}

const initialState: ProductState = {
  isFetching: false,
  products: [],
  error: null,
  filters: [],
};

const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: action.payload,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        products: [],
        error: action.error,
      };
    case APPLY_SIZE_FILTER:
      return {
        ...state,
        filters: action.payload, // 更新尺码筛选条件
      };
    default:
      return state;
  }
};

export default productReducer;
