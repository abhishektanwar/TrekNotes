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
      <div style={{width:'80%',margin:'auto',display:'flex',justifyContent:'flex-start',flexWrap:'wrap'}}>
        {allNotes.map((note: any) => {
          // console.log(note);
          return (
            <Note noteTitle={note.noteTitle} text={note.text} id={note._id} />
          );
        })}

      </div>
    </div>
  );
};
export default HomePage;

// fix quill css : done
// create new note component : add utility buttons (color,label, add note and all) : done
//3 create filter compoenent
// add alerts for empty title,empty body,empty label,discard unsaved note error
//1 add functionality to add note
//2 list notes
//4 sorting and searching
