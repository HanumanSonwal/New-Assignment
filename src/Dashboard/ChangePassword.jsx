import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
        navigate("/");
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center demo-btn">Change Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password</label>
                  <div className="input-group">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      id="oldPassword"
                      className="form-control"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                    <span
                      className="card-title"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 99999,
                      }}
                    >
                      {showOldPassword ? <BsEyeSlash /> : <BsEye />}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <div className="input-group">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <span
                      className="card-title"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 99999,
                      }}
                    >
                      {showNewPassword ? <BsEyeSlash /> : <BsEye />}
                    </span>
                  </div>
                </div>
                <button type="submit" className="btn btn-custom">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
