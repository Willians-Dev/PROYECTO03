import LoginForm from "./components/forms/LoginForm";
import Info from "./components/Info";
import AuthLayout from "./layout/AuthLayout";

const Login = () => {
  return (
    <AuthLayout title="Iniciar sesión">
      <main className="flex flex-col md:flex-row h-lvh justify-center w-full">
        <Info />
        <div className="flex bg-purple-900 w-full md:w-1/2 justify-center items-center min-h-screen p-14 relative">
          <LoginForm />
        </div>
      </main>
    </AuthLayout>
  );
};

export default Login;
