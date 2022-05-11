import { FC, useState } from "react";
import { ReactComponent as PriorityIcon } from "../../assets/icons/Priority.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/Calendar.svg";
import { ReactComponent as ColorPaletteIcon } from "../../assets/icons/ColorPalette.svg";
import { ReactComponent as ArchiveIcon } from "../../assets/icons/Archive.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/Delete.svg";
import { ReactComponent as EditNoteIcon } from "../../assets/icons/EditNote.svg";

import "./note.css";
import AddColorComponent from "../NewNote/AddColorComponent";
import { useNotes } from "../../contexts/NotesContext";
import useNotesApiCalls from "../../hooks/useNotesApiCalls";

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
  const {handleNoteDetailUpdate,handleNoteEdit} = useNotes()
  const {updateNote} = useNotesApiCalls();

  const handleUpdateNoteColor = async (bgColor:string) => {
    console.log("note added");
      const resp = await updateNote(note.id,{
        note: {
          ...note,
          noteBgColor:bgColor,
        },
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
                handleFn={(bgColor:string)=>handleUpdateNoteColor(bgColor)}
                setShowAddColorComponent={setShowAddColorComponent}
              />
            )}
          <span className="note-utility-btn" onClick={() => setShowAddColorComponent((prev) => !prev)}>
          {/* <span className="note-utility-btn" onClick={()=>{
            console.log("note id",note.id)
            handleUpdateNote()

          }}> */}
            <ColorPaletteIcon />
          </span>
          <span className="note-utility-btn">
            <ArchiveIcon />
          </span>
          <span className="note-utility-btn">
            <DeleteIcon />
          </span>
          <span className="note-utility-btn">
            <EditNoteIcon />
          </span>
        </div>
        <div className="meta-data flex-row">
          <div
            className="flex-row flex-align-items-center"
            style={{ paddingRight: "10px" }}
          >
            <PriorityIcon />
            <p className="body-typo-md text-medium-weight">:{"priority"}</p>
          </div>
          {labels.map((label) => (
            <h6>{label}</h6>
          ))}
          <div className="flex-row flex-align-items-center">
            <CalendarIcon />
            <p className="body-typo-md text-medium-weight">
              :{new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
