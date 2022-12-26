import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fierbase-auth";
import { useNavigate } from "react-router-dom";

function Login() {
  var [value, setValues] = useState({ email: "", password: "" });
  var [signUpData, setSignUpData] = useState();
  var [err, setErr] = useState("");
  var navigate = useNavigate();

  const submitButton = () => {
    if (!value.email || !value.password) {
      setErr("please fill all fields");
      return;
    }
    setErr("");
    console.log(value);
    setSignUpData(value);
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((res) => {
        console.log(res);

        navigate("/dashboard");
      })

      .catch((err) => {
        setErr(err.message);
        console.log(err);
      });
  };

  return (
    <div>
      Log In
      <br />
      <br />
      <input
        type="email"
        onChange={(event) => {
          setValues((prev) => ({ ...prev, email: event.target.value }));
        }}
        placeholder="Enter Email"
      />
      <br />
      <br />
      <input
        type="password"
        onChange={(event) => {
          setValues((prev) => ({ ...prev, password: event.target.value }));
        }}
        placeholder="Enter Password"
      />
      <br />
      <br />
      {err}
      <br />
      <br />
      <button onClick={submitButton}>Log In</button>
    </div>
  );
}

export default Login;
