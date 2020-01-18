import * as actions from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      const addedProduct = action.payload;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          +state.items[addedProduct.id].sum + +productPrice
        );
      } else {
        updatedOrNewItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewItem },
        totalAmount: state.totalAmount + productPrice
      };
    case actions.REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.payload];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.payload]: updatedCartItem }
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.payload];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }
    default:
      return state;
  }
};
