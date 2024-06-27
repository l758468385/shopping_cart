import { Dispatch } from 'redux';
import { IProduct } from 'models';
import { getProducts } from 'services/products'; // 假设这是获取产品数据的服务函数

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const APPLY_SIZE_FILTER = 'APPLY_SIZE_FILTER'; // 新增的动作类型

export interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

export interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: IProduct[];
}

export interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE;
  error: string;
}

export interface ApplySizeFilterAction { // 新增的接口
  type: typeof APPLY_SIZE_FILTER;
  payload: string[];
}

export type ProductActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | ApplySizeFilterAction; // 添加新动作类型

export const fetchProducts = () => async (dispatch: Dispatch<ProductActionTypes>) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    const products = await getProducts(); // 调用服务函数获取产品数据
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    // @ts-ignore
    dispatch({ type: FETCH_PRODUCTS_FAILURE, error: error.message });
  }
};

export const applySizeFilter = (sizes: string[]): ApplySizeFilterAction => {
  console.log('sizes',sizes);
  return {
    type: APPLY_SIZE_FILTER,
    payload: sizes,
  }
};
