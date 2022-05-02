import { createContext, useContext } from "react";
import Login from "../../components/Authentication/Login";
import ModalWrapper from "../../components/ModalWrapper";

const AuthContext = createContext({} as any);

const AuthProvider = (props:any) => {

  return (
    <AuthContext.Provider value={{}}>
      <ModalWrapper>
        <Login />
        {/* <h3>asjdaskd</h3> */}
      </ModalWrapper>
    {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export {useAuth,AuthProvider}