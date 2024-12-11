import React, { forwardRef, useEffect } from "react";
import useAppContext from "../hooks/useAppContext";
import { getData } from "../axios/requestApi";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schema";

const FormProduct = forwardRef(() => {
  const { state, handleAddProduct, handleUpdateProduct } = useAppContext();

  const { productId, refForm } = useAppContext();

  const { categories } = state;

  const methods = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      categoryId: "",
    },
  });

  useEffect(() => {
    if (productId) {
      (async () => {
        const res = await getData(productId);
        if (res.status) {
          methods.reset(res.data);
        }
      })();
    } else {
      methods.reset({
        title: "",
        description: "",
        price: 0,
        categoryId: "",
      });
    }
  }, [productId]);

  const handleGetData = (data) => {
    if (productId) {
      handleUpdateProduct(data);
      methods.reset({
        title: "",
        description: "",
        price: 0,
        categoryId: "",
      });
    } else {
      handleAddProduct(data);
      methods.reset({
        title: "",
        description: "",
        price: 0,
        categoryId: "",
      });
    }
    handleClose();
  };

  const handleClose = () => {
    refForm.current.close();
  };

  return (
    <dialog ref={refForm} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{productId ? "Update" : "Add"}</h3>
        <p className="py-4"></p>
        <div className="modal-action">
          <FormProvider {...methods}>
            <form
              method="dialog"
              className="w-full"
              onSubmit={methods.handleSubmit((data) => {
                handleGetData(data);
              })}
            >
              <div className="form-input">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="title"
                    {...methods.register("title")}
                  />
                </label>
                <span className="text-red-500">
                  {methods.formState.errors?.title?.message}
                </span>
              </div>
              <div className="form-input mt-4">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="description"
                    {...methods.register("description")}
                  />
                </label>
                <span className="text-red-500">
                  {methods.formState.errors?.description?.message}
                </span>
              </div>
              <div className="form-input mt-4">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    className="grow"
                    placeholder="price"
                    {...methods.register("price", { valueAsNumber: true })}
                  />
                </label>
                <span className="text-red-500">
                  {methods.formState.errors?.price?.message}
                </span>
              </div>
              <div className="form-input mt-4">
                <select
                  className="select select-bordered w-full"
                  {...methods.register("categoryId", { valueAsNumber: true })}
                >
                  <option defaultChecked>Select Category</option>
                  {categories.map((cate) => (
                    <option key={cate.id} value={cate.id}>
                      {cate.name}
                    </option>
                  ))}
                </select>
                <span className="text-red-500">
                  {methods.formState.errors?.categoryId?.message}
                </span>
              </div>
              <div className="mt-4 text-center">
                <button className="btn btn-success mr-4">
                  {productId ? "Update" : "Add"}
                </button>
                <button className="btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </dialog>
  );
});

export default FormProduct;
