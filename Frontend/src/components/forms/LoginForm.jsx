import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access_token");
    const role = Cookies.get("rol"); // Leer el rol desde la cookie

    if (token) {
      // Verifica tanto el token como el rol y redirige según corresponda
      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4322/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // Asegura que las cookies se envíen con la solicitud
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Faltan credenciales");
      }

      const data = await response.json();
      console.log("Login exitoso:", data);

      // Los cookies ya están configurados por el backend, simplemente redirige basado en el rol
      const role = Cookies.get("rol");

      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded shadow-lg border border-purple-900">
      <h2 className="text-2xl font-semibold mb-4 text-purple-900">
        Iniciar Sesión
      </h2>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full">
        <label htmlFor="email" className="block mb-2">
          Correo electrónico:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
          value={formData.email}
          onChange={handleChange}
          autoComplete="username"
        />

        <label htmlFor="password" className="block mt-4 mb-2">
          Contraseña:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="bg-purple-700 text-white font-semibold py-2 px-4 rounded mt-4 w-full"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
