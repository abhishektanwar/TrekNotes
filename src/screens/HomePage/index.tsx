import { FC } from "react";
import { Loader } from "../../components/Loader";
import NewNote from "../../components/NewNote";
import Note from "../../components/Note";
import { useNotes } from "../../contexts/NotesContext";

const HomePage: FC = () => {
  const {
    notesData: { allNotes },
  } = useNotes();

  return (
    <div>
      <NewNote />
      <div
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {allNotes.map((note: any) => {
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
    </div>
  );
};
export default HomePage;

// fix quill css : done
// create new note component : add utility buttons (color,label, add note and all) : done
// loader on add note : done
//1 add functionality to add note : done
//2 list notes : done
//3 add label, color, priority, date functionality : date functionality left
//4 refactor add note functionality to check empty field and trims
//5 create filter compoenent
//6 add alerts for empty title,empty body,empty label,discard unsaved note error
// refactor individual note component (render HTML)
//7 sorting and searching
