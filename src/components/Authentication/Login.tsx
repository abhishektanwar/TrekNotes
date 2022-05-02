import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthDialogContext";
import { useModal } from "../../contexts/ModalContext";
import Button from "../Header/Button";
import InputField from "../InputField";
import "./authentication.css";
const Login = () => {
  // const { setAuthType, loginHandler, error } = useAuth();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const { hideModal } = useModal();

  const isValidEmail = loginCredentials.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword =
    loginCredentials.password && loginCredentials.password.length >= 8
      ? true
      : false;

  const handleLoginCredentialInput = (e:any) => {
    setLoginCredentials((creds) => ({
      ...creds,
      [e.target.name]: e.target.value,
    }));
  };

  // const loginUser = async () => {
  //   // e.preventDefault();
  //   const success = await loginHandler(loginCredentials);
  //   if (success) hideModal();
  // };

  return (
    <div className="auth-body">
      <div className="authentication-container flex-column">
        <h3 className="text-bold-weight">Login</h3>
        <InputField
          type="email"
          name="email"
          labelClass="required-field"
          id="email"
          placeholder="username@xyz.com"
          labelText="Email Address"
          value={loginCredentials.email}
          onChange={handleLoginCredentialInput}
          required={true}
          validation={loginCredentials.email.length === 0 ? true : isValidEmail}
        />
        <InputField
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          labelText="Password"
          value={loginCredentials.password}
          onChange={handleLoginCredentialInput}
          required={true}
          validation={
            loginCredentials.password.length === 0 ? true : isValidPassword
          }
          showTogglePasswordButton = {true}
        />
        <div className="card-action-btn-container flex-column">
          {/* {error.errorExists && (
            <p className="body-typo-sm invalid-field-color text-bold-weight ">
              {error.errorMessage}
            </p>
          )} */}
          {/* <Button buttonText="Login" onClick={() => loginUser()} /> */}
          <Button
            buttonText="Create new account"
            buttonStyle="secondary-button margin-top-0"
            // icon="fas fa-chevron-right"
            // onClick={() => setAuthType("signup")}
          />
          <Button
            buttonText="Login with test credenials"
            buttonStyle="secondary-button body-typo-md margin-top-0"
            // icon="fas fa-chevron-right"
            onClick={() => setLoginCredentials({email:"adarshbalika@gmail.com",password:"adarshBalika123"})}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
