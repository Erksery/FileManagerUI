import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Folder from "../Pages/Folder/Folder";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/folder/:id" element={<Folder />} />
      <Route path="/adminPanel" element={<AdminPanel />} />
    </Routes>
  );
}

export default Routers;
