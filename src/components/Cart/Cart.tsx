import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ICartProduct } from '../../models';


import {openCart,closeCart} from '../../store/slices/cartSlice';

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


  console.log('total',total);
  const handleCheckout = () => {
    if (total.productQuantity) {
      alert(
        `Checkout - Subtotal: ${total.currencyFormat} ${formatPrice(
          total.totalPrice,
          total.currencyId
        )}`
      );
    } else {
      alert('Add some product in the cart!');
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
            <S.CartQuantity title="Products in cart quantity">
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
            <S.HeaderTitle>Cart</S.HeaderTitle>
          </S.CartContentHeader>

          <CartProducts products={products} />

          <S.CartFooter>
            <S.Sub>SUBTOTAL</S.Sub>
            <S.SubPrice>
              <S.SubPriceValue>{`${total.currencyFormat} ${formatPrice(
                total.totalPrice,
                total.currencyId
              )}`}</S.SubPriceValue>
              <S.SubPriceInstallment>
                {total.installments ? (
                  <span>
                    {`OR UP TO ${total.installments} x ${
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
              Checkout
            </S.CheckoutButton>
          </S.CartFooter>
        </S.CartContent>
      )}
    </S.Container>
  );
};

export default Cart;
