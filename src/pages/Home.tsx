import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import NoteItem from "components/NoteItem";
import { dbService } from "fbInstance";
import type { INoteData, IUserObj } from "types";

const Home = ({ userObj }: IUserObj) => {
  const [note, setNote] = useState("");
  const [noteData, setNoteData] = useState<INoteData[]>([]);
  const [attatchment, setAttatchment] = useState();
  const fileInput = useRef();

  useEffect(() => {
    const getNotesQuery = query(
      collection(dbService, "notes"),
      orderBy("createdAt", "desc"),
    );
    onSnapshot(getNotesQuery, (snapshot) => {
      const newNoteData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as INoteData[];
      setNoteData(newNoteData);
    });
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(dbService, "notes"), {
        text: note,
        createdAt: Date.now(),
        creatorId: userObj?.uid,
      });
      setNote("");
    } catch (error: any) {
      console.error(
        "Error adding document:",
        error instanceof Error ? error.message : error,
      );
    }
  };

  const fileChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files) return;

    const imgFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const { result } = e.currentTarget;
      setAttatchment(result);
    };
    reader.readAsDataURL(imgFile);
  };

  const onClearAttachment = () => {
    setAttatchment(null);
    fileInput.current.value = null;
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="💬 새로운 메모 작성하기"
          maxLength={120}
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={fileChangeHandler}
          ref={fileInput}
        />
        <img src={attatchment} alt="preview" width="50px" height="50px" />
        <button type="submit">작성</button>
      </form>
      <button onClick={onClearAttachment}>Clear</button>

      <div>
        {noteData.map((data) => (
          <NoteItem
            key={data.id}
            data={data}
            isOwner={data.creatorId === userObj?.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
