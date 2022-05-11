import { createContext, useContext, useReducer, useState } from "react";
import NotesFilterReducer from "../../reducers/NotesFilterReducer";
import { reactChildren } from "../../types/general.types";

export interface FilterStateType {
  priority:string
  label:string
  date:string
  search:string

}
export const initialFilterState:FilterStateType = {
  priority: "all",
  label: "all",
  date: "newest",
  search: "",
};
const NotesFilterContext = createContext<any>({});

const NotesFilterProvider = ({ children }: reactChildren) => {
  const [filterState, filterDispatch] = useReducer(
    NotesFilterReducer,
    initialFilterState
  );
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilterVisibility = () => {
    setShowFilter((prev) => !prev);
  } 

  return (
    <NotesFilterContext.Provider
      value={{
        filterState,
        filterDispatch,
        showFilter,
        toggleFilterVisibility,
      }}
    >
      {children}
    </NotesFilterContext.Provider>
  );
};

const useNotesFilter = () => useContext(NotesFilterContext);

export { useNotesFilter, NotesFilterProvider };
