import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Login" element={<Login />} />

    </Routes>
  );
};

export default AppRoutes;
