import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { authService, dbService } from "fbInstance";
import type { routerProps } from "types";

const notesRef = collection(dbService, "notes");

const Profile = ({ userObj, refreshUser }: routerProps) => {
  const userName = userObj.displayName
    ? `${userObj.displayName}`
    : `${userObj.email.split("@")[0]}`;
  const [newNickName, setNewNickName] = useState(userName);

  const logoutClickHandler = () => authService.signOut();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNickName !== userName) {
      await updateProfile(authService.currentUser, {
        displayName: newNickName,
      });
      refreshUser();
    }
  };

  // const getMyNotes = async () => {
  //   const getNotesQuery = query(
  //     notesRef,
  //     where("creatorId", "==", userObj.uid),
  //     orderBy("createdAt", "desc"),
  //   );
  //   const querySnapshot = await getDocs(getNotesQuery);
  // };

  // useEffect(() => {
  //   getMyNotes();
  // }, []);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="닉네임"
          required
          minLength={4}
          onChange={(e) => setNewNickName(e.currentTarget.value)}
          value={newNickName}
        />
        <button type="submit">프로필 업데이트</button>
      </form>
      <button onClick={logoutClickHandler}>로그아웃</button>
    </>
  );
};

export default Profile;
