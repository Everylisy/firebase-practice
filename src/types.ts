import type { User } from "firebase/auth";

export interface routerProps {
  isLoggedIn: User | null;
}
