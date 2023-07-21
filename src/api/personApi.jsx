import axios from "axios";
const apiURL = "http://localhost:3002";

export async function getUserTaskList() {
  const url = `${apiURL}/person`;
  try {
    const persons = await axios.get(url);
    return persons.data;
  } catch (err) {
    throw err;
  }
}
export async function CombineAll(person) {
  const url = `${apiURL}/person`;
  try {
    const persons = await axios.post(url, person);
    return persons.data;
  } catch (err) {
    throw err;
  }
}
export async function DeleteUserTask(id) {
  const url = `${apiURL}/person/${id}`;
  try {
    const persons = await axios.delete(url);
    return persons.data;
  } catch (err) {
    throw err;
  }
}
export async function changeUserTaskState(person) {
  //?delay?
  const url = `${apiURL}/person/${person.id}`; //tırnak işareti iki objeyi birleştiriyor.
  try {
    const persons = await axios.put(url, person);
    return persons.data;
  } catch (err) {
    throw err;
  }
}
