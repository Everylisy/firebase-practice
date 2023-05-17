import type { User } from "firebase/auth";

export interface routerProps extends IUserObj {
  isLoggedIn: boolean;
}

export interface noteItemProps {
  data: INoteData;
  isOwner: boolean;
}

export interface INoteData {
  text: string;
  createdAt: number;
  id: string;
  creatorId: string;
}

export interface IUserObj {
  userObj: User | null;
}
