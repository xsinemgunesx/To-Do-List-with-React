import { createSlice } from "@reduxjs/toolkit";
import { getUserList as getUserListRequest } from "../api/userApi";
import { AddUser as AddUserRequest } from "../api/userApi";
import { DeleteUser as DeleteUserRequest } from "../api/userApi";
import { EditUser as EditUserRequest } from "../api/userApi";
const UserState = {
  users: [],
  editInputVisible: false,
};

const users = createSlice({
  name: "users",
  initialState: UserState,
  reducers: {
    getUser: (state, { payload }) => {
      state.users = payload;
    },
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    deleteUser: (state, { payload }) => {
      const userId = payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    editUser: (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.id === payload.id) return payload;
        return user;
      });
    },
  },
});

export const {
  getUser,
  addUser,
  deleteUser,
  editName,
  editInputVisible,
  editUser,
} = users.actions;

export default users.reducer;

export const getUserList = (user) => async (dispatch) => {
  try {
    const response = await getUserListRequest(user);
    dispatch(getUser(response));
  } catch (err) {
    console.log(err);
  }
};
export const AddUser = (user) => async (dispatch) => {
  try {
    const response = await AddUserRequest(user);
    dispatch(addUser(response));
  } catch (err) {
    console.log(err);
  }
};
export const DeleteUser = (id) => async (dispatch) => {
  try {
    let response = await DeleteUserRequest(id);
    dispatch(deleteUser(id)); //id vermek gerekiyor
  } catch (err) {
    console.log(err);
  }
};
export const EditUser = (user) => async (dispatch) => {
  try {
    const response = await EditUserRequest(user);
    dispatch(editUser(response));
  } catch (err) {
    console.log(err);
  }
};
