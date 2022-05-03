import {toast} from 'react-toastify';

type toastType = "success" | "error";

function useToast(){

  const customToast = (message:string,type:toastType) => {
    if(type==='success'){
      toast.success(message,{
        position: "bottom-center",
        autoClose: 1200,
        pauseOnHover: false,
        style:{fontSize:'1.6rem'}
      })
    }
    else if(type==='error'){
      toast.error(message,{
        position: "bottom-center",
        autoClose: 1200,
        pauseOnHover: false,
        style:{fontSize:'1.6rem'}
      })
    }
  }

  return {customToast}
}
export {useToast};