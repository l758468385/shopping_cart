import Product from './Product';

import * as S from './style';
import { IProduct } from '../../models';
import { FC, memo, useMemo } from 'react';
interface IProductsProps {
  products: IProduct[]; // 定义 props 的类型为包含多个 IProduct 的数组
}

const Products: FC<IProductsProps>  = ({ products } ) => {
  const memoizedProducts = useMemo(() => {
    return products.map((p) => <Product product={p} key={p.sku} />);
  }, [products]);

  return (
    <S.Container>
      {memoizedProducts}
    </S.Container>
  );
};

export default memo(Products);
