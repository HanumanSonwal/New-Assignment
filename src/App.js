import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth-section/Login";
import SignUp from "./Auth-section/SignUp";
import VerifyOTP from "./Auth-section/VerifyOtp";
import AuthFlow from "./Auth-section/AuthFlow";
import ForgotPassword from "./Auth-section/ForgotPassword";
import ResetPassword from "./Auth-section/ResetPassword";

// import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<AuthFlow />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
