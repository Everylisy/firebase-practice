import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { dbService, storageService } from "fbInstance";
import type { noteItemProps } from "types";

const NoteItem = ({ data, isOwner }: noteItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newNote, setNewNote] = useState(data.text);
  const noteTextRef = doc(dbService, "notes", `${data.id}`);
  const noteImgRef = ref(storageService, data.imgFileURL);

  const deleteClickHandler = async () => {
    const ok = window.confirm("정말 글을 삭제하시겠습니까?");
    try {
      if (ok) {
        await deleteDoc(noteTextRef);
        if (data.imgFileURL !== "") await deleteObject(noteImgRef);
      }
    } catch (error) {
      console.error(
        "Note delete Error:",
        error instanceof Error ? error.message : error,
      );
    }
  };

  const editToggleHandler = () => setEditMode((prev) => !prev);

  const editSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (data.text !== newNote)
        await updateDoc(noteTextRef, { text: newNote });
      setEditMode(false);
    } catch (error) {
      console.error(
        "Note edit Error:",
        error instanceof Error ? error.message : error,
      );
    }
  };

  return (
    <div>
      {editMode ? (
        <>
          <form onSubmit={editSubmitHandler}>
            <input
              type="text"
              placeholder="수정할 내용 입력"
              maxLength={120}
              value={newNote}
              onChange={(e) => setNewNote(e.currentTarget.value)}
              required
            />
            <button type="submit">수정하기</button>
          </form>
          <button onClick={editToggleHandler}>취소</button>
        </>
      ) : (
        <>
          <h4>{data.text}</h4>
          {data.imgFileURL && (
            <img
              src={data.imgFileURL}
              alt="Note Image"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={deleteClickHandler}>삭제</button>
              <button onClick={editToggleHandler}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NoteItem;
