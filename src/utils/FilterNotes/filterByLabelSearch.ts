import { NoteType } from "./../../contexts/NotesContext/index";
const filterByLabelSearch = (
  notes: NoteType[],
  stringToSearch: string
): NoteType[] => {
  if (stringToSearch === "") return notes;
  return notes.filter((note) => note.noteTitle.includes(stringToSearch));
};

export default filterByLabelSearch;
