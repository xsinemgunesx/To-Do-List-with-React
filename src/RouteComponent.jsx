import React from "react";
import { useNavigate } from "react-router-dom";

const RouteComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <button onClick={() => navigate("/user")}>User</button>
      <button onClick={() => navigate("/task")}>Task</button>
      <button onClick={() => navigate("/userTask")}>User Task</button>
    </div>
  );
};

export default RouteComponent;
