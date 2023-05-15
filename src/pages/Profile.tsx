import { authService } from "fbInstance";

const Profile = () => {
  const logoutClickHandler = () => authService.signOut();

  return <button onClick={logoutClickHandler}>로그아웃</button>;
};

export default Profile;
