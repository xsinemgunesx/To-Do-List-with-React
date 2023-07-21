import "./App.css";
import RouteComponent from "./RouteComponent";
import TaskList from "./TaskList";
import UserList from "./UserList";
import UserTaskList from "./UserTaskList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="container">
      <div className="app-wrapper">
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            paddingRight: "12rem",
            paddingLeft: "12rem",
          }}
        > */}
        <center>
          <header>
            <h1>TO-DO LIST</h1>
          </header>
        </center>
        <div>
          <ul>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RouteComponent />} />
                <Route path="/userTask" element={<UserTaskList />} />
                <Route path="/task" element={<TaskList />} />
                <Route path="/user" element={<UserList />} />
              </Routes>
            </BrowserRouter>
          </ul>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default App;
