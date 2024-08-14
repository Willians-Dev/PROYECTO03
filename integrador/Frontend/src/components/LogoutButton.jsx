import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;