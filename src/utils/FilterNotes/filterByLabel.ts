import { NoteType } from "./../../contexts/NotesContext/index";

const filterByLabel = (notes: NoteType[], label: string): NoteType[] => {
  if (label === "all" || label === "All") {
    return notes;
  }
  return notes.filter((note: NoteType) => note.labels.includes(label));
};

export default filterByLabel;
