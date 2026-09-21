import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Faq from "../pages/Faq";
import AboutUs from "../pages/AboutUs";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verify from "../pages/Verify";
import Product from "../pages/Product";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Verify" element={<Verify />} />
      <Route path="/Product" element={<Product />} />
    </Routes>
  );
};

export default AppRoutes;