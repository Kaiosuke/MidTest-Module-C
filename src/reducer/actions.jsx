const setAllProduct = (payload) => {
  return {
    type: "SET_PRODUCT",
    payload,
  };
};

const setAllCategory = (payload) => {
  return {
    type: "SET_CATEGORIES",
    payload,
  };
};

const addProduct = (payload) => {
  return {
    type: "ADD_PRODUCT",
    payload,
  };
};

const updateProduct = (payload) => {
  return {
    type: "UPDATE_PRODUCT",
    payload,
  };
};

const deleteProduct = (payload) => {
  return {
    type: "DELETE_PRODUCT",
    payload,
  };
};

const loginUser = (payload) => {
  return {
    type: "LOGIN",
    payload,
  };
};

const filterBySearch = (payload) => {
  return {
    type: "FILTER_SEARCH",
    payload,
  };
};

const filterByCategory = (payload) => {
  return {
    type: "FILTER_CATE",
    payload,
  };
};

export {
  setAllProduct,
  setAllCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  loginUser,
  filterBySearch,
  filterByCategory,
};
