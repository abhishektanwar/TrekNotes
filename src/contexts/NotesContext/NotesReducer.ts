

const NotesReducer = (state:any,action:any) => {
  switch (action.type){
    case "addNewNote":
      return {
        ...state,
        allNotes:[...action.payload]
      }
    case "A":
      return state;
    default:
      return state
  }
}

export default NotesReducer;