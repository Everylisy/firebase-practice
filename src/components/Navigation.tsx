import { Link } from "react-router-dom";
import type { IUserObj } from "types";

const Navigation = ({ userObj }: IUserObj) => {
  const userName = userObj.displayName
    ? `${userObj.displayName}`
    : `${userObj.email.split("@")[0]}`;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/profile">{userName}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
