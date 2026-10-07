import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      localStorage.removeItem("isLogged");
      navigate("/login");
    }
  };
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-400">Blog personal</h1>
      <div className="flex gap-4">
        <Link to="/home" className="hover:text-indigo-300 transition-colors">
          Inicio
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          cerrar sesion
        </button>
      </div>
    </nav>
  );
};
