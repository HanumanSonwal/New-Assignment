import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const Navigate = useNavigate();
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://react-node-module.onrender.com/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        console.error("Change password failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className=" text-center  demo-btn">Change Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="oldPassword">oldPassword</label>
                  <input
                    type="Password"
                    id="oldPassword"
                    className="form-control"
                    value={oldPassword}
                    onChange={(e) => setoldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                    required
                  />
                  <div className="d-flex  justify-content-end mt-2">
                    <Link className="demo-btn" to="/forgot-password">
                      Forgot password
                    </Link>
                  </div>
                </div>
                <button type="submit" className="btn  btn-custom ">
                  Login
                </button>
                <p className="mt-3 ">
                  If you don't have an account, please{" "}
                  <Link className="demo-btn" to="/signup">
                    Change Password
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;