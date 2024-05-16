import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const VerifyOTP = ({ signupEmail }) => {
  const Navigate = useNavigate();
  console.log(Navigate, "aditya");
  console.log(signupEmail, "sss");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://react-node-module.onrender.com/user/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: signupEmail, otp }),
        }
      );

      // Handle the response from the API
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Navigate("/");
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "OTP verification failed";
        console.error(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Verify OTP</h2>
              <form onSubmit={handleSubmit} className="verify-otp-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={signupEmail}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="otp" className="form-label">
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
