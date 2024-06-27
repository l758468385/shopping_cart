// src/reducers/cartReducer.js
const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state = initialState, action: { type: any; payload: { price: number; id: any; quantity: any; }; }) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
        totalAmount: state.totalAmount + action.payload.price,
      };
    case 'REMOVE_FROM_CART':
      // @ts-ignore
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - action.payload.price,
      };
    case 'UPDATE_CART_ITEM_QUANTITY':
      const items = state.items.map(item => {
        // @ts-ignore
        if (item.id === action.payload.id) {
          // @ts-ignore
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return {
        ...state,
        items,
      };
    default:
      return state;
  }
};
export const addToCart = (product: any) => ({
  type: 'ADD_TO_CART',
  payload: product,
});


export const openCart = () => ({
  type: 'OPEN_CART',
});

export const closeCart = () => ({
  type: 'CLOSE_CART',
});

export default cartReducer;
