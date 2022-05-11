import { NoteType } from "./../../contexts/NotesContext/index";

const sortByDate = (allNotes: NoteType[], date: string): NoteType[] => {
  let copyAllNotes: NoteType[] = [...allNotes];
  let tempNotes: NoteType[] = [];
  if (date === "all") {
    return allNotes;
  } else if (date === "newest") {
    tempNotes = copyAllNotes.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  } else if (date === "oldest") {
    tempNotes = copyAllNotes.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
  return tempNotes;
};

export default sortByDate;
