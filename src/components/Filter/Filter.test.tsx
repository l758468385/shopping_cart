import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Filter, { availableSizes } from './Filter'; // Ensure to import availableSizes
import { setSizesFilter } from 'store/slices/productsSlice';

// Mock Redux store
const mockStore = configureStore([]);

// Mock Theme Provider
const theme = {
  colors: {
    primary: '#007bff', // Example primary color
    secondary: '#6c757d', // Example secondary color
  },
};

describe('Filter component', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      products: {
        filterSizes: ['XS', 'S'],
      },
    });
  });

  it('renders checkboxes for available sizes', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Filter />
        </Provider>
      </ThemeProvider>
    );

    availableSizes.forEach(size => {
      const checkbox = getByText(size);
      expect(checkbox).toBeInTheDocument();
    });
  });

  it('dispatches setSizesFilter action on checkbox toggle', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Filter />
        </Provider>
      </ThemeProvider>
    );

    const checkboxLabel = 'XS';
    const checkbox = getByLabelText(checkboxLabel);
    fireEvent.click(checkbox);

    expect(store.getActions()).toContainEqual(setSizesFilter(['S'])); // After toggling 'XS', 'S' should be left
  });
});