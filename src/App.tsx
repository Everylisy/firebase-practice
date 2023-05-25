import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbInstance";

const App = () => {
  const [fbInit, setFbInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setIsLoggedIn(false);
      }
      setFbInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: updateProfile(user, { displayName: user.displayName }),
    });
  };

  return (
    <>
      {fbInit ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "초기화 중..."
      )}
    </>
  );
};

export default App;
