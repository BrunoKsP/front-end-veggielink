// Products.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import InfoProduct from "../pages/Products/Info";
import Products from "../pages/Products";
import TimeLineProduct from "../pages/Products/TimeLine";
import CreateProduct from "../pages/Products/Create";
import EditProduct from "../pages/Products/Edit";
import ListAllProducts from "../pages/Products/ListAll";

const RoutesProducts = () => {
  return (
    <Routes>
      <Route path="/*" element={<Products />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/info-product/:id" element={<InfoProduct />} />
      <Route path="/timeline-product/:id" element={<TimeLineProduct />} />
      <Route path="/:id" element={<ListAllProducts />} />
    </Routes>
  );
};

export default RoutesProducts;
