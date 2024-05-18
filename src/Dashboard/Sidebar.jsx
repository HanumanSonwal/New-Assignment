import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

function Sidebar() {
  const Navigate = useNavigate();
  const logout = async (navigate) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "https://react-node-module.onrender.com/user/logout",
        {},
        config
      );
      console.log(response, "response");

      if (response.data.status === true) {
        localStorage.removeItem("token");

        Navigate("/");
      } else {
        console.error("Logout unsuccessful", response.data.message);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/" className="flex-column">
        <NavLink
          to="/portal/home"
          className="sidebar-link"
          activeClassName="active"
        >
          <span className="sidebar-link-icon">
            <i class="fa-solid fa-user"></i>
          </span>
          <span className="sidebar-link-text">My Profile</span>
        </NavLink>
        <NavLink
          to="/portal/venders-list"
          className="sidebar-link"
          activeClassName="active"
        >
          <span className="sidebar-link-icon">
            <i className="fas fa-home"></i>
          </span>
          <span className="sidebar-link-text">All Vendors</span>
        </NavLink>
        <NavLink
          to="/portal/my-cart"
          className="sidebar-link"
          activeClassName="active"
        >
          <span className="sidebar-link-icon">
            <i class="fa-solid fa-cart-shopping"></i>
          </span>
          <span className="sidebar-link-text">My Cart</span>
        </NavLink>
        <NavLink
          to="/portal/change-password"
          className="sidebar-link"
          activeClassName="active"
        >
          <span className="sidebar-link-icon">
            <i class="fa-solid fa-key"></i>
          </span>
          <span className="sidebar-link-text">Change Password</span>
        </NavLink>
        <Nav
          style={{ cursor: "pointer" }}
          to="#"
          onClick={logout}
          className="sidebar-link ms-2 "
          activeClassName="active"
        >
          <span className="sidebar-link-icon">
            <i className="fas fa-sign-out-alt"></i>
          </span>
          <span className="sidebar-link-text">Logout</span>
        </Nav>
      </Nav>
    </div>
  );
}

export default Sidebar;
