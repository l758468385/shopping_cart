export interface IBaseProduct {
  id: number;
  sku: number;
  title: string;
  description: string;
  availableSizes: string[];
  style: string;
  price: number;
  installments: number;
  currencyId: string;
  currencyFormat: string;
  isFreeShipping: boolean;
  coverImage:string
}

export interface IProduct extends IBaseProduct {}

export interface ICartProduct extends IBaseProduct {
  quantity: number;
  selectedSize?: string;
}

export interface ICartTotal {
  productQuantity: number;
  installments: number;
  totalPrice: number;
  currencyId: string;
  currencyFormat: string;
}

export interface IGetProductsResponse {
  data: {
    products: IProduct[];
  };
}
