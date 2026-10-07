import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const { formState, handleInputChange } = useForm({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("datos de registro:", formState);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          crear cuenta
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
          >
            registrarse
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Inicia sesion aca
          </Link>
        </p>
      </div>
    </div>
  );
};
