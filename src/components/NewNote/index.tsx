import { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/Close.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/Add.svg";
import { ReactComponent as ColorPaletteIcon } from "../../assets/icons/ColorPalette.svg";
import { ReactComponent as NewLabelIcon } from "../../assets/icons/NewLabel.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/Filter.svg";

import InputField from "../InputField";
import "./new-note.css";
import { useNotes } from "../../contexts/NotesContext";
import useNotesApiCalls from "../../hooks/useNotesApiCalls";
import { Loader } from "../Loader";
import AddLabelComponent from "./AddLabelComponent";
import AddColorComponent from "./AddColorComponent";
import { useToast } from "../../hooks/useToast";
import { dispatchActionTypes } from "../../reducers/dispatchActionTypes";
import { useNotesFilter } from "../../contexts/FilterContext";
import Button from "../Buttons/Button";

const NewNote: FC = () => {
  const {
    notesData,
    notesDispatch,
    newNote,
    setNewNote,
    handleNoteDetailUpdate,
    setNewNoteBodyText,
    newNoteBodyText,
    initialNoteDetails,
    editNote,
    setEditNote,
  } = useNotes();
  const { addNote, updateNote } = useNotesApiCalls();
  const [isAddNoteLoading, setIsAddNoteLoading] = useState(false);
  const [showAddColorComponent, setShowAddColorComponent] = useState(false);
  const [showAddLabelComponent, setShowAddLabelComponent] = useState(false);
  const { customToast } = useToast();
  const { toggleFilterVisibility } = useNotesFilter();
  const { ADD_LABELS, EDIT_NOTE } = dispatchActionTypes;
  const toolbarModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
    ],
  };

  const handleDiscardNote = () => {
    if (
      newNote.noteTitle !== "" ||
      newNoteBodyText !== "" ||
      newNoteBodyText !== "<p></br></p>"
    ) {
      const userDiscardNoteResponse = window.confirm(
        "Your changes have not been saved. Continuing will discard all your changes. Are you sure you want to continue?"
      );
      if (userDiscardNoteResponse) {
        setNewNote(initialNoteDetails);
        setNewNoteBodyText("");
        setEditNote(false);
      }
    }
  };

  const handleAddNote = async () => {
    if (newNote.noteTitle.trim() === "") {
      customToast("Note title cannot be empty", "warning");
    } else if (newNoteBodyText === "" || newNoteBodyText === "<p></br></p>") {
      customToast("Note body cannot be empty", "warning");
    } else {
      setIsAddNoteLoading(true);
      if (!editNote) {
        const resp = await addNote({
          note: {
            ...newNote,
            date: new Date(),
            text: newNoteBodyText,
          },
        });
        if (resp === true) {
          notesDispatch({ type: ADD_LABELS, payload: newNote.labels });
          setNewNote(initialNoteDetails);
          setNewNoteBodyText("");
        }
      } else {
        const resp = await updateNote(newNote._id, {
          note: {
            ...newNote,
            date: new Date(),
            text: newNoteBodyText,
          },
        });
        if (resp?.status === 201 && resp.statusText === "Created") {
          notesDispatch({ type: EDIT_NOTE, payload: resp.data.notes });
          notesDispatch({ type: ADD_LABELS, payload: newNote.labels });
          setNewNote(initialNoteDetails);
          setNewNoteBodyText("");
          setEditNote(false);
          customToast("Note updated", "success");
        }
      }
      setIsAddNoteLoading(false);
    }
  };

  const removeLabel = (index: number) => {
    const updatedLabels = newNote.labels.filter(
      (label: string, id: number) => id !== index
    );
    setNewNote((prev: any) => ({ ...prev, labels: [...updatedLabels] }));
  };
  return (
    <div className="new-note-main-container">
      {isAddNoteLoading && <Loader />}
      <div className="new-note-container shadow-box">
        <div style={{ display: "flex" }}>
          <InputField
            type="text"
            name="noteTitle"
            id="noteTitle"
            placeholder="Title"
            required
            onChange={(e) => {
              handleNoteDetailUpdate(e.target.id, e.target.value);
            }}
            value={newNote.noteTitle}
            validation={true}
            customClass="new-note-input-field"
            autoFocus={true}
          />
          <span
            style={{ marginTop: "7px", cursor: "pointer" }}
            onClick={() => toggleFilterVisibility()}
          >
            <FilterIcon />
          </span>
        </div>
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
          <div
            className="utility-action-btns-left flex-row flex-align-item-center"
            style={{ position: "relative" }}
          >
            {showAddColorComponent && (
              <AddColorComponent
                handleNoteDetailUpdate={handleNoteDetailUpdate}
                setShowAddColorComponent={setShowAddColorComponent}
              />
            )}
            <span onClick={() => setShowAddColorComponent((prev) => !prev)}>
              <ColorPaletteIcon />
            </span>
            {showAddLabelComponent && (
              <AddLabelComponent
                handleNoteDetailUpdate={handleNoteDetailUpdate}
                labels={newNote.labels}
              />
            )}
            <span onClick={() => setShowAddLabelComponent((prev) => !prev)}>
              <NewLabelIcon />
            </span>
            <select
              onChange={(e) => {
                handleNoteDetailUpdate(e.target.id, e.target.value);
              }}
              id="priority"
            >
              <option disabled selected>
                Priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p className="body-typo-sm" style={{ marginLeft: "10px" }}>
              {new Date(newNote.date).toLocaleDateString()}
            </p>
            <ul className="label-main-container">
              {newNote.labels.map((label: any, index: number) => {
                return (
                  <li
                    className="label-container body-typo-md flex-row flex-align-item-center"
                    key={index}
                  >
                    {label}
                    <span onClick={() => removeLabel(index)}>
                      <CloseIcon />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="utility-action-btns-right">
            {!editNote ? (
              <span onClick={handleAddNote}>
                <AddIcon />
              </span>
            ) : (
              <Button
                buttonText="Update"
                onClick={() => handleAddNote()}
              ></Button>
            )}
            <span onClick={handleDiscardNote}>
              <CloseIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNote;
