import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth-section/Login";
import SignUp from "./Auth-section/SignUp";
import VerifyOTP from "./Auth-section/VerifyOtp";
import AuthFlow from "./Auth-section/AuthFlow";
import ForgotPassword from "./Auth-section/ForgotPassword";
import ResetPassword from "./Auth-section/ResetPassword";
import Portel from "./Dashboard/Portel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<AuthFlow />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/portal/*" element={<Portel />} />
      </Routes>
    </Router>
  );
}

export default App;

// // App.js
// import React from "react";
// import "./App.css";
// import Sidebar from "./Dashboard/Sidebar";
// import Navbar from "./Dashboard/Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Auth-section/Login";
// import SignUp from "./Auth-section/SignUp";
// // import VerifyOTP from "./Auth-section/VerifyOTP";
// import ForgotPassword from "./Auth-section/ForgotPassword";
// import ResetPassword from "./Auth-section/ResetPassword";
// import AuthFlow from "./Auth-section/AuthFlow";

// const App = () => {
//   return (
//     <div>
//       {/* <Navbar /> */}
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-2">
//             <Sidebar />
//           </div>
//           <div className="col-md-10">
//             <Router>
//               <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/signup" element={<AuthFlow />} />
//                 {/* <Route path="/verify-otp" element={<VerifyOTP />} /> */}
//                 <Route path="/forgot-password" element={<ForgotPassword />} />
//                 <Route path="/reset-password" element={<ResetPassword />} />
//               </Routes>
//             </Router>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
