import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = async () => {
    const result = await actions.register(email, password);
    if (result.success) {
      setEmail("");
      setPassword("");

      alert("Registration was successful! Please login to continue.");

      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      navigate("/");
    }
  }, [store.token, navigate]);

  return (
    <div className="text-center mt-5">
      <h1>Register</h1>
      {token && token !== "" && token !== undefined ? (
        "You are logged in with this token" + token
      ) : (
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>Register</button>
        </div>
      )}
    </div>
  );
};
