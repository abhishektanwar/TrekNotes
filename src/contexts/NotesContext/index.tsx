import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { reactChildren } from "../../types/general.types";
import NotesReducer from "./NotesReducer";

const initialNotesState = {
  allNotes: [],
};

const initialNoteDetails = {
  noteTitle: "",
};
const NotesContext = createContext<any>(initialNotesState);

const NotesProvider = ({ children }: reactChildren) => {
  const [notesData, notesDispatch] = useReducer(
    NotesReducer,
    initialNotesState
  );
  const [newNote, setNewNote] = useState(initialNoteDetails);
  const [newNoteBodyText, setNewNoteBodyText] = useState("");
  const handleNoteDetailUpdate = (e: any) => {
    setNewNote((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    console.log("new note", newNote);
  }, [newNote]);
  return (
    <NotesContext.Provider
      value={{
        notesData,
        notesDispatch,
        newNote,
        setNewNote,
        handleNoteDetailUpdate,
        newNoteBodyText,
        setNewNoteBodyText,
        initialNoteDetails
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
