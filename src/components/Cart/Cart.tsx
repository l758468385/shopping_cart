import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { ICartProduct } from 'models';

import {openCart,clearCart,closeCart} from 'store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items:products,isOpen } = useSelector((state: RootState) => {
    return state.cart
  });


  const productQuantity = products.reduce(
    (sum: number, product: ICartProduct) => {
      sum += product.quantity;
      return sum;
    },
    0
  );

  const totalPrice = products.reduce((sum: number, product: ICartProduct) => {
    sum += product.price * product.quantity;
    return sum;
  }, 0);

  const installments = products.reduce(
    (greater: number, product: ICartProduct) => {
      greater =
        product.installments > greater ? product.installments : greater;
      return greater;
    },
    0
  );

  const total = {
    productQuantity,
    installments,
    totalPrice,
    currencyId: 'USD',
    currencyFormat: '$',
  };


  const handleCheckout = () => {
    if (total.productQuantity) {
      alert(
        `总计: ${total.currencyFormat} ${formatPrice(
          total.totalPrice,
          total.currencyId
        )}`
      );
      dispatch(closeCart())
      dispatch(clearCart())
    } else {
      alert('在购物车中添加一些产品!');
    }
  };

  const handleToggleCart = (isOpen: boolean) => () => {
    if (isOpen) {
      dispatch(closeCart());
    } else {
      dispatch(openCart());
    }
  }
  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={handleToggleCart(isOpen)}>
        {isOpen ? (
          <span>X</span>
        ) : (
          <S.CartIcon>
            <S.CartQuantity title="购物车中的产品数量">
              {total.productQuantity}
            </S.CartQuantity>
          </S.CartIcon>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent>
          <S.CartContentHeader>
            <S.CartIcon large>
              <S.CartQuantity>{total.productQuantity}</S.CartQuantity>
            </S.CartIcon>
            <S.HeaderTitle>购物车</S.HeaderTitle>
          </S.CartContentHeader>

          <CartProducts products={products} />

          <S.CartFooter>
            <S.Sub>总计</S.Sub>
            <S.SubPrice>
              <S.SubPriceValue>{`${total.currencyFormat} ${formatPrice(
                total.totalPrice,
                total.currencyId
              )}`}</S.SubPriceValue>
              <S.SubPriceInstallment>
                {total.installments ? (
                  <span>
                    {`或最多 ${total.installments} x ${
                      total.currencyFormat
                    } ${formatPrice(
                      total.totalPrice / total.installments,
                      total.currencyId
                    )}`}
                  </span>
                ) : null}
              </S.SubPriceInstallment>
            </S.SubPrice>
            <S.CheckoutButton onClick={handleCheckout} autoFocus>
              去付款
            </S.CheckoutButton>
          </S.CartFooter>
        </S.CartContent>
      )}
    </S.Container>
  );
};

export default Cart;
