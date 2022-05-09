import { FC } from "react"
import './note.css';

interface NoteType{
  noteTitle:string
  text:string
  id:string
}

const Note:FC<NoteType> = (note) => {
  const {noteTitle,text,id} = note;
  return (
    <div id={id} className="shadow-box note-container">
      <h2>{noteTitle}</h2>
      <h3>{text}</h3>
    </div>
  )
}

export default Note;