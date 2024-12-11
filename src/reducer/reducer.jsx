const initialState = {
  products: [],
  categories: [],
  currentUser: null,
  layout: "grid",
  search: "",
  filterByCate: "all",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT":
      const updateProduct = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      return {
        ...state,
        products: updateProduct,
      };
    case "DELETE_PRODUCT":
      const deleteProduct = state.products.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        products: deleteProduct,
      };
    case "FILTER_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "FILTER_CATE":
      return {
        ...state,
        filterByCate: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload,
      };
  }
};

export default reducer;

export { initialState };
