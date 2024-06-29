import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Product from './Product';
import { IProduct } from 'models';
import { theme } from 'commons/style/theme';
import $message from 'commons/Message/Message';

const mockStore = configureStore([]);

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
  coverImage: 'https://i.ibb.co/cDNmRj/image-1.png',
};

jest.mock('../../../commons/Message/Message', () => ({
  warning: jest.fn(),
}));

jest.mock(
  'utils/formatPrice',
  () => (price: number, currencyId: string) =>
    `${currencyId}${price.toFixed(2)}`
);
let store: MockStoreEnhanced<unknown, {}>;
describe('Product component', () => {
  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [],
        isOpen: false,
      },
    });
  });
  it('renders product information correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Product product={mockProduct} />
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('包邮')).toBeInTheDocument();
    expect(screen.getByText('添加购物车')).toBeInTheDocument();
  });

  it('handles size selection and add to cart', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Product product={mockProduct} />
        </Provider>
      </ThemeProvider>
    );

    const sizeSelect: any = screen.getByTestId('size');
    fireEvent.change(sizeSelect, { target: { value: 'M' } });
    expect(sizeSelect.value).toBe('M');

    const addButton = screen.getByText('添加购物车');
    fireEvent.click(addButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'cart/addToCart',
        payload: { ...mockProduct, selectedSize: 'M', quantity: 1 },
      },
      {
        type: 'cart/openCart',
      },
    ]);
  });

  // 校验没选择尺码
  it('shows warning if no size is selected', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Product product={mockProduct} />
        </Provider>
      </ThemeProvider>
    );

    const addButton = screen.getByText('添加购物车');
    fireEvent.click(addButton);

    expect($message.warning).toHaveBeenCalledWith('请选择尺寸！');
  });
});
