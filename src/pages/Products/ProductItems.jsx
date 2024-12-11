import React from "react";
import useAppContext from "../../hooks/useAppContext";

const ProductItems = ({ product, layout }) => {
  const { id, title, description, price, categoryId } = product;
  const { handleOpenForm, handleOpenDelete } = useAppContext();

  return (
    <>
      {layout === "grid" ? (
        <div className="flex border border-black-400 p-4">
          <div>{title}</div>
          <div>{description}</div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleOpenForm(id)}
          >
            Update
          </button>
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleOpenDelete(id)}
          >
            Delete
          </button>
        </div>
      ) : (
        <tr>
          <th>{id}</th>
          <td>{title}</td>
          <td>{description}</td>
          <td>{price}</td>
          <td>{categoryId}</td>
          <td>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleOpenForm(id)}
            >
              Update
            </button>
            <button
              className="btn btn-error btn-sm"
              onClick={() => handleOpenDelete(id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default ProductItems;
