import { initialFilterState } from "./../contexts/FilterContext/index";
import { dispatchActionTypes } from "./dispatchActionTypes";

const NotesFilterReducer = (state: any, action: any) => {
  const {
    SET_FILTER_NOTES_PRIORITY,
    SET_FILTER_NOTES_DATE,
    SET_FILTER_NOTES_LABEL,
    SET_FILTER_NOTES_SEARCH,
    RESET_NOTES_FILTER,
  } = dispatchActionTypes;
  switch (action.type) {
    case SET_FILTER_NOTES_PRIORITY:
      return {
        ...state,
        priority: action.payload,
      };
    case SET_FILTER_NOTES_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SET_FILTER_NOTES_LABEL:
      return {
        ...state,
        label: action.payload,
      };
    case SET_FILTER_NOTES_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case RESET_NOTES_FILTER:
      return initialFilterState;
    default:
      return state;
  }
};

export default NotesFilterReducer;
