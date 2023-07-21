import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CombineAll,
  ChangeUserTaskState,
  getUserTaskList,
} from "./slices/userTaskBarSlice";
import caseEnum from "./caseEnum";
import { useNavigate } from "react-router-dom";
import { getTaskList } from "./slices/taskSlice";
import { getUserList } from "./slices/userSlice";

const UserTaskList = (props) => {
  const { tasks } = useSelector((state) => state.task);
  const { users } = useSelector((state) => state.user);
  const { persons } = useSelector((state) => state.person);
  const [todo, setTodo] = useState({ userId: 0, taskId: 0 });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUserTaskListAddUser = (e) => {
    console.log(e?.target.value);
    setTodo({ ...todo, userId: e?.target.value });
  };
  const handleUserTaskListAddTask = (e) => {
    setTodo({ ...todo, taskId: e?.target.value });
  };

  const handleAddSlice = () => {
    const person2 = persons.find(
      (person) => person.userId === todo.userId && person.taskId === todo.taskId
    );
    if (!person2) {
      console.log("girdi");
      dispatch(CombineAll(todo));
    }
  };

  const handleChangeTaskState = (person, durum) => {
    person && dispatch(ChangeUserTaskState(person, durum));
  };

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getTaskList());
    dispatch(getUserTaskList());
  }, []);

  console.log(persons);

  return (
    // <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
    <div>
      <div>
        <button onClick={() => navigate(-1)}>
          <i class="fa fa-home" aria-hidden="true"></i>
        </button>
      </div>
      <center style={{ margin: "3rem", padding: 10 }}>
        <label>Kullanıcı seçiniz : </label>

        <select name="userName" onChange={(e) => handleUserTaskListAddUser(e)}>
          <option>Seçiniz</option>
          {users.map((user, index) => {
            return (
              <option value={user.id} key={index}>
                {user.name}
              </option>
            );
          })}
        </select>
      </center>
      {/* {user.id === 1 ? user.name : ""} değişen button yapımı  */}
      <center>
        <label>Yapılacakları seçiniz : </label>
        <select name="tasksName" onChange={(e) => handleUserTaskListAddTask(e)}>
          <option>Seçiniz</option>
          {tasks.map((task, index) => {
            return (
              <option value={task.id} key={index}>
                {task.name}
              </option>
            );
          })}
        </select>
      </center>
      {/* style={{
      //////DÜZELTTT
      backgroundColor:
        person.durum == caseEnum.Delay ? "yellow" : "transparent",
    }} */}

      <center style={{ margin: "1rem" }}>
        <button className="new-task-button" onClick={handleAddSlice}>
          <span>Ekle</span>
        </button>
      </center>
      {/* <style>
  #satir {
    backgroundColor =
    person.durum == caseEnum.Delay ? "yellow" : "transparent",
  }
 </style> */}
      <center style={{ margin: "4rem" }}>
        <table className="userTask-table">
          {persons.map((person, index) => (
            <tr key={index} className="list-item" style>
              <td>
                {persons.find((durum) => durum.id == person.payload.id)?.durum}
              </td>
              <td style={{ display: "flex", flexGrow: 1, padding: 10 }}>
                <div style={{ display: "flex", flexGrow: 1 }} id="users">
                  <div class="user">
                    <div class="content">
                      <label className="list">
                        {users.find((user) => user.id == person.userId)?.name}
                      </label>
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ display: "flex", flexGrow: 1, padding: 10 }}>
                <div style={{ display: "flex", flexGrow: 1 }} id="tasks">
                  <div class="user">
                    <div class="content">
                      <label className="list" style={{ padding: 80 }}>
                        {tasks.find((task) => task.id === person.taskId)?.name}
                      </label>
                    </div>
                  </div>
                </div>
              </td>

              <td>
                <button
                  className="Check task-input"
                  onClick={() => handleChangeTaskState(person, caseEnum.Okay)}
                >
                  <i className="fa fa-check-circle"></i>
                </button>

                <button
                  className="delete task-input"
                  onClick={() => handleChangeTaskState(person, caseEnum.Delete)}
                >
                  <i className="fa fa-trash"></i>
                </button>

                <button
                  className="delay"
                  onClick={() => handleChangeTaskState(person, caseEnum.Delay)}
                >
                  Ertele
                </button>
              </td>
            </tr>
          ))}
        </table>
      </center>
    </div>
  );
};

export default UserTaskList;
