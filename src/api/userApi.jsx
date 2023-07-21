import axios from "axios";
const apiURL = "http://localhost:3002";

export async function getUserList() {
  const url = `${apiURL}/user`;
  try {
    const users = await axios.get(url);
    return users.data;
  } catch (err) {
    throw err;
  }
}
export async function AddUser(user) {
  const url = `${apiURL}/user`;
  try {
    const users = await axios.post(url, user);
    return users.data;
  } catch (err) {
    throw err;
  }
}
export async function DeleteUser(id) {
  const url = `${apiURL}/user/${id}`;
  try {
    const users = await axios.delete(url);
    return users.data;
  } catch (err) {
    throw err;
  }
}
export async function EditUser(user) {
  const url = `${apiURL}/user/${user.id}`; ///***düzeltildi */
  try {
    const users = await axios.put(url, user);
    return users.data;
  } catch (err) {
    throw err;
  }
}
