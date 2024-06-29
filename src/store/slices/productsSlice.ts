import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../services/products';
// 定义异步 thunk
export const fetchProducts: any = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await getProducts();
    return response;
  }
);

export interface IProduct {
  id: number;
  sku: number;
  title: string;
  description: string;
  availableSizes: string[];
  style: string;
  price: number;
  installments: number;
  currencyId: string;
  currencyFormat: string;
  isFreeShipping: boolean;
  coverImage:string,
}

export interface ProductsState {
  items: IProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filterSizes: string[];
  sortDirection: 'ascending' | 'descending' | null | '' | undefined;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  filterSizes: [],
  sortDirection: ''
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSizesFilter: (state, action) => {
      state.filterSizes = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.error.message;
      });
  }
});

export default productsSlice.reducer;

export const { setSizesFilter,setSortDirection } = productsSlice.actions;

