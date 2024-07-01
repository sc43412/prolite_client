"use client";

import { useState } from "react";
import { AuthTemplate } from "../_components/auth-template";
import { ForgotPasswordForm } from "../_components/forgot-password-form";
import { InputOTPForm } from "../_components/otp-form";

const ForgotPasswordPage = () => {
  const [otpMode, setOtpMode] = useState(false);

  return (
    <>
      {otpMode ? (
        <AuthTemplate
          title="Enter OTP"
          description="OTP has been sent to your registered email ID"
        >
          <InputOTPForm />
        </AuthTemplate>
      ) : (
        <AuthTemplate
          title="Forgot Password?"
          description="Get OTP on your registered email ID"
        >
          <ForgotPasswordForm setOtpMode={setOtpMode} />
        </AuthTemplate>
      )}
    </>
  );
};

export default ForgotPasswordPage;
