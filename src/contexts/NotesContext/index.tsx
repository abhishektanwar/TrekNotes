import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { reactChildren } from "../../types/general.types";
import NotesReducer from "../../reducers/NotesReducer";
import { useAuth } from "../AuthDialogContext";
import useNotesApiCalls from "../../hooks/useNotesApiCalls";
import { dispatchActionTypes } from "../../reducers/dispatchActionTypes";

interface InitialNoteDetailsType {
  noteTitle: string;
  priority: string;
  noteBgColor: string;
  labels: string[];
  date: Date;
}

export interface NoteType extends InitialNoteDetailsType {
  text: string;
}

const initialNotesState = {
  allNotes: [],
  allLabels: ["All"],
};

const initialNoteDetails: InitialNoteDetailsType = {
  noteTitle: "",
  priority: "",
  noteBgColor: "",
  labels: [],
  date: new Date(),
};
const NotesContext = createContext<any>(initialNotesState);

const NotesProvider = ({ children }: reactChildren) => {
  const [notesData, notesDispatch] = useReducer(
    NotesReducer,
    initialNotesState
  );
  const [newNote, setNewNote] =
    useState<InitialNoteDetailsType>(initialNoteDetails);
  const [newNoteBodyText, setNewNoteBodyText] = useState("");
  const handleNoteDetailUpdate = (id: string, value: any) => {
    setNewNote((prev) => ({ ...prev, [id]: value }));
  };
  const { user } = useAuth();
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const { fetchNotes } = useNotesApiCalls();
  const { LOAD_NOTES_FROM_SERVER } = dispatchActionTypes;
  useEffect(() => {
    console.log("new note", newNote);
  }, [newNote]);

  useEffect(() => {
    setIsFetchingNotes(true);
    if (user.isAuthenticated) {
      (async () => {
        try {
          console.log("fetch notes running");
          const response = await fetchNotes();
          if (response?.status === 200 && response.statusText === "OK") {
            notesDispatch({
              type: LOAD_NOTES_FROM_SERVER,
              payload: response.data.notes,
            });
          }
        } catch (e) {
          console.log("efferc fetcg notes", e);
        }
        setIsFetchingNotes(false);
      })();
    }
  }, [user.encodedToken]);
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
        initialNoteDetails,
        isFetchingNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
