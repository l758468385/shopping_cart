import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import { RootState } from 'store';
import { fetchProducts } from 'store/slices/productsSlice';
import * as S from './style';
import { ThemeProvider } from '../../commons/style/styled-components';
import { theme } from '../../commons/style/theme';
import { IProduct } from '../../models';
interface IProductsProps {
  products: IProduct[]; // 定义 props 的类型为包含多个 IProduct 的数组
}
jest.mock('store/slices/productsSlice', () => ({
  fetchProducts: jest.fn(),
}));


const mockStore = configureStore([thunk]);
const mockProduct: IProduct = {
  id: 1,
  sku: 1,
  title: 'Test Product',
  description: 'This is a test product',
  availableSizes: ['S', 'M', 'L'],
  style: 'Test Style',
  price: 10.99,
  installments: 4,
  currencyId: 'USD',
  currencyFormat: '$',
  isFreeShipping: true,
  coverImage: 'https://i.ibb.co/cDNmRj/image-1.png'
};
const initialState: RootState = {
  products: {
    items: [
      mockProduct
    ],
    filterSizes: ['M'],
    sortDirection: 'ascending',
    status: 'idle',
    error:''
  },
  cart: {
    items: [],
    isOpen: false,
  },
};
jest.mock('components/Loader', () => () => <div>Loading...</div>);
jest.mock('components/Filter', () => () => <div>Filter Component</div>);
jest.mock('components/Sort', () => () => <div>Sort Component</div>);
jest.mock('components/Products', () => ({ products }:IProductsProps) => <div>Products: {products.length}</div>);
jest.mock('components/Cart', () => () => <div>Cart Component</div>);

describe('App Component', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore(initialState);
    (fetchProducts as jest.Mock).mockClear();
    (fetchProducts as jest.Mock).mockImplementation(() => () => Promise.resolve());
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    );
    expect(screen.getByText('Filter Component')).toBeInTheDocument();
    expect(screen.getByText('Sort Component')).toBeInTheDocument();
    expect(screen.getByText('Products: 1')).toBeInTheDocument();
    expect(screen.getByText('Cart Component')).toBeInTheDocument();
  });

  it('dispatches fetchProducts on mount', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    );
    expect(fetchProducts).toHaveBeenCalled();
  });

  it('shows loader when products are loading', () => {
    store = mockStore({
      ...initialState,
      products: {
        ...initialState.products,
        status: 'loading',
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

});
