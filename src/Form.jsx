import React from "react";
import Form from "./Form";
const Form = () => {
  return (
    <form>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};
export default Form;
