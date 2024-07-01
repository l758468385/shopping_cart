import { createSelector } from 'reselect';
import { RootState } from 'store';

const selectProductsState = (state: RootState) => state.products;

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  (productsState) => {
    const { items, filterSizes, sortDirection } = productsState;
    let filteredProducts = [...items];

    if (filterSizes.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.availableSizes.some(size => filterSizes.includes(size))
      );
    }

    if (sortDirection === 'ascending') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortDirection === 'descending') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  }
);
