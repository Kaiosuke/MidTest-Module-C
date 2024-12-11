import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutPages from "./pages/LayoutPages";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import LayoutAuth from "./auth/LayoutAuth";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPages />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Route>
      <Route path="/users" element={<LayoutAuth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
