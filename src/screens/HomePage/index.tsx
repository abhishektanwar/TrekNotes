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
      {allLabels.map((label:string)=>{
        return <h3>{label}</h3>
      })}
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

// fix quill css : done
// create new note component : add utility buttons (color,label, add note and all) : done
// loader on add note : done
//1 add functionality to add note : done
//2 list notes : done
//3 add label, color, priority, date functionality : done
//4 refactor add note functionality to check empty field and trims : done
//5 create filter compoenent : done
//6 add alerts for empty title,empty body,empty label,discard unsaved note error : done
//7 sorting and searching, apply filters : done
//8 add labels added to new note to allLabels context for filter dropdown : done
// 9 handle discard note button : window confirm : done
// 10 handle empty labels disabled button : done
// date sort:done
// label filter :done
// priority filter:done
// search filter:done
// 11 fetch notes on fresh login : done
// 12 refactor individual note component (render HTML)
// 13 add utilities to note component


// MAJOR 1 : DELETE NOTES
// MAJOR 2 : ARCHIVE NOTES