import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { DeleteUser, getUserList } from "./slices/userSlice";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { users } = useSelector((state) => state.user);
  const [openAddPage, setOpenAddPage] = useState(false);
  const [openUpdatePage, setOpenUpdatePage] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const addPageOpen = () => {
    setOpenAddPage(true);
    setOpenUpdatePage(false);
  };

  const updatePageOpen = (user) => {
    setSelectedUser(user);
    setOpenUpdatePage(true);
    setOpenAddPage(false);
  };
  const handleDelete = (user) => {
    user && dispatch(DeleteUser(user.id));
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>
          <i class="fa fa-home" aria-hidden="true"></i>
        </button>
      </div>
      {openAddPage && <UserForm onCancel={() => setOpenAddPage(false)} />}

      {openUpdatePage && (
        <UserForm
          user={selectedUser}
          onCancel={() => setOpenUpdatePage(false)}
        /> // bu kısmı anlamadım
      )}
      <main>
        <button onClick={() => addPageOpen()}>Add</button>
        <ul>
          {users.map((user, index) => (
            <li
              className="list-item"
              style={{ display: "flex", justifyContent: "space-between" }}
              key={index}
            >
              <span>{user.name}</span>
              <button
                class="button is-primary"
                onClick={() => handleDelete(user)}
              >
                Delete
              </button>
              <button
                class="button is-primary"
                onClick={() => updatePageOpen(user)}
              >
                Düzenle
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
export default UserList;
