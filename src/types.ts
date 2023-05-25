import type { User } from "firebase/auth";

export interface routerProps extends IUserObj {
  isLoggedIn?: boolean;
  refreshUser: () => void;
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
  imgFileURL: string;
}

export interface IUserObj {
  userObj: User | null;
}
