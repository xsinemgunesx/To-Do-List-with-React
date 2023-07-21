import { useDispatch, useSelector } from "react-redux";
import { EditUser, editInputVisible, AddUser } from "./slices/userSlice";

import { uniqueId } from "lodash";
import { useState } from "react";

const UserForm = (props) => {
  const _ = require("lodash");
  console.log(props?.user);

  const [newUser, setNewUser] = useState({
    //id ve isim tanımlamları ve isim düzenleme UUserForm'da yapıldı.
    id: props?.user?.id ?? _.uniqueId(),
    name: props?.user?.name ?? "",
  });

  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const dispatch = useDispatch();

  const handleOnClick = (user) => {
    if (user.name !== "") {
      props?.user ? dispatch(EditUser(user)) : dispatch(AddUser(user)); //bu şekilde girdiklerimiz state'e kaydoluyor.
      props.onCancel();
    } else {
      setError({ show: true, message: "Kullanıcı Adı boş olamaz" });
    }
  };

  const handleOnChange = (e) => {
    setError({
      show: false,
      message: "",
    });
    setNewUser({ ...newUser, name: e.target.value });
  };

  return (
    <div>
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            value={newUser?.name}
            onChange={(e) => handleOnChange(e)}
            placeholder="Enter your name..."
            id="new-task-input"
          />
          {error.show && (
            <label style={{ color: "red" }}>{error.message}</label>
          )}
        </div>
        <button onClick={() => handleOnClick(newUser)}>Onayla</button>
        <button onClick={() => props?.onCancel()}>Vazgeç</button>
      </>
    </div>
  );
};
export default UserForm;
