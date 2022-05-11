import { createContext, useContext, useReducer } from "react";
import NotesFilterReducer from "../../reducers/NotesFilterReducer";
import { reactChildren } from "../../types/general.types";

export const initialFilterState = {
  priority:'All',
  label:'All',
  date:"newest",
  search:"",
}
const NotesFilterContext = createContext({})

const NotesFilterProvider = ({children}:reactChildren) => {
  const [filteredNotes,filteredNotesDispatch] = useReducer(NotesFilterReducer,initialFilterState)

  return (
    <NotesFilterContext.Provider value={{filteredNotes,filteredNotesDispatch}}>
      {children}
    </NotesFilterContext.Provider>
  )
}

const useNotesFilter = () => useContext(NotesFilterContext);

export {useNotesFilter,NotesFilterProvider};