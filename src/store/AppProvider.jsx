import React, { useEffect, useReducer, useRef, useState } from "react";
import reducer, { initialState } from "../reducer/reducer";
import AppContext from "../context/AppContext";
import {
  addData,
  deleteData,
  getAllCate,
  getAllData,
  updateData,
} from "../axios/requestApi";
import {
  setAllCategory,
  setAllProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  loginUser,
} from "../reducer/actions";

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [productId, setProductId] = useState(null);

  const refForm = useRef();
  const refDelete = useRef();

  useEffect(() => {
    (async () => {
      const res = await getAllData();
      if (res.status) {
        dispatch(setAllProduct(res.data));
      } else {
        alert(res.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem("user", null));
      dispatch(loginUser(user));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const res = await getAllCate();
      if (res.status) {
        dispatch(setAllCategory(res.data));
      } else {
        alert(res.message);
      }
    })();
  }, []);

  const handleOpenForm = (id = null) => {
    if (id) {
      setProductId(id);
    }
    refForm.current.showModal();
  };

  const handleOpenDelete = (id) => {
    refDelete.current.showModal();
    setProductId(id);
  };

  const handleAddProduct = async (data) => {
    (async () => {
      const res = await addData(data);
      if (res.status) {
        dispatch(addProduct(res.data));
      } else {
        alert(res.message);
      }
    })();
  };

  const handleUpdateProduct = async (data) => {
    (async () => {
      const res = await updateData(productId, data);
      if (res.status) {
        dispatch(updateProduct(res.data));
      } else {
        alert(res.message);
      }
    })();
    setProductId(null);
  };

  const handleDeleteProduct = async (data) => {
    (async () => {
      const res = await deleteData(productId);
      if (res.status) {
        dispatch(deleteProduct(productId));
      } else {
        alert(res.message);
      }
    })();
    setProductId(null);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        refForm,
        refDelete,
        productId,
        handleOpenForm,
        handleOpenDelete,
        handleAddProduct,
        handleUpdateProduct,
        handleDeleteProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
