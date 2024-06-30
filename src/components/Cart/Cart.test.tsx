import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './Cart';
import { RootState } from 'store';
import { ICartProduct } from 'models';
import '@testing-library/jest-dom/extend-expect';
import { theme } from '../../commons/style/theme';
import { ThemeProvider } from 'styled-components';
import { act } from 'react';
import $message from 'commons/Message/Message';

const mockStore = configureStore([]);
jest.mock('commons/Message/Message', () => ({
  success: jest.fn(),
}));

const mockProducts: ICartProduct[] = [
  {
    id: 1,
    sku: 123,
    title: 'Product 1',
    description: 'Description 1',
    availableSizes: ['S', 'M'],
    style: 'Style 1',
    price: 100,
    installments: 4,
    currencyId: 'USD',
    currencyFormat: '$',
    isFreeShipping: true,
    quantity: 2,
    selectedSize: 'M',
    coverImage: 'https://i.ibb.co/cDNmRj/image-1.png'
  }
];

const initialState: RootState = {
  cart: {
    items: mockProducts,
    isOpen: false
  },
  products: {
    items: mockProducts,
    sortDirection: 'ascending',
    status: 'idle',
    error: null,
    filterSizes: []
  }
};

describe('Cart Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </ThemeProvider>
    );
  });

  it('toggles the cart visibility', () => {
    const { rerender }= render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </ThemeProvider>
    );

    const cartButton = screen.getByRole('button');
    act(() => {
      // 第一次点击购物车logo
      fireEvent.click(cartButton);
    });

    expect(store.getActions()).toEqual([{ type: 'cart/openCart', payload: undefined }]);
    store.clearActions();
    store = mockStore({ ...initialState, cart: { ...initialState.cart, isOpen: true } });
    rerender(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </ThemeProvider>
    );
    act(() => {
      // 第二次点击
      fireEvent.click(cartButton);
    });

    expect(store.getActions()).toEqual( [{ type: 'cart/closeCart', payload: undefined }]);
  });

    it('shows the correct number of products in the cart', () => {
      render(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Cart />
          </Provider>
        </ThemeProvider>
      );

      const quantityElement = screen.getByTitle('购物车中的产品数量'); // 返回具有与作为参数传递的给定文本匹配的title属性的元素
      expect(quantityElement).toHaveTextContent('2');
    });

    it('handles checkout correctly', async () => {
      store = mockStore({ ...initialState, cart: { ...initialState.cart, isOpen: true } });

      render(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Cart />
          </Provider>
        </ThemeProvider>
      );


      const checkoutButton =  screen.getByText('去付款');
      fireEvent.click(checkoutButton);

      expect(store.getActions()).toEqual([{ type: 'cart/closeCart' },{ type: 'cart/clearCart' }]);

      expect($message.success).toHaveBeenCalledWith('总计: $ 200.00');
    });
});
