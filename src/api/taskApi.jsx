import axios from "axios";
const apiURL = "http://localhost:3002";

export async function getTaskList() {
  const url = `${apiURL}/task`;
  try {
    const tasks = await axios.get(url);
    return tasks.data;
  } catch (err) {
    throw err;
  }
}
export async function AddTask(task) {
  const url = `${apiURL}/task`;
  try {
    const tasks = await axios.post(url, task);
    return tasks.data;
  } catch (err) {
    throw err;
  }
}
export async function DeleteTask(id) {
  const url = `${apiURL}/task/${id}`;
  try {
    const tasks = await axios.delete(url);
    return tasks.data;
  } catch (err) {
    throw err;
  }
}
export async function EditTask(task) {
  const url = `${apiURL}/task /${task.id}`;
  try {
    const tasks = await axios.put(url, task);
    return tasks.data;
  } catch (err) {
    throw err;
  }
}
