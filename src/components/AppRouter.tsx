import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "pages/Auth";
import Home from "pages/Home";
import type { routerProps } from "types";

const AppRouter = ({ isLoggedIn }: routerProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
