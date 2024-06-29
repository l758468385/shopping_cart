import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from './Products';
import { IProduct } from '../../models';
import { Provider } from 'react-redux';
import { theme } from 'commons/style/theme';
import { ThemeProvider } from 'styled-components';
import store from '../../store';

// Mock the Product component
jest.mock('./Product', () => {
  return ({ product }: { product: IProduct }) => (
    <div data-testid="product">{product.title}</div>
  );
});

const mockProducts: IProduct[] = [
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
    isFreeShipping: true
  },
  {
    id: 2,
    sku: 456,
    title: 'Product 2',
    description: 'Description 2',
    availableSizes: ['L', 'XL'],
    style: 'Style 2',
    price: 200,
    installments: 4,
    currencyId: 'USD',
    currencyFormat: '$',
    isFreeShipping: false
  }
];

describe('Products Component', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Products products={mockProducts}></Products>
        </Provider>
      </ThemeProvider>
    );
  });

  it('renders the correct number of products', () => {
    render(<ThemeProvider theme={theme}>
      <Provider store={store}>
        <Products products={mockProducts}></Products>
      </Provider>
    </ThemeProvider>);
    const productElements = screen.getAllByTestId('product');
    expect(productElements).toHaveLength(mockProducts.length);
  });

  it('renders the correct product titles', () => {
    render(<ThemeProvider theme={theme}>
      <Provider store={store}>
        <Products products={mockProducts}></Products>
      </Provider>
    </ThemeProvider>);
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });
});
