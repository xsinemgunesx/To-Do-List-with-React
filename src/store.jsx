import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/taskSlice";
import userTaskBarReducer from "./slices/userTaskBarSlice";

const combinedReducer = combineReducers({
  user: userReducer,
  task: taskReducer, //usertask eksik
  person: userTaskBarReducer,
});

const store = configureStore({
  reducer: combinedReducer,
});

export default store;
