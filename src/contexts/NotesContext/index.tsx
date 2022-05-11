import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { reactChildren } from "../../types/general.types";
import NotesReducer from "../../reducers/NotesReducer";

const initialNotesState = {
  allNotes: [],
  allLabels:["All"]
};

interface InitialNoteDetailsType{
  noteTitle: string
  priority:string
  noteBgColor:string
  labels:string[],
  date:Date
}
const initialNoteDetails:InitialNoteDetailsType = {
  noteTitle: "",
  priority:"",
  noteBgColor:"",
  labels:[],
  date:new Date()
};
const NotesContext = createContext<any>(initialNotesState);

const NotesProvider = ({ children }: reactChildren) => {
  const [notesData, notesDispatch] = useReducer(
    NotesReducer,
    initialNotesState
  );
  const [newNote, setNewNote] = useState<InitialNoteDetailsType>(initialNoteDetails);
  const [newNoteBodyText, setNewNoteBodyText] = useState("");
  const handleNoteDetailUpdate = (id:string,value:any) => {
    setNewNote((prev) => ({ ...prev, [id]: value }));
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
