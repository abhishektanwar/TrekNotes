import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthDialogContext"
import { useModal } from "../../contexts/ModalContext";

const PrivateRoute:FC = () => {
  const {user,setAuthType} = useAuth();
  const {showModal} = useModal();
  const location = useLocation();
  const loginHandler = () => {
    if(!user.isAuthenticated){
      setAuthType('login')
      showModal()
    }

  }
  return (
    <>
    {
      user.isAuthenticated ? <Outlet /> : (
        <>
        <Navigate to="/" />
        {loginHandler()}
        </>
      )
    }
    </>
  )
}

export default PrivateRoute