import { createSlice } from "@reduxjs/toolkit";
import caseEnum from "../caseEnum";
import { getUserTaskList as getUserTaskListRequest } from "../api/personApi";
import { CombineAll as CombineAllRequest } from "../api/personApi";
import { DeleteUserTask as DeleteUserTaskRequest } from "../api/personApi";
import { changeUserTaskState as changeUserTaskStateRequest } from "../api/personApi";

const UserTaskBarState = {
  persons: [],
};
const userTaskBarSlice = createSlice({
  name: "person",
  initialState: UserTaskBarState,
  reducers: {
    getUserTask: (state, { payload }) => {
      state.persons = payload;
    },
    combineAll: (state, { payload }) => {
      const combineAll = {
        id: payload.id,
        userId: payload.userId,
        taskId: payload.taskId,
        durum: caseEnum.Wait,
      };
      state.persons.push(payload);
    },
    deleteUserTask: (state, { payload }) => {
      // const deletedTask = {
      //   userId: payload.userId,
      //   taskId: payload.taskId,
      //   durum: caseEnum.Delete,
      // };

      state.persons.splice(
        state.persons.findIndex((person) => person.id === payload),
        1
      );
    },
    changeUserTaskState: (state, { payload }) => {
      // state.persons.filter((person) =>(person.id ==))
      console.log(payload);
      const caseUserTask = {
        id: payload.id,
        userId: payload.userId,
        taskId: payload.taskId,
        durum: payload.durum,
      };
      state.persons = state.persons.map((person) =>
        person.id !== caseUserTask.id ? person : caseUserTask
      );
    },
  },
});
export const { getUserTask, combineAll, deleteUserTask, changeUserTaskState } =
  userTaskBarSlice.actions;
export default userTaskBarSlice.reducer;

export const getUserTaskList = (person) => async (dispatch) => {
  try {
    const response = await getUserTaskListRequest(person);
    dispatch(getUserTask(response));
  } catch (err) {
    console.log(err);
  }
};
export const CombineAll = (person) => async (dispatch) => {
  try {
    const response = await CombineAllRequest(person);
    dispatch(combineAll(response));
  } catch (err) {
    console.log(err);
  }
};
export const DeleteUserTask = (id) => async (dispatch) => {
  try {
    const response = await DeleteUserTaskRequest(id);
    dispatch(deleteUserTask(id));
  } catch (err) {
    console.log(err);
  }
};
export const ChangeUserTaskState = (person, durum) => async (dispatch) => {
  try {
    const updatedPerson = {
      id: person.id,
      userId: person.userId,
      taskId: person.taskId,
      durum: durum,
    };

    const response = await changeUserTaskStateRequest(updatedPerson);
    dispatch(changeUserTaskState(updatedPerson));
  } catch (err) {
    console.log(err);
  }
};
