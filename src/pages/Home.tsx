import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "fbInstance";
import type { INoteData, IUserObj } from "types";

const Home = ({ userObj }: IUserObj) => {
  const [note, setNote] = useState("");
  const [noteData, setNoteData] = useState<INoteData[]>([]);

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
