import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navigation from "components/Navigation";
import Auth from "pages/Auth";
import Home from "pages/Home";
import Profile from "pages/Profile";
import type { routerProps } from "types";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }: routerProps) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home userObj={userObj} /> : <Auth />}
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile userObj={userObj} refreshUser={refreshUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
