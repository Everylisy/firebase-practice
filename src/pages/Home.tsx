import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "fbInstance";
import type { INoteData } from "types";

const Home = () => {
  const [note, setNote] = useState("");
  const [noteData, setNoteData] = useState<INoteData[]>([]);

  const getNoteData = async () => {
    try {
      const getNotesQuery = query(
        collection(dbService, "notes"),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(getNotesQuery);
      querySnapshot.forEach((doc) => {
        const newNoteData = {
          ...doc.data(),
          id: doc.id,
        } as INoteData;
        setNoteData((prev) => [newNoteData, ...prev]);
      });
    } catch (error: any) {
      console.error(
        "Error getting document:",
        error instanceof Error ? error.message : error,
      );
    }
  };

  useEffect(() => {
    getNoteData();
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "notes"), {
        text: note,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
      setNote("");
    } catch (error: any) {
      console.error(
        "Error adding document:",
        error instanceof Error ? error.message : error,
      );
    }
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
        <button type="submit">작성</button>
      </form>

      <div>
        {noteData.map((text) => (
          <div key={text.id}>
            <h4>{text.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
