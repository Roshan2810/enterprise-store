import C from "../constant";

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_TO_CART:
      return {
        count: state.count + 1,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
