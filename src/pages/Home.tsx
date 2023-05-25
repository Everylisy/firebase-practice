import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import NoteForm from "components/NoteForm";
import NoteItem from "components/NoteItem";
import { dbService } from "fbInstance";
import type { INoteData, IUserObj } from "types";

const Home = ({ userObj }: IUserObj) => {
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

  return (
    <div>
      <NoteForm userObj={userObj} />
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
