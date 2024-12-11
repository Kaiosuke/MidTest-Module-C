import React, { forwardRef } from "react";
import useAppContext from "../hooks/useAppContext";

const FormDelete = forwardRef(() => {
  const { refDelete, handleDeleteProduct } = useAppContext();

  return (
    <dialog ref={refDelete} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete</h3>
        <p className="py-4">Bạn chắn chắn muốn xóa sản phẩm này</p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-error btn-sm"
              onClick={handleDeleteProduct}
            >
              Delete
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default FormDelete;
