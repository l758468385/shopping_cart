// src/reducers/cartReducer.ts
const initialState = {
  items: [],
  totalAmount: 0,
  isOpen: false,
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
        totalAmount: state.totalAmount + action.payload.price,
      };
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
