import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setemail] = useState("salemdoba@hotmail.com");
  const [password, setpassword] = useState("123");
  const [username, setusername] = useState("salemdoba");

  const registerFnc = (e) => {
    e.preventDefault();
    console.log("reg");
    const newUser = {
      email,
      password,
      username,
    };
    
    axios
      .post(`http://localhost:5000/username/register`, newUser)
      .then((response) => {
        console.log("DATA: ", response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };
  return (
    <div className="Register">
      <form action="">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="write email here ..."
          onChange={(e) => {
            setemail(e.target.value);
          }}
          value={email}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="write password here ..."
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          value={password}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="write username here ..."
          onChange={(e) => {
            setusername(e.target.value);
          }}
          value={username}
        />
        <br />
        <input type="submit" value="Register" onClick={registerFnc} />
      </form>
      <Link to="/login"> if you have accunt ? </Link>
    </div>
  );
}
