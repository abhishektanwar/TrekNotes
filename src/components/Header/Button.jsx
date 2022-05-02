import React from "react";

const Button = (props) => {
  const { buttonText, buttonStyle, onClick, icon,type } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      class={`margin-trb-16 btn btn-filled-primary ${buttonStyle}`}
    >
      {icon ? <i className={icon}></i> : null}
      {" "}
      {buttonText}
    </button>
  );
};

export default Button;
