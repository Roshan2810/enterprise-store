import C from "../constant";

const initialState = {
  count: 0,
  productIds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_TO_CART:
      const productIds = [...state.productIds, action.payload];
      return {
        count: state.count + 1,
        productIds,
      };
    case C.CLEAR_CART:
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
