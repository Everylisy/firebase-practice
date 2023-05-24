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
  const [imgString, setImgString] = useState(null);
  const fileInput = useRef<HTMLInputElement>(null);

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
    const imgFile = files[0];

    const reader = new FileReader();
    if (imgFile) reader.readAsDataURL(imgFile);
    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const { result } = finishedEvent.target;
      setImgString(result);
    };
  };

  const clearPreviewHandler = () => {
    setImgString(null);
    if (fileInput) fileInput.current.value = null;
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
        <button type="submit">작성</button>
        {imgString && (
          <div>
            <img src={imgString} alt="preview" width="50px" height="50px" />
            <button onClick={clearPreviewHandler}>Clear</button>
          </div>
        )}
      </form>

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
