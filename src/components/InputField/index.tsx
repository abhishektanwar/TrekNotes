import React, { useState } from "react";
import "./input.css";

type inputFieldTextType = "email" | "text" | "password";
export interface InputFieldProps {
  parentClass?:string
  type:inputFieldTextType
  name:string
  id:string
  placeholder:string
  labelText:string
  onChange : (e:any) => void
  value:string
  labelClass?:string
  required:boolean ,
  validation:boolean,
  showTogglePasswordButton?:boolean,
}
const InputField: React.FC<InputFieldProps> = ({
  parentClass,
  type,
  name,
  id,
  placeholder,
  labelText,
  onChange,
  value,
  labelClass,
  required,
  validation,
  showTogglePasswordButton,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={`flex-column form-field-container ${parentClass}`}
      style={{ position: "relative" }}
    >
      <label
        className={`input-label ${labelClass} ${
          !validation ? "invalid-field-color" : ""
        }`}
      >
        {labelText}
      </label>
      <input
        className={`form-field ${!validation ? "invalid-field-border" : ""}`}
        type={showTogglePasswordButton && showPassword ? "text" : type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required ?? false}
      />
      {showTogglePasswordButton ? (
        <span
          role="button"
          className="toggle-password-button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <i className="far fa-eye" style={{ fontSize: "1.6rem" }}></i>
          ) : (
            <i className="far fa-eye-slash" style={{ fontSize: "1.6rem" }}></i>
          )}
        </span>
      ) : null}
    </div>
  );
};

export default InputField;
