import React from "react";

export interface ButtonTypes{
  buttonText:string
  buttonStyle?:string
  onClick:()=>void
  icon?:string
  type?:"button" | "submit" | "reset"
}
const Button:React.FC<ButtonTypes> = (props) => {
  const { buttonText, buttonStyle, onClick, icon,type} = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`margin-trb-16 btn btn-filled-primary ${buttonStyle}`}
    >
      {icon ? <i className={icon}></i> : null}
      {" "}
      {buttonText}
    </button>
  );
};

export default Button;
