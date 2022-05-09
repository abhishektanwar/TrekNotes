import { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/Close.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/Add.svg";
import { ReactComponent as ColorPaletteIcon } from "../../assets/icons/ColorPalette.svg";
import { ReactComponent as NewLabelIcon } from "../../assets/icons/NewLabel.svg";
import InputField from "../InputField";
import "./new-note.css";
import { useNotes } from "../../contexts/NotesContext";
import useNotesApiCalls from "../../hooks/useNotesApiCalls";
import { Loader } from "../Loader";
import Button from "../Buttons/Button";

interface AddColorComponentType {
  handleNoteDetailUpdate: (id: string, value: any) => void;
  setShowAddColorComponent: (prev: boolean) => void;
}

interface AddLabelComponentType{
  handleNoteDetailUpdate:(id:string,value:any) => void
}

const AddLabelComponent: FC<AddLabelComponentType> = ({handleNoteDetailUpdate}) => {
  const [newNoteLabel, setNewNoteLabel] = useState("");
  const [labels,setLabelsLocal] = useState<string[]>([]);
  return (
    <div style={{position:'absolute',display:'flex',border:'1px solid black',left:'20px',padding:'10px'}}>
      <InputField
        type="text"
        id="labels"
        value={newNoteLabel}
        onChange={(e) => setNewNoteLabel(e.target.value)}
        placeholder="Label..."
        required
        validation={true}
        name="new-note-label"
        customClass="add-label-input-field"
      />
      {/* TODO FIX ME */}
      <Button buttonText="Add" onClick={()=>setLabelsLocal([...labels,newNoteLabel])} buttonStyle="btn-outline-primary add-label-button" />
    </div>
  );
};
const AddColorComponent: FC<AddColorComponentType> = ({
  handleNoteDetailUpdate,
  setShowAddColorComponent,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        border: "1px solid black",
        height: "100px",
        width: "120px",
        zIndex: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        top: "36px",
      }}
    >
      <div
        style={{
          border: "1px solid white",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          backgroundColor: "green",
          margin: "auto",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate("noteBgColor", "green");
          setShowAddColorComponent(false);
        }}
      ></div>
      <div
        style={{
          border: "1px solid white",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          backgroundColor: "pink",
          margin: "auto",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate("noteBgColor", "pink");
          setShowAddColorComponent(false);
        }}
      />
      <div
        style={{
          border: "1px solid white",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          backgroundColor: "blue",
          margin: "auto",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate("noteBgColor", "blue");
          setShowAddColorComponent(false);
        }}
      />
      <div
        style={{
          border: "1px solid white",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          backgroundColor: "yellow",
          margin: "auto",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate("noteBgColor", "yellow");
          setShowAddColorComponent(false);
        }}
      />
    </div>
  );
};

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
  } = useNotes();
  const { allNotes } = notesData;
  const { addNote } = useNotesApiCalls();
  const [isAddNoteLoading, setIsAddNoteLoading] = useState(false);
  const [showAddColorComponent, setShowAddColorComponent] = useState(false);
  const [showAddLabelComponent, setShowAddLabelComponent] = useState(false);
  const toolbarModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
    ],
  };

  const handleAddNote = async () => {
    console.log("note added");
    setIsAddNoteLoading(true);
    const resp = await addNote({
      note: {
        ...newNote,
        text: newNoteBodyText,
      },
    });
    if (resp === true) {
      setNewNote(initialNoteDetails);
      setNewNoteBodyText("");
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
            handleNoteDetailUpdate(e.target.id, e.target.value);
          }}
          value={newNote.noteTitle}
          validation={true}
          customClass="new-note-input-field"
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
          <div
            className="utility-action-btns-left"
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
            {showAddLabelComponent && <AddLabelComponent handleNoteDetailUpdate={handleNoteDetailUpdate} />}
            <span onClick={() => setShowAddLabelComponent((prev) => !prev)}>
              <NewLabelIcon  />
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
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
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
