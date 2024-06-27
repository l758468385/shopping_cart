const initialState = {
  products: [],
  loading: false,
  filteredProducts: [],
  filters: [],
};

const productsReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default productsReducer;
