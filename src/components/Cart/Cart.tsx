import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import { useCart } from 'contexts/cart-context';

import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import {  toggleCart } from 'store/slices/cartSlice';
import { RootState } from '../../store';
const Cart = () => {
  // const { products, total, isOpen, openCart, closeCart } = useCart();
  const dispatch = useDispatch();
  const { items,isOpen } = useSelector((state: RootState) => {
    return state.cart
  });

  // 计算购物车总量和总价
  const total = items.reduce(
    (accumulator: { productQuantity: any; totalPrice: number; }, currentItem: { quantity: number; price: number; }) => {
      accumulator.productQuantity += currentItem.quantity;
      accumulator.totalPrice += currentItem.price * currentItem.quantity;
      return accumulator;
    },
    {
      productQuantity: 0,
      totalPrice: 0,
    }
  );
  console.log('total',total);
  const products = items
  // const handleCheckout = () => {
  //   if (total.productQuantity) {
  //     alert(
  //       `Checkout - Subtotal: ${total.currencyFormat} ${formatPrice(
  //         total.totalPrice,
  //         total.currencyId
  //       )}`
  //     );
  //   } else {
  //     alert('Add some product in the cart!');
  //   }
  // };


  return (
    <div></div>
  );
};

export default Cart;
