import { dispatchActionTypes } from "./../reducers/dispatchActionTypes";
import { useAuth } from "../contexts/AuthDialogContext";
import { useNotes } from "../contexts/NotesContext";
import { useAxios } from "./../utils/useAxios";
import { useToast } from "./useToast";
import { toast } from "react-toastify";
function useNotesApiCalls() {
  const { operation } = useAxios();
  const { user } = useAuth();
  const { notesDispatch } = useNotes();
  const { customToast } = useToast();
  const { ADD_NEW_NOTE, LOAD_NOTES_FROM_SERVER, EDIT_NOTE, ARCHIVE_NOTE } = dispatchActionTypes;
  const addNote = async (data: any) => {
    try {
      const result = await operation({
        method: "post",
        url: "/api/notes",
        headers: { authorization: user.encodedToken },
        data,
      });
      console.log("Result", result);
      if (result.status === 201 && result.statusText === "Created") {
        notesDispatch({ type: ADD_NEW_NOTE, payload: result.data.notes });
        customToast("New note added", "success");
        console.log("in if result", result);
        return true;
      }
    } catch (e) {
      customToast("Failed to add new note", "error");
      console.log("error", e);
    }
  };

  const fetchNotes = async () => {
    try {
      const result = await operation({
        method: "get",
        url: "/api/notes",
        headers: { authorization: user.encodedToken },
      });
      return result
    } catch (e) {
      customToast("Failed to load data", "error");
      console.log("error in fetching notes", e);
    }
  };

  const updateNote = async (noteId:string,data: any) => {
    try {
      const result = await operation({
        method: "post",
        url: `/api/notes/${noteId}`,
        headers: { authorization: user.encodedToken },
        data,
      });
      console.log("Result", result);
      if (result.status === 201 && result.statusText === "Created") {
        notesDispatch({ type: EDIT_NOTE, payload: result.data.notes });
        customToast("Note updated", "success");
        console.log("in if result", result);
        return true;
      }
    } catch (e) {
      customToast("Failed to update note", "error");
      console.log("error", e);
    }
  };

  const deleteNote = async (noteId:string) => {
    console.log("in delete note")
    try {
      const result = await operation({
        method: "delete",
        url: `/api/notes/${noteId}`,
        headers: { authorization: user.encodedToken },
      });
      console.log("Result", result);
      if (result.status === 200 && result.statusText === "OK") {
        notesDispatch({ type: EDIT_NOTE, payload: result.data.notes });
        customToast("Note deleted", "success");
        console.log("in if result", result);
        return true;
      }
    } catch (e) {
      customToast("Failed to delete note", "error");
      console.log("error", e);
    }
  }

  const archiveNote = async (noteId:string,data:any) => {
    console.log("in delete note")
    try {
      const result = await operation({
        method: "post",
        url: `/api/notes/archives/${noteId}`,
        headers: { authorization: user.encodedToken },
        data
      });
      console.log("Result", result);
      if (result.status === 201 && result.statusText === "Created") {
        notesDispatch({ type: ARCHIVE_NOTE, payload: result.data });
        customToast("Note archived", "success");
        console.log("in if result", result);
        return true;
      }
    } catch (e) {
      customToast("Failed to archive note", "error");
      console.log("error", e);
    }
  }

  return { addNote, fetchNotes, updateNote, deleteNote, archiveNote };
}

export default useNotesApiCalls;
