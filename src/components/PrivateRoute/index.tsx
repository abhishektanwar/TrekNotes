import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import utils from "../../utils";

const PrivateRoute:FC = () => {
  const trekToken = utils.getLocalStorage('trek-notes-authToken')

  return trekToken !== null ? <Outlet /> : <Navigate to="/" />

}

export default PrivateRoute