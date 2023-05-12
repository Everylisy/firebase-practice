import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <RouterProvider router={router} />;
};

export default App;
