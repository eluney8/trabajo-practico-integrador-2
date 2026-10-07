import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { Navbar } from "../components/Navbar";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AppRouter = () => {
const isLogged = localStorage.getItem("isLogged") === "true";
  return (
    <BrowserRouter>
      {}
      {isLogged && <Navbar />}
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isLogged ? "/home" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};