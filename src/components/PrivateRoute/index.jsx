import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthDialogContext"
import { useModal } from "../../contexts/ModalContext";

const PrivateRoute = () => {
  const {user,setAuthType} = useAuth();
  const {showModal} = useModal();
  const loginHandler = () => {
    showModal();
    setAuthType('login');
  }
  return user.isAuthenticated ? <Outlet /> : (
    <>
    <Navigate to="/" />
    {loginHandler()}
    </>

  )
}

export default PrivateRoute