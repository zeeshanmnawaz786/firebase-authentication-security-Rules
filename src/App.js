import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { auth } from "./fierbase-auth";
import Dashboard from "./components/Dashboard";

function App() {
  var [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            Home
          </Route>
          <Route path="/signup" element={<Signup />}>
            SignUp
          </Route>
          <Route path="/login" element={<Login />}>
            Login
          </Route>
          <Route path="/dashboard" element={<Dashboard name={userName} />}>
            Dashboard
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
