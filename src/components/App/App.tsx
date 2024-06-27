import { useEffect } from 'react';

import Loader from 'components/Loader';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';


import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from 'store/slices/productsSlice';

import * as S from './style';
import { RootState } from '../../store';
import Sort from '../Sort';

function App() {

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => {
    const { items, filterSizes, sortDirection } = state.products;
    let filteredProducts = [...items];
    if (filterSizes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.availableSizes.some((size) => filterSizes.includes(size))
      );
    }

    if (sortDirection === 'ascending') {
      filteredProducts.sort((a, b) => {
       return  a.price - b.price
      });
    } else if (sortDirection === 'descending') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  });
  const productStatus = useSelector((state: RootState) => state.products.status);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <S.Container>
      {productStatus === 'loading' && <Loader />}
      <S.TwoColumnGrid>
        <S.Side>
          <Filter />
          <Sort />
        </S.Side>
        <S.Main>
          <S.MainHeader>
            <p>共找到 <span style={{ fontWeight: 'bold' }}>{products.length || 0}</span> 个产品</p>
          </S.MainHeader>
          <Products products={products} />
        </S.Main>
      </S.TwoColumnGrid>
      <Cart />
    </S.Container>
  );
}

export default App;
