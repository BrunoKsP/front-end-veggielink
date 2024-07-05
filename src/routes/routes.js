import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Users/Login";
import SigIn from "../pages/Users/SigIn";
import Home from "../pages";
import RoutesProducts from "./product";


const Routess = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/sigin/" element={<SigIn />} />
        <Route path= "/products/*" element={<RoutesProducts />} />
      </Routes>
    </Router>
  );
};
export default Routess;
