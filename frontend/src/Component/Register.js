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
      <center>
        <form className="log2" action="">
          <div className="form-floating mb-3">
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
              type="email"
              class="form-control"
            />
            <label htmlFor="email" for="floatingInput">
              Email address
            </label>
          </div>

          <div class="form-floating mb-3">
            <input
              onChange={(e) => {
                setusername(e.target.value);
              }}
              value={username}
              type="text"
              className="form-control"
            />
            <label htmlFor="" for="floatingInput">
              Username
            </label>
          </div>

          <div class="form-floating">
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
              type="password"
              className="form-control"
            />
            <label htmlFor="password">Password</label>
          </div>

          <input
            id="log1"
            className="btn btn-primary"
            type="submit"
            value="Register"
            onClick={registerFnc}
          />
        </form>
        <Link to="/login"> if you have accunt ? </Link>
      </center>
    </div>
  );
}
