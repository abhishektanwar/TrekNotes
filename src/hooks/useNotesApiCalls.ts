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
  const { ADD_NEW_NOTE, EDIT_NOTE, ARCHIVE_NOTE,UNARCHIVE_NOTE } = dispatchActionTypes;
  const addNote = async (data: any) => {
    try {
      const result = await operation({
        method: "post",
        url: "/api/notes",
        headers: { authorization: user.encodedToken },
        data,
      });
      if (result.status === 201 && result.statusText === "Created") {
        notesDispatch({ type: ADD_NEW_NOTE, payload: result.data.notes });
        customToast("New note added", "success");
        return true;
      }
    } catch (e) {
      customToast("Failed to add new note", "error");
    }
  };

  const fetchNotes = async () => {
    try {
      const result = await operation({
        method: "get",
        url: "/api/notes",
        headers: { authorization: user.encodedToken },
      });
      return result;
    } catch (e) {
      customToast("Failed to load data", "error");
    }
  };

  const updateNote = async (noteId: string, data: any) => {
    try {
      const result = await operation({
        method: "post",
        url: `/api/notes/${noteId}`,
        headers: { authorization: user.encodedToken },
        data,
      });

      return result;
    } catch (e) {
      customToast("Failed to update note", "error");
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const result = await operation({
        method: "delete",
        url: `/api/notes/${noteId}`,
        headers: { authorization: user.encodedToken },
      });
      if (result.status === 200 && result.statusText === "OK") {
        notesDispatch({ type: EDIT_NOTE, payload: result.data.notes });
        customToast("Note deleted", "success");
        return true;
      }
    } catch (e) {
      customToast("Failed to delete note", "error");
    }
  };

  const archiveNote = async (noteId: string, data: any) => {
    try {
      const result = await operation({
        method: "post",
        url: `/api/notes/archives/${noteId}`,
        headers: { authorization: user.encodedToken },
        data,
      });
      if (result.status === 201 && result.statusText === "Created") {
        notesDispatch({ type: ARCHIVE_NOTE, payload: result.data });
        customToast("Note archived", "success");
        return true;
      }
    } catch (e) {
      customToast("Failed to archive note", "error");
    }
  };

  const restoreArchivedNote = async (noteId: string) => {
    try {
      const result = await operation({
        method: "post",
        url: `/api/archives/restore/${noteId}`,
        headers: { authorization: user.encodedToken },
      });
      if(result.status===200 && result.statusText==="OK"){
        notesDispatch({ type: UNARCHIVE_NOTE, payload: result.data });
        customToast("Note unarchived","success")
        return true
      }
    } catch (e) {
      customToast("Failed to unarchive note","error");
      console.log(e);
    }
  };

  return {
    addNote,
    fetchNotes,
    updateNote,
    deleteNote,
    archiveNote,
    restoreArchivedNote,
  };
}

export default useNotesApiCalls;
