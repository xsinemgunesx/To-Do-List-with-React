import { useDispatch, useSelector } from "react-redux";
import { DeleteTask, getTaskList } from "./slices/taskSlice";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";
const TaskList = () => {
  const { tasks } = useSelector((state) => state.task); //* task yazınca hata?

  const [openAddPage, setOpenAddPage] = useState(false);
  const [openUpdatePage, setOpenUpdatePage] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addPageOpen = () => {
    setOpenAddPage(true);
    setOpenUpdatePage(false);
  };

  useEffect(() => {
    dispatch(getTaskList());
  }, []);

  const updatePageOpen = (task) => {
    setSelectedTask(task);
    setOpenUpdatePage(true);
    setOpenAddPage(false);
  };

  const handleDelete = (task) => {
    console.log(task, "delete");
    task && dispatch(DeleteTask(task.id));
  };
  console.log(selectedTask);
  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>
          <i class="fa fa-home" aria-hidden="true"></i>
        </button>
      </div>
      {openAddPage && <TaskForm onCancel={() => setOpenAddPage(false)} />}

      {openUpdatePage && (
        <TaskForm
          task={selectedTask}
          onCancel={() => setOpenUpdatePage(false)}
        />
      )}
      <button onClick={() => addPageOpen()}>Add</button>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        {tasks.map((task, index) => (
          <li
            className="list-item"
            style={{ display: "flex", justifyContent: "space-between" }}
            key={index}
          >
            <span>{task.name}</span>
            <button onClick={() => handleDelete(task)}>Delete</button>
            <button onClick={() => updatePageOpen(task)}>Düzenle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TaskList;
