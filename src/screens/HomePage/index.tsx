import { FC } from "react";
import Filter from "../../components/Filter";
import { Loader } from "../../components/Loader";
import NewNote from "../../components/NewNote";
import Note from "../../components/Note";
import { useNotesFilter } from "../../contexts/FilterContext";
import { NoteType, useNotes } from "../../contexts/NotesContext";
import getFilteredNotes from "../../utils/FilterNotes/mainFilter";
import "./home-page.css";

const HomePage: FC = () => {
  const {
    notesData: { allNotes },
    isFetchingNotes,
  } = useNotes();
  const { filterState } = useNotesFilter();
  const finalFilteredNotes: NoteType[] = getFilteredNotes(
    allNotes,
    filterState
  );

  return isFetchingNotes ? (
    <Loader />
  ) : (
    <div>
      <NewNote />
      <Filter />
      <div className="notes-listing-container">
        {finalFilteredNotes.map((note: any) => {
          return (
            <div key={note._id}>
            <Note
              noteTitle={note.noteTitle}
              text={note.text}
              id={note._id}
              priority={note.priority}
              bgColor={note.noteBgColor}
              labels={note.labels}
              date={note.date}
            /></div>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
