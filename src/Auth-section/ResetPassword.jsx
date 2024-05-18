import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ResetPassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { token } = useParams();
  const Navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `https://react-node-module.onrender.com/user/forgot-password/reset/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, confirmPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        Navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        setError(errorData.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Reset Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="newPassword"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="card-title"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "27px",
                      top: "39%",
                      transform: "translateY(-50%)",
                      zIndex: 99999,
                    }}
                  >
                    {showOldPassword ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="card-title"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "27px",
                      top: "69%",
                      transform: "translateY(-50%)",
                      zIndex: 99999,
                    }}
                  >
                    {showNewPassword ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                <button type="submit" className="btn btn-custom">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
