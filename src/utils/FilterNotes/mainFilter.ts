import { NoteType } from './../../contexts/NotesContext/index';
import { FilterStateType } from "../../contexts/FilterContext"
import sortByDate from "./sortByDate"
import filterByLabel from './filterByLabel';
import filterByPriority from './filterByPriority';
import filterByLabelSearch from './filterByLabelSearch';

const getFilteredNotes = (allNotes:[],filterState:FilterStateType) => {
  let filteredNotes:NoteType[] = [...allNotes]
  filteredNotes = filterByLabelSearch(filteredNotes,filterState.search)
  filteredNotes = sortByDate(filteredNotes,filterState.date)
  filteredNotes = filterByLabel(filteredNotes,filterState.label)
  filteredNotes = filterByPriority(filteredNotes,filterState.priority)

  return filteredNotes

}

export default getFilteredNotes