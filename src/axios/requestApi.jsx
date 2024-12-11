import instance from "./instances";

const login = async (data) => {
  try {
    const res = await instance.post("login", data);
    if (res.status === 200) {
      return { status: true, data: res.data };
    }
  } catch (error) {
    return { status: false, message: error.response.data };
  }
};

const register = async (data) => {
  try {
    const res = await instance.post("users/register", data);
    if (res.status === 201) {
      return { status: true, data: res.data };
    }
  } catch (error) {
    return { status: false, message: error.response.data };
  }
};

const getAllData = async () => {
  try {
    const res = await instance.get("products");
    if (res.status === 200) {
      return { status: true, data: res.data };
    }
  } catch (error) {
    return { status: false, message: error.response.data };
  }
};

const getAllCate = async () => {
  try {
    const res = await instance.get("categories");
    if (res.status === 200) {
      return { status: true, data: res.data };
    }
  } catch (error) {
    return { status: false, message: error.response.data };
  }
};

const getData = async (id) => {
  try {
    const res = await instance.get(`products/${id}`);
    if (res.status === 200) {
      return { status: true, data: res.data };
    }
  } catch (error) {
    return { status: false, message: error.response.data };
  }
};

const addData = async (data) => {
  try {
    const res = await instance.post(`products`, data);
    if (res.status === 201) {
      return { status: true, data: res.data };
    }
  } catch (error) {
    return { status: false, message: error.response.data };
  }
};

const updateData = async (id, data) => {
  try {
    const res = await instance.patch(`products/${id}`, data);

    if (res.status === 200) {
      return { status: true, data: res.data };
    }
  } catch (error) {
    return { status: false, message: error.response.data };
  }
};

const deleteData = async (id) => {
  try {
    const res = await instance.delete(`products/${id}`);
    if (res.status === 200) {
      return { status: true, data: res.data };
    }
  } catch (error) {
    return { status: false, message: error.response.data };
  }
};

export {
  login,
  register,
  getAllData,
  getAllCate,
  getData,
  addData,
  updateData,
  deleteData,
};
