import { AuthTemplate } from "../_components/auth-template";
import { ForgotPasswordForm } from "../_components/forgot-password-form";
import { ResetPasswordForm } from "../_components/reset-password-form";

const ForgotPasswordPage = () => {
  return (
    <AuthTemplate
      title="Reset Password"
      description="Please enter and confirm your new password"
    >
      <ResetPasswordForm />
    </AuthTemplate>
  );
};

export default ForgotPasswordPage;
