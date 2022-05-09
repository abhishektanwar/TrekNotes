import { useAuth } from '../contexts/AuthDialogContext';
import { useNotes } from '../contexts/NotesContext';
import { useAxios } from './../utils/useAxios';
import { useToast} from './useToast';
import {toast} from 'react-toastify';
function useNotesApiCalls(){
  const {operation} = useAxios();
  const {user} = useAuth()
  const {notesDispatch} = useNotes();
  const {customToast} = useToast()
  const addNote =async (data:any) => {
    try{
      const result = await operation({
        method:"post",
        url:"/api/notes",
        headers:{authorization:user.encodedToken},
        data
      })
      console.log("Result",result);
      if(result.status === 201 && result.statusText==="Created"){
        notesDispatch({type:"addNewNote",payload:result.data.notes})
        customToast("New note added",'success');
        console.log("in if result",result)
        return true
      }
    }
    catch(e){
      customToast("Failed to add new note","error")
      console.log("error",e)
    }
  }


  return {addNote};
}

export default useNotesApiCalls