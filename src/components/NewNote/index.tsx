import { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/Close.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/Add.svg";
import { ReactComponent as ColorPaletteIcon } from "../../assets/icons/ColorPalette.svg";
import { ReactComponent as NewLabelIcon } from "../../assets/icons/NewLabel.svg";

import "./new-note.css";
import InputField from "../InputField";
import { useNotes } from "../../contexts/NotesContext";
import useNotesApiCalls from "../../hooks/useNotesApiCalls";
import { Loader } from "../Loader";
const NewNote: FC = () => {

  const {
    notesData,
    notesDispatch,
    newNote,
    setNewNote,
    handleNoteDetailUpdate,
    setNewNoteBodyText,
    newNoteBodyText,
    initialNoteDetails
  } = useNotes();
  const {allNotes} = notesData;
  const {addNote} = useNotesApiCalls();
  const [isAddNoteLoading,setIsAddNoteLoading] = useState(false);
  const toolbarModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
    ],
  };

  const handleAddNote =async () => {
    console.log("note added");
    setIsAddNoteLoading(true)
    const resp = await addNote({note: {
      ...newNote,
      text: newNoteBodyText,
    }})
    if(resp === true){
      setNewNote(initialNoteDetails)
      setNewNoteBodyText("")
    }
    setIsAddNoteLoading(false);
  };
  return (
    <div className="new-note-main-container">
      {isAddNoteLoading && <Loader />}
      <div className="new-note-container shadow-box">
        <InputField
          type="text"
          name="noteTitle"
          id="noteTitle"
          placeholder="Title"
          required
          onChange={(e) => {
            handleNoteDetailUpdate(e);
          }}
          value={newNote.noteTitle}
          validation={true}
          customClass="new-note-title-input-field"
          autoFocus={true}
        />
        <div className="text-editor">
          <ReactQuill
            modules={toolbarModules}
            value={newNoteBodyText}
            placeholder="Take a note..."
            onChange={setNewNoteBodyText}
            // style={{
            //   backgroundColor: "blue",
            // }}
          />
        </div>
        <div className="new-note-utility-action-btns">
          <div className="utility-action-btns-left">
            <ColorPaletteIcon />
            <NewLabelIcon />
          </div>
          <div className="utility-action-btns-right">
            <span onClick={handleAddNote}>
              <AddIcon />
            </span>
            <CloseIcon />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default NewNote;
