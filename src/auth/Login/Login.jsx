import React from "react";
import { login } from "../../axios/requestApi";
import { loginUser } from "../../reducer/actions";
import { loginSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";

const Login = () => {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { dispatch } = useAppContext();

  const nav = useNavigate();

  const handleRegister = async (data) => {
    (async () => {
      const res = await login(data);
      if (res.status) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(loginUser(res.data));
        if (res.data.user.isAdmin) {
          nav("/products");
        } else {
          nav("/");
        }
        dispatch(loginUser(res.data.user));
      } else {
        alert(res.message);
      }
    })();
  };

  return (
    <div className="max-w-[600px] m-auto pt-20">
      <FormProvider {...methods}>
        <form
          className="p-10 border border-white rounded-lg"
          onSubmit={methods.handleSubmit((data) => {
            handleRegister(data);
          })}
        >
          <div className="form-input mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...methods.register("email")}
              />
            </label>
            <span className="text-red-500">
              {methods.formState.errors?.email?.message}
            </span>
          </div>

          <div className="form-input mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                {...methods.register("password")}
              />
            </label>
            <span className="text-red-500">
              {methods.formState.errors?.password?.message}
            </span>
          </div>

          <button className="btn btn-active btn-primary w-full mt-4">
            Login
          </button>
          <NavLink to="/users/register" className="link link-primary">
            Register
          </NavLink>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
