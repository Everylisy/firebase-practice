import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbInstance";

const App = () => {
  const [fbInit, setFbInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setFbInit(true);
    });
  }, []);

  return <>{fbInit ? <AppRouter isLoggedIn={isLoggedIn} /> : "초기화 중..."}</>;
};

export default App;
