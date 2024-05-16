import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResetPassword from "./ResetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    const storedResetToken = localStorage.getItem("resetToken");
    if (storedResetToken) {
      setResetToken(storedResetToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://react-node-module.onrender.com/user/forgot-password/request-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setResetToken(data.resetToken);
        localStorage.setItem("resetToken", data.resetToken);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        console.error("Forgot password request failed");
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
              <h1 className="card-title text-center">Forgot Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success">
                  Send
                </button>
                <p className="mt-3">
                  If you don't have an account, please{" "}
                  <Link to="/signup">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
