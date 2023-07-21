import { createSlice } from "@reduxjs/toolkit";
import { getTaskList as getTaskListRequest } from "../api/taskApi";
import { AddTask as AddTaskRequest } from "../api/taskApi";
import { DeleteTask as DeleteTaskRequest } from "../api/taskApi";
import { EditTask as EditTaskRequest } from "../api/taskApi";

const TaskState = {
  tasks: [],
  editInputVisible: false,
};
const taskSlice = createSlice({
  name: "task",
  initialState: TaskState,

  reducers: {
    getTask: (state, { payload }) => {
      state.tasks = payload;
    },
    addTask: (state, { payload }) => {
      state.tasks.push(payload);
    },
    deleteTask: (state, { payload }) => {
      const taskId = payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    editTask: (state, action) => {
      state.tasks.splice(0, action.payload);
    },
  },
});
export const { addTask, deleteTask, editTask, editInputVisible, getTask } =
  taskSlice.actions;
export default taskSlice.reducer;

export const getTaskList = (user) => async (dispatch) => {
  try {
    const response = await getTaskListRequest(user);
    dispatch(getTask(response));
  } catch (err) {
    console.log(err);
  }
};
export const AddTask = (user) => async (dispatch) => {
  try {
    const response = await AddTaskRequest(user);
    dispatch(addTask(response));
  } catch (err) {
    console.log(err);
  }
};
export const DeleteTask = (id) => async (dispatch) => {
  try {
    const response = await DeleteTaskRequest(id);
    dispatch(deleteTask(id));
  } catch (err) {
    console.log(err);
  }
};
export const EditTask = (id, task) => async (dispatch) => {
  try {
    const response = await EditTaskRequest(id, task);
    dispatch(editTask(response));
  } catch (err) {
    console.log(err);
  }
};
