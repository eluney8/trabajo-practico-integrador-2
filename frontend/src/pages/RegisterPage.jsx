import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
if (!response.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        const mensajes = data.errors
          .map((err) =>
            typeof err === "string"
              ? err
              : err.msg || err.message
          )
          .join(" | ");
        throw new Error(mensajes);
      }
      throw new Error(data.message || "Error al registrar el usuario");
    }
      handleReset();
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.message || "error de registro");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          crear cuenta
        </h2>
        {errorMessage && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="first_name"
                value={formState.first_name}
                onChange={handleInputChange}
                required
                className="mt-1 w-full p-2 border rounded-md"
                placeholder="Nombre"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                type="text"
                name= "last_name"
                value={formState.last_name}
                onChange={handleInputChange}
                required
                className="mt-1 w-full p-2 border rounded-md"
                placeholder="Apellido"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              usuario
            </label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="tu nombre de usuario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              email
            </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="correo@ejemplo.com"
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
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-300 mt-2"
          >
            {loading ? "registrando..." : "registrarse"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          ¿ya tenes cuenta?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Inicia sesion aca
          </Link>
        </p>
      </div>
    </div>
  );
};
