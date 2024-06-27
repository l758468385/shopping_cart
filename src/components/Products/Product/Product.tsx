import { useState, KeyboardEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from 'store/slices/cartSlice';
import formatPrice from 'utils/formatPrice';
import * as S from './style';
import { IProduct, ICartProduct } from 'models';
interface IProductProps {
  product: IProduct; // 定义 props 的类型为 IProduct
}
const Product: FC<IProductProps>  = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const {
    sku,
    title,
    price,
    installments,
    currencyId,
    currencyFormat,
    isFreeShipping,

  } = product
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
    if (!selectedSize) {
      alert("请选择尺码");
      return;
    }
    console.log('selectedSize',selectedSize);
    dispatch(addToCart({ ...product, selectedSize, quantity: 1 }));
    dispatch(openCart());
  };

  const handleAddProductWhenEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Space') handleAddProduct();
  };

  return (
    <S.Container onKeyUp={handleAddProductWhenEnter} sku={sku} tabIndex={1}>
      {isFreeShipping && <S.Stopper>包邮</S.Stopper>}
      <S.Image alt={title} />
      <S.Title>{title}</S.Title>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="size" style={{ marginRight: '10px' }}> </label>
        <select
          id="size"
          value={selectedSize || ""}
          onChange={(e) => setSelectedSize(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            minWidth: '150px',
          }}
        >
          <option value="" disabled>请选择尺寸</option>
          {product.availableSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <S.Price>
        <S.Val>
          <small>{currencyFormat}</small>
          <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substring(formattedPrice.length - 3)}</span>
        </S.Val>
        {productInstallment}
      </S.Price>
      <S.BuyButton onClick={handleAddProduct} tabIndex={-1}>
       添加购物车
      </S.BuyButton>
    </S.Container>
  );
};

export default Product;
