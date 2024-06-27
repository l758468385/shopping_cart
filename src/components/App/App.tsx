import { useEffect } from 'react';

import Loader from 'components/Loader';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';



import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from 'store/slices/productsSlice';

import * as S from './style';
import { RootState } from '../../store';

function App() {

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => {
    const { items, filterSizes } = state.products;
    if (filterSizes.length === 0) {
      return items;
    }
    return items.filter((product: { availableSizes: any[]; }) => product.availableSizes.some(size => filterSizes.includes(size)));
  });
  const productStatus = useSelector((state:RootState) => state.products.status);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <S.Container>
      {productStatus === 'loading' && <Loader />}
      <S.TwoColumnGrid>
        <S.Side>
          <Filter />
        </S.Side>
        <S.Main>
          <S.MainHeader>
            <p>{products?.length} Product(s) found</p>
          </S.MainHeader>
          <Products products={products} />
        </S.Main>
      </S.TwoColumnGrid>
      <Cart />
    </S.Container>
  );
}

export default App;
