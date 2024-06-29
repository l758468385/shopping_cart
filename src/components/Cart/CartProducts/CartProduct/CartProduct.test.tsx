// CartProduct.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartProduct from './CartProduct';
import { ICartProduct, IProduct } from 'models';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../../../store/slices/cartSlice';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../commons/style/theme';

// 创建一个 mock store
const mockStore = configureStore();
const store = mockStore({});

// 示例产品数据
const mockProduct: ICartProduct = {
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
  selectedSize: 'XL',
  coverImage: 'https://i.ibb.co/cDNmRj/image-1.png'
};

describe('CartProduct Component', () => {
  it('renders product details correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CartProduct product={mockProduct} />
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText(/XL/)).toBeInTheDocument();
  });

  it('calls removeFromCart when delete button is clicked', () => {
    render(
       <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CartProduct product={mockProduct} />
        </Provider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTitle('从购物车中删除产品'));
    const actions = store.getActions();
    expect(actions[0].type).toEqual(removeFromCart.type);
    expect(actions[0].payload).toEqual(mockProduct);
  });

  it('calls incrementQuantity when increase button is clicked', () => {
    render(
       <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CartProduct product={mockProduct} />
        </Provider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getAllByText('+')[0]); // 假设 '+' 是增加数量的按钮的文本
    const actions = store.getActions();
    expect(actions[1].type).toEqual(incrementQuantity.type);
    expect(actions[1].payload).toEqual(mockProduct);
  });

  it('calls decrementQuantity when decrease button is clicked', () => {
    render(
       <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CartProduct product={mockProduct} />
        </Provider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getAllByText('-')[0]); // 假设 '-' 是减少数量的按钮的文本
    const actions = store.getActions();
    expect(actions[2].type).toEqual(decrementQuantity.type);
    expect(actions[2].payload).toEqual(mockProduct);
  });
});
