import { useDispatch, useSelector } from "react-redux";
import { AddTask, EditTask } from "./slices/taskSlice";
import { uniqueId } from "lodash";
import { useState } from "react";

const TaskForm = (props) => {
  const _ = require("lodash");
  console.log(props?.user);
  const [newTask, setNewTask] = useState({
    id: props?.task?.id ?? _.uniqueId(),
    name: props?.task?.name ?? "",
  });
  const [error, setError] = useState({
    show: false, //hata vermesi için boş eklemesin diye
    message: "",
  });
  const dispatch = useDispatch();
  console.log(newTask);
  const handleOnClick = (task) => {
    if (task.name !== "") {
      props?.task ? dispatch(EditTask(task)) : dispatch(AddTask(task));
      props.onCancel();
    } else {
      setError({ show: true, message: "Task girilmedi." });
    }
  };
  const handleOnChange = (e) => {
    setError({
      show: false,
      message: "",
    });
    setNewTask({ ...newTask, name: e.target.value });
  };

  return (
    <div>
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            value={newTask?.name}
            onChange={(e) => handleOnChange(e)}
            placeholder="What do you have planned?"
            id="new-task-input"
          />
          {error.show && (
            <label style={{ color: "red" }}>{error.message}</label>
          )}
        </div>
        <button onClick={() => handleOnClick(newTask)}>Onayla</button>
        <button onClick={() => props?.onCancel()}>Vazgeç</button>
      </>
    </div>
  );
};
export default TaskForm;
