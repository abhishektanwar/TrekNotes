import { dispatchActionTypes } from './dispatchActionTypes';


const NotesReducer = (state:any,action:any) => {
  const {ADD_LABELS,ADD_NEW_NOTE,LOAD_NOTES_FROM_SERVER,EDIT_NOTE,DELETE_NOTE,ARCHIVE_NOTE} = dispatchActionTypes 
  switch (action.type){
    case ADD_NEW_NOTE:
      return {
        ...state,
        allNotes:[...action.payload]
      }
    // add labels added to new note, to maintain a list for filter label dropdown
    case ADD_LABELS:
      return{
        ...state,
        allLabels:[...Array.from(new Set(["All",...state.allLabels,...action.payload]) )]
      }
    case LOAD_NOTES_FROM_SERVER:
      return {
        ...state,
        allNotes:[...action.payload]
      }
    case EDIT_NOTE:
      return {
        ...state,
        allNotes:[...action.payload]
      }
    case DELETE_NOTE:
      return {
        ...state,
        deletedNotes:[action.payload,...state.deletedNotes]
      }
    case ARCHIVE_NOTE:
      return{
        ...state,
        archivedNotes:[action.payload.archives,...state.archivedNotes],
        allNotes:[...action.payload.notes]
      }
    case "A":
      return state;
    default:
      return state
  }
}

export default NotesReducer;