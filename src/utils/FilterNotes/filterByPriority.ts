import { NoteType } from "./../../contexts/NotesContext/index";
const filterByPriority = (notes: NoteType[], priority: string): NoteType[] => {
  if (priority === "all") return notes;
  return notes.filter((note) => note.priority === priority);
};

export default filterByPriority;
