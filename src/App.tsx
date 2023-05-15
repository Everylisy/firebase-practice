import { useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbInstance";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return <AppRouter isLoggedIn={isLoggedIn} />;
};

export default App;
