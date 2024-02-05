import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = () => {
    actions.login(email, password);
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    actions.logout();
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      navigate("/");
    }
  }, [store.token, navigate]);

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      {token && token != "" && token != undefined ? (
        "You are logged in with this token" + token
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>Login</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};
