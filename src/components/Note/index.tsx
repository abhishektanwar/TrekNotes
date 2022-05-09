import { FC } from "react"
import './note.css';

interface NoteType{
  noteTitle:string
  text:string
  id:string
  priority:string
  labels:string[]
  bgColor:string
}

const Note:FC<NoteType> = (note) => {
  const {noteTitle,text,id,priority,labels,bgColor} = note;
  return (
    <div key={id} className="shadow-box note-container" style={{backgroundColor:bgColor}}>
      <h2>{noteTitle}</h2>
      <h3>{text}</h3>
      <h4>Priority:{priority}</h4>
      {labels.map((label)=><h6>{label}</h6>)}
    </div>
  )
}

export default Note;