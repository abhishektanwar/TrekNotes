import { createContext, useContext, useEffect, useState } from "react";
import Login from "../../components/Authentication/Login";
import SignUp from "../../components/Authentication/SignUp";
import ModalWrapper from "../../components/ModalWrapper";
import { useToast } from "../../hooks/useToast";
import utils from "../../utils";
import { useAxios } from "../../utils/useAxios";

const AuthContext = createContext({} as any);

const AuthProvider = (props: any) => {
  const { customToast } = useToast();
  const { operation} = useAxios();
  const [authType, setAuthType] = useState(null);
  const [error, setError] = useState({ errorExists: false, errorMessage: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    isAuthenticated: false,
    encodedToken: "",
  });

  const loginHandler = async (user: any) => {
    setIsLoading(true);
    try {
      const result = await operation({
        method: "post",
        url: "/api/auth/login",
        data: user,
      });
      console.log("response", result);
      if (result.statusText === "OK") {
        utils.setLocalStorage("trek-notes-authToken", result.data.encodedToken);
        setUser({
          ...result.data.foundUser,
          isAuthenticated: true,
          encodedToken: result.data.encodedToken,
        });
        customToast("Logged in Successfully", "success");
        return true;
      }
    } catch (e) {
      customToast("Login Failed", "error");
      setError({
        errorExists: true,
        errorMessage: "Invalid Credentials. Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUpHandler = async (user: any) => {
    setIsLoading(true);
    try {
      const result = await operation({
        method: "post",
        url: "/api/auth/signup",
        data: user,
      });
      if (result.statusText === "Created") {
        setUser({
          ...result.data.foundUser,
          isAuthenticated: true,
          encodedToken: result.data.encodedToken,
        });
        customToast("Signed up successfully", "success");
        utils.setLocalStorage("trek-notes-authToken", result.data.encodedToken);
        return true;
      }
    } catch (e) {
      customToast("Sign up failed", "error");
      setError({
        errorExists: true,
        errorMessage: "Something went wront. Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = () => {
    utils.removeLocalStorage("trek-notes-authToken");
    setUser({ isAuthenticated: false, encodedToken: "" });
  };

  return (
    <AuthContext.Provider
      value={{
        authType,
        user,
        loginHandler,
        signUpHandler,
        setAuthType,
        logoutHandler,
        isLoading,
        error,
      }}
    >
      <ModalWrapper>
        {authType === "login" ? <Login /> : <SignUp />}
      </ModalWrapper>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };