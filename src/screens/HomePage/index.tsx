import { FC } from "react";
import Filter from "../../components/Filter";
import { Loader } from "../../components/Loader";
import NewNote from "../../components/NewNote";
import Note from "../../components/Note";
import { useNotesFilter } from "../../contexts/FilterContext";
import { NoteType, useNotes } from "../../contexts/NotesContext";
import getFilteredNotes from "../../utils/FilterNotes/mainFilter";
import sortByDate from "../../utils/FilterNotes/sortByDate";

const HomePage: FC = () => {
  const {
    notesData: { allNotes,allLabels,deletedNotes },isFetchingNotes
  } = useNotes();
  const {filterState} = useNotesFilter()
  const finalFilteredNotes:NoteType[] = getFilteredNotes(allNotes,filterState)

  return (
    isFetchingNotes ? <Loader /> :
    <div>
      <NewNote />
      <Filter />
      <div
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {finalFilteredNotes.map((note: any) => {
          return (
            <Note
              noteTitle={note.noteTitle}
              text={note.text}
              id={note._id}
              priority={note.priority}
              bgColor={note.noteBgColor}
              labels={note.labels}
              date={note.date}
            />
          );
        })}
      </div>
      <h2>Deleted Notes</h2>
      {deletedNotes.map((note: any) => {
          return (
            <Note
              noteTitle={note.noteTitle}
              text={note.text}
              id={note._id}
              priority={note.priority}
              bgColor={note.noteBgColor}
              labels={note.labels}
              date={note.date}
            />
          );
        })}
    </div>
  );
};
export default HomePage;