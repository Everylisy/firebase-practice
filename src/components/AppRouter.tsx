import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import type { routerProps } from "../types";

const AppRouter = ({ isLoggedIn }: routerProps) => {
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
    </Routes>
  );
};

export default AppRouter;
