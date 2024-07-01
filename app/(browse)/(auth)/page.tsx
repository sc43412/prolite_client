import { LoginForm } from "./_components/login-form";
import { AuthTemplate } from "./_components/auth-template";

const LoginPage = () => {
  return (
    <AuthTemplate
      title="Welcome to Prolite"
      description="Sign in to enter your Nucleo Systems"
    >
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
