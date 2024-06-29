import React from 'react';
import { render, screen } from '@testing-library/react';
import CartProducts from './CartProducts';
import { ICartProduct } from 'models';
import { theme } from '../../../commons/style/theme';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from '../../../store';


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
    selectedSize: 'M'
  }
];

// 模拟空购物车的情况
describe('CartProducts with no products', () => {
  it('should display empty message when no products are present', () => {
    const emptyProducts: ICartProduct[] = [];
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CartProducts products={emptyProducts} />);
        </Provider>
      </ThemeProvider>);

    expect(screen.getByText(/在购物车中添加一些产品/i)).toBeInTheDocument();
  });
});

// 模拟购物车中有产品的情况
describe('CartProducts with products', () => {
  it('should render CartProduct for each product in the products array', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CartProducts products={mockProducts} />);
        </Provider>
      </ThemeProvider>
    );
    // 确认每个产品都被渲染了
    mockProducts.forEach(product => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });
});
