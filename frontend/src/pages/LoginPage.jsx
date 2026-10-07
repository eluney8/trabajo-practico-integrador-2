import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Credenciales incorrectas");
      }
      localStorage.setItem("isLogged", "true");
      navigate("/home");
    } catch (err) {
      setErrorMessage(err.message || "Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          iniciar sesion
        </h2>
        {errorMessage && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              usuario / email
            </label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="ingresa tu usuario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
         <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-300"
          >
            {loading ? "ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            registrate aca
          </Link>
        </p>
      </div>
    </div>
  );
};