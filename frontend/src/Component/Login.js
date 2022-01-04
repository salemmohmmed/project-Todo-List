import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [email, setemail] = useState("salem.binmohmmed@hotmail.com");
  const [password, setpassword] = useState("241424");
  const [loginStatus, setLoginStatus] = useState(0);
  const [loginMessage, setLoginMessage] = useState("");

  const Loginfnc = (e) => {
    e.preventDefault();
    const userinfo = {
      email,
      password,
    };
    axios
      .post(`http://localhost:5000/username/login`, userinfo)
      .then((response) => {
        setLoginStatus(response.status);
        setLoginMessage(response.data.message);
        // console.log("DATA: ", response.data);
        props.setisLoggedIn(true);
        props.setusername(response.data.username);
      })
      .catch((err) => {
        // console.log("ERR: ", err);
        setLoginStatus(err.response.status);
        setLoginMessage(err.response.data.message);
        props.setIsLoggedIn(false);
        props.setUsername(null);
      });
  };

  return (
    <div className="Login">
      <center>
        <form className="log2" action="">
          <div className="form-floating mb-3">
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
            />
            <label htmlFor="" for="floatingInput">
              Email address
            </label>
          </div>

          <div className="form-floating">
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <label htmlFor="">Password</label>
          </div>

          {loginStatus === 200 && (
          <div class="alert alert-success text-center" role="alert">
            {loginMessage}
          </div>
        )}

        {(loginStatus === 400 || loginStatus === 404) && (
          <div class="alert alert-danger text-center" role="alert">
            {loginMessage}
          </div>
        )}



          <input
            id="log1"
            className="btn btn-primary"
            type="submit"
            value="Login"
            onClick={Loginfnc}
          />
        </form>
        <Link to="/Register"> Don't Have An Account? </Link>
      </center>
    </div>
  );
}

// className="btn btn-primary"
