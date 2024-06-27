import { KeyboardEvent } from 'react';

import { addToCart } from 'store/slices/cartSlice';
import { openCart } from 'store/slices/cartSlice';
import formatPrice from 'utils/formatPrice';
import { IProduct } from 'models';


import * as S from './style';
import { useDispatch } from 'react-redux';

interface IProps {
  product: IProduct;
}

const Product = ({ product }: IProps) => {
  const dispatch = useDispatch();

  const {
    sku,
    title,
    price,
    installments,
    currencyId,
    currencyFormat,
    isFreeShipping
  } = product;

  const formattedPrice = formatPrice(price, currencyId);
  let productInstallment;

  if (installments) {
    const installmentPrice = price / installments;

    productInstallment = (
      <S.Installment>
        <span>or {installments} x</span>
        <b>
          {currencyFormat}
          {formatPrice(installmentPrice, currencyId)}
        </b>
      </S.Installment>
    );
  }
  const handleAddProduct = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(openCart());
  };

  const handleAddProductWhenEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Space') handleAddProduct();
  };

  return (
    <S.Container onKeyUp={handleAddProductWhenEnter} sku={sku} tabIndex={1}>
      {isFreeShipping && <S.Stopper>Free shipping</S.Stopper>}
      <S.Image alt={title} />
      <S.Title>{title}</S.Title>
      <S.Price>
        <S.Val>
          <small>{currencyFormat}</small>
          <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substring(formattedPrice.length - 3)}</span>
        </S.Val>
        {productInstallment}
      </S.Price>
      <S.BuyButton onClick={handleAddProduct} tabIndex={-1}>
        Add to cart
      </S.BuyButton>
    </S.Container>
  );
};

export default Product;
