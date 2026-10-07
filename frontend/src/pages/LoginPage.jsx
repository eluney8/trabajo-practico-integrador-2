import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("datos de login:", formState);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          iniciar sesion
        </h2>
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
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
          >
            ingresar
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