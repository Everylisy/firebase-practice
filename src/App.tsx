import { useState } from "react";
import AppRouter from "./components/AppRouter";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <AppRouter isLoggedIn={isLoggedIn} />;
};

export default App;
