import React from "react";
import "./button-atom.css";

function ButtonAtom(props) {
  const { text, onClick } = props;
  return <button onClick={onClick}>{text}</button>;
}

export default ButtonAtom;
