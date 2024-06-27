import { ICartProduct, IProduct } from 'models';
import CartProduct from './CartProduct';

import * as S from './style';

interface IProps {
  products: ICartProduct[] ;
}

const CartProducts = ({ products }: IProps) => {
  return (
    <S.Container>
      {products?.length ? (
        products.map((p,index) => <CartProduct product={p} key={(p.sku + index) + (p.selectedSize || '1')} />)
      ) : (
        <S.CartProductsEmpty>
          在购物车中添加一些产品 <br />
          :)
        </S.CartProductsEmpty>
      )}
    </S.Container>
  );
};

export default CartProducts;
