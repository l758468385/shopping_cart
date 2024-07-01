import { useState, KeyboardEvent, FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from 'store/slices/cartSlice';
import formatPrice from 'utils/formatPrice';
import * as S from './style';
import { IProduct } from 'models';
import $message from '../../../commons/Message/Message';
import useLazyLoadBackground from '../../../hooks/useLazyLoadBackground';

interface IProductProps {
  product: IProduct;
}

const Product: FC<IProductProps>  = ({ product }) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { ref, isIntersecting } = useLazyLoadBackground(product.coverImage);

  const {
    title,
    price,
    installments,
    currencyId,
    currencyFormat,
    isFreeShipping,
    coverImage
  } = product
  const formattedPrice = formatPrice(price, currencyId);

  let productInstallment;
  if (installments) {
    const installmentPrice = price / installments;
    productInstallment = (
      <S.Installment>
        <span>或 {installments} x</span>
        <b>
          {currencyFormat}
          {formatPrice(installmentPrice, currencyId)}
        </b>
      </S.Installment>
    );
  }

  const handleAddProduct = () => {
    if (!selectedSize) {
      $message.warning("请选择尺寸！");
      return;
    }
    dispatch(addToCart({ ...product, selectedSize, quantity: 1 }));
    dispatch(openCart());
  };

  const handleAddProductWhenEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Space') handleAddProduct();
  };

  return (
    <S.Container  ref={ref}   coverImage={isIntersecting ? coverImage : ''} data-testid='product-item' onKeyUp={handleAddProductWhenEnter}    tabIndex={1}>
      {isFreeShipping && <S.Stopper>包邮</S.Stopper>}
      <S.Image alt={title} />
      <S.Title>{title}</S.Title>
      <div style={{ marginBottom: '10px',marginTop:'20px' }}>
        <select
          data-testid='size'
          id="size"
          value={selectedSize || ""}
          onChange={(e) => setSelectedSize(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            minWidth: '150px',
            cursor:'pointer'
          }}
        >
          <option value="" disabled>请选择尺寸</option>
          {product.availableSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <S.Price>
        <S.Val data-testid='product-price'>
          <small>{currencyFormat}</small>
          <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substring(formattedPrice.length - 3)}</span>
        </S.Val>
        {productInstallment}
      </S.Price>
      <S.BuyButton  data-testid='add-to-cart' onClick={handleAddProduct} tabIndex={-1}>
       添加购物车
      </S.BuyButton>
    </S.Container>
  );
};

export default memo(Product);
