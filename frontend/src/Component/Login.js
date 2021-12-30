import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [email, setemail] = useState("salem.binmohmmed@hotmail.com");
  const [password, setpassword] = useState("241424");
  const [longin, setlongin] = useState(null)

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
        props.setisLoggedIn(true);
        props.setusername(response.data.username);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  return (
    <div className="Login">
      <center>
        <form className="log2" action="">
          <div class="form-floating mb-3">
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              class="form-control"
              placeholder="name@example.com"
              value={email}
            />
            <label htmlFor="" for="floatingInput">
              Email address
            </label>
          </div>

          <div class="form-floating">
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
              type="password"
              class="form-control"
              placeholder="Password"
            />
            <label htmlFor="">Password</label>
          </div>

          <input
            id="log1"
            className="btn btn-primary"
            type="submit"
            value="Login"
            onClick={Loginfnc}
          />
        </form>
        <Link to="/Register"> if you don't have accunt ? </Link>
      </center>
    </div>
  );
}

// className="btn btn-primary"
