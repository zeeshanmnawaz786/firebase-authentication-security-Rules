import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>
        <Link to="/login">Login</Link>
      </h1>
      <h1>
        <Link to="/signup">Sign Up</Link>
      </h1>
    </div>
  );
}

export default Home;
