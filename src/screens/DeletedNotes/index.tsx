import { FC } from "react";
import Note from "../../components/Note";
import { NoteType, useNotes } from "../../contexts/NotesContext";

const DeletedNotes: FC = () => {
  const {
    notesData: { deletedNotes },
  } = useNotes();
  return (
    <div>
      <div className="page-heading">

        <h2>Deleted notes</h2>
      </div>
      {deletedNotes.length === 0 ? (
        <div className="flex-row flex-justify-content-center margin-top-20">
          <h3 style={{ textAlign: "center" }}>Your bin is empty.</h3>
        </div>
      ) : (
        <div>
          {deletedNotes.map((deletedNote: any) => {
            console.log("deletedNote", deletedNote);
            return (
              <Note
                noteTitle={deletedNote.noteTitle}
                text={deletedNote.text}
                id={deletedNote.id}
                priority={deletedNote.priority}
                bgColor={deletedNote.noteBgColor}
                labels={deletedNote.labels}
                date={deletedNote.date}
                isDeletedNote={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeletedNotes;
