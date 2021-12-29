import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setemail] = useState("salem.binmohmmed@hotmail.com");
  const [password, setpassword] = useState("241424");

  const Loginfnc = (e) => {
    e.preventDefault();
    const userinfo = {
      email,
      password,
    };
    axios
      .post(`http://localhost:5000/username/login`, userinfo)
      .then((response) => {
        console.log("DATA: ", response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  return (
    <div className="Login">
      <form action="">
        <label htmlFor="">Email:</label>
        <input
          onChange={(e) => {
            setemail(e.target.value);
          }}
          value={email}
          type={"text"}
          placeholder="write your email .."
        />

        <label htmlFor="">Password:</label>
        <input
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          value={password}
          type={"password"}
          placeholder="write your password .."
        />

        <input type="submit" value="Login" onClick={Loginfnc} />
      </form>
    </div>
  );
}