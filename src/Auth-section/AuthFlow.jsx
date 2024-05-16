import React, { useState } from "react";
import SignUp from "./SignUp";
import VerifyOTP from "./VerifyOtp";

const AuthFlow = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  console.log(signupEmail, "sds");

  const handleSignUp = (email) => {
    setSignupEmail(email);
    setShowOTPVerification(true);
  };

  return (
    <div>
      {!showOTPVerification ? (
        <SignUp onSignUp={handleSignUp} />
      ) : (
        <VerifyOTP signupEmail={signupEmail} />
      )}
    </div>
  );
};

export default AuthFlow;
