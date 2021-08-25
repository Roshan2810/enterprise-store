import C from "../constant";

const action = (productId) => {
  return {
    type: C.ADD_TO_CART,
    payload: productId,
  };
};

export default action;
