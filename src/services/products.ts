import axios from 'axios';
import { IGetProductsResponse } from 'models';


export const getProducts = async () => {
  let response: IGetProductsResponse;
  response = await axios.get(
    'http://47.237.104.19:3323/products',
    {
      withCredentials: false,
    }
  );

  const { products } = response.data || [];

  return products;
};
