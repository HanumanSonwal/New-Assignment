import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import EditProfile from "./EditProfile";
import VendorsList from "./VendorsList";
import ShowItems from "./ShowItems";
import Profile from "./Profile";
import MyCart from "./MyCart";
import ChangePassword from "./ChangePassword";

const Portel = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/home" element={<Profile />} />
              <Route path="/venders-list" element={<VendorsList />} />
              <Route path="/venders-product/:id" element={<ShowItems />} />
              <Route path="/my-cart" element={<MyCart />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portel;
