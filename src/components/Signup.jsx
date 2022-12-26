import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../fierbase-auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  var [value, setValues] = useState({ name: "", email: "", password: "" });
  var [signUpData, setSignUpData] = useState();
  var [err, setErr] = useState("");
  var navigate = useNavigate();

  const submitButton = () => {
    if (!value.name || !value.email || !value.password) {
      setErr("please fill all fields");
      return;
    }
    setErr("");
    console.log(value);
    setSignUpData(value);
    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then((res) => {
        const user = res.user;
        console.log(res);
        updateProfile(user, {
          displayName: value.name,
        });
        navigate("/login");
      })

      .catch((err) => {
        setErr(err.message);
        console.log(err);
      });
  };

  return (
    <div>
      Sign Up
      <br />
      <br />
      <input
        type="text"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, name: event.target.value }))
        }
        placeholder="Enter Name"
      />
      <br />
      <br />
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, password: event.target.value }))
        }
      />
      <br />
      <br />
      {err}
      <br />
      <br />
      <button onClick={submitButton}>Submit</button>
    </div>
  );
}

export default Signup;
