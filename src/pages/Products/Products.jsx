import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDelete from "../../components/FormDelete";
import FormProduct from "../../components/FormProduct";
import useAppContext from "../../hooks/useAppContext";
import { filterByCategory, filterBySearch } from "../../reducer/actions";
import ProductItems from "./ProductItems";

const Products = () => {
  const { state, handleOpenForm, dispatch } = useAppContext();
  const [searchInput, setSearchInput] = useState("");
  const [layout, setLayout] = useState("table");
  const { products, currentUser, search, categories, filterByCate } = state;

  const handleSearch = (value) => {
    dispatch(filterBySearch(value));
    setSearchInput(value);
  };

  const handleFilterCate = (value) => {
    dispatch(filterByCategory(value));
  };

  const handleRender = (products) => {
    if (products.length) {
      const newProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) &&
          (filterByCate === "all"
            ? true
            : product.categoryId === Number(filterByCate))
      );
      return newProducts;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Products</h1>

      <div className="flex items-center justify-between mt-10 gap-4">
        <button
          className="btn btn-active btn-secondary"
          onClick={() => handleOpenForm(null)}
        >
          AddProduct
        </button>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setLayout(e.target.value)}
        >
          <option disabled>Layout</option>
          <option value="table">Table</option>
          <option value="grid">Grid</option>
        </select>
        <input
          type="text"
          placeholder="search"
          className="input input-bordered w-full max-w-xs"
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => handleFilterCate(e.target.value)}
          defaultValue="all"
        >
          <option value="all">All</option>
          {categories &&
            categories.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        {layout === "grid" ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {handleRender(products)?.length ? (
              handleRender(products)?.map((product) => (
                <ProductItems
                  key={product.id}
                  product={product}
                  layout={layout}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>Products is Empty!</td>
              </tr>
            )}
          </div>
        ) : (
          <table className="table mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>CATE_ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {handleRender(products)?.length ? (
                handleRender(products)?.map((product) => (
                  <ProductItems
                    key={product.id}
                    product={product}
                    layout={layout}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Products is Empty!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <FormProduct />
      <FormDelete />
    </div>
  );
};

export default Products;
