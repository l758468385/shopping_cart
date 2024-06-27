import formatPrice from 'utils/formatPrice';
import { ICartProduct } from 'models';

import { removeFromCart, incrementQuantity, decrementQuantity } from 'store/slices/cartSlice';
import * as S from './style';
import { useDispatch } from 'react-redux';

interface IProps {
  product: ICartProduct;
}
const CartProduct = ({ product }: IProps) => {
  const dispatch = useDispatch();

  const {
    sku,
    title,
    price,
    style,
    currencyId,
    currencyFormat,
    quantity,
    selectedSize
  } = product;

  const handleRemoveProduct = () => dispatch(removeFromCart(product));
  const handleIncreaseProductQuantity = () => dispatch(incrementQuantity(product));
  const handleDecreaseProductQuantity = () => dispatch(decrementQuantity(product));

  return (
    <S.Container>
      <S.DeleteButton
        onClick={handleRemoveProduct}
        title="从购物车中删除产品"
      />
      <S.Image
        src={require(`static/products/${sku}-1-cart.webp`)}
        alt={title}
      />
      <S.Details>
        <S.Title>{title}</S.Title>
        <S.Desc>
          {`${selectedSize} | ${style}`} <br />
          数量：{quantity}
        </S.Desc>
      </S.Details>
      <S.Price>
        <p>{`${currencyFormat}  ${formatPrice(price, currencyId)}`}</p>
        <div>
          <S.ChangeQuantity
            onClick={handleDecreaseProductQuantity}
            // disabled={quantity === 1 ? true : false}
          >
            -
          </S.ChangeQuantity>
          <S.ChangeQuantity onClick={handleIncreaseProductQuantity}>
            +
          </S.ChangeQuantity>
        </div>
      </S.Price>
    </S.Container>
  );
};

export default CartProduct;
