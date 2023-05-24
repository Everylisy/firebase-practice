import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NoteItem from "components/NoteItem";
import { dbService, storageService } from "fbInstance";
import type { INoteData, IUserObj } from "types";

const Home = ({ userObj }: IUserObj) => {
  const [note, setNote] = useState("");
  const [noteData, setNoteData] = useState<INoteData[]>([]);
  const [imgString, setImgString] = useState("");
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

    let imgFileURL = "";
    if (imgString !== "") {
      const imgFileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(imgFileRef, imgString, "data_url");
      imgFileURL = await getDownloadURL(response.ref);
    }

    try {
      await addDoc(collection(dbService, "notes"), {
        text: note,
        createdAt: Date.now(),
        creatorId: userObj?.uid,
        imgFileURL,
      });
      setNote("");
      setImgString("");
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
      setImgString(result as string);
    };
  };

  const clearPreviewHandler = () => {
    setImgString("");
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
