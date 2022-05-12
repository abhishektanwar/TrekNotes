import { FC, useState } from "react";
import { ReactComponent as PriorityIcon } from "../../assets/icons/Priority.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/Calendar.svg";
import { ReactComponent as ColorPaletteIcon } from "../../assets/icons/ColorPalette.svg";
import { ReactComponent as ArchiveIcon } from "../../assets/icons/Archive.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/Delete.svg";
import { ReactComponent as EditNoteIcon } from "../../assets/icons/EditNote.svg";
import AddColorComponent from "../NewNote/AddColorComponent";
import { useNotes } from "../../contexts/NotesContext";
import useNotesApiCalls from "../../hooks/useNotesApiCalls";
import { dispatchActionTypes } from "../../reducers/dispatchActionTypes";
import "./note.css";

interface NoteType {
  noteTitle: string;
  text: string;
  id: string;
  priority: string;
  labels: string[];
  bgColor: string;
  date: string;
}

const Note: FC<NoteType> = (note) => {
  const { noteTitle, text, id, priority, labels, bgColor, date } = note;
  const [showAddColorComponent, setShowAddColorComponent] = useState(false);
  const { notesDispatch, handleEditNote, setEditNote } = useNotes();
  const { updateNote, deleteNote, archiveNote } = useNotesApiCalls();
  const { DELETE_NOTE } = dispatchActionTypes;
  const handleUpdateNoteColor = async (bgColor: string) => {
    const resp = await updateNote(note.id, {
      note: {
        ...note,
        noteBgColor: bgColor,
      },
    });
  };

  const removeNote = async () => {
    const resp = await deleteNote(note.id);
    if (resp === true) {
      notesDispatch({ type: DELETE_NOTE, payload: note });
    }
  };

  const ArchiveNote = async () => {
    const resp = await archiveNote(note.id, {
      note: { ...note },
    });
  };

  return (
    <div
      key={id}
      className="shadow-box note-container flex-column"
      style={{ backgroundColor: bgColor }}
    >
      <h4>{noteTitle}</h4>
      <div
        className="note-body-text"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      <div className="utility-container flex-column">
        <div className="utility-btn-container flex-row ">
          {showAddColorComponent && (
            <AddColorComponent
              handleFn={(bgColor: string) => handleUpdateNoteColor(bgColor)}
              setShowAddColorComponent={setShowAddColorComponent}
            />
          )}
          <span
            className="note-utility-btn"
            onClick={() => setShowAddColorComponent((prev) => !prev)}
          >
            <ColorPaletteIcon />
          </span>
          <span className="note-utility-btn" onClick={() => ArchiveNote()}>
            <ArchiveIcon />
          </span>
          <span className="note-utility-btn" onClick={() => removeNote()}>
            <DeleteIcon />
          </span>
          <span
            className="note-utility-btn"
            onClick={() => {
              handleEditNote(note.id);
              window.scroll(0, 0);
              setEditNote(true);
            }}
          >
            <EditNoteIcon />
          </span>
        </div>
        <div className="meta-data flex-row flex-align-item-center">
          <div className="flex-row flex-align-item-center priority-container">
            <PriorityIcon />
            <p className="body-typo-sm text-medium-weight">:{priority}</p>
          </div>
          <div className="flex-row flex-align-item-center">
            <CalendarIcon />
            <p className="body-typo-sm text-medium-weight">
              :{new Date(date).toLocaleDateString()}
            </p>
          </div>
          <span className="meta-data-separator">|</span>
          {labels[0] !== undefined ? (
            <p className="body-typo-sm">{labels[0]}</p>
          ) : null}
          {labels[1] !== undefined ? (
            <p className="body-typo-sm">{labels[1]}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Note;
