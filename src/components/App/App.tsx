import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';
import { fetchProducts } from '../../productActions';
import { RootState } from '../../store'; // 导入根状态类型

import * as S from './style';

function App() {
  const dispatch = useDispatch();
  const { isFetching, products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <S.Container>
      {isFetching && <Loader />}
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
      {/*<Cart />*/}
    </S.Container>
  );
}

export default App;
