import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-400">Blog personal</h1>
      <div className="flex gap-4">
        <Link to="/home" className="hover:text-indigo-300 transition-colors">
          Inicio
        </Link>
        <Link to="/login" className="hover:text-indigo-300 transition-colors">
          Iniciar sesion
        </Link>
        <Link to="/register" className="hover:text-indigo-300 transition-colors">
          Registrarse
        </Link>
      </div>
    </nav>
  );
};