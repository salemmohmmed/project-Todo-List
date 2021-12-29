import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Todo from "./Component/Todo";
import Add from "./Component/Add";
import Register from "./Component/Register";
import Login from "./Component/Login";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [username, setusername] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // should bring data using axios
    // from backend (GET /tasks)
    axios
      .get(`http://localhost:5000/tasks`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const postNewTodo = (body) => {
    // console.log("func postNewTodo from APP");
    // {"title":"task 5","isCompleted": false}
    axios
      .post(`http://localhost:5000/tasks`, body)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        // setTasks(response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      //     (`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const toggleTodo = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const deleteTasks = () => {
    axios
      .delete(`http://localhost:5000/tasks`)
      //     (`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const filterData = (status) => {
    // should bring data using axios
    // from backend (GET /tasks)
    axios
      .get(`http://localhost:5000/filter?isCompleted=${status}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const logoutfnc = ()=>{
    setisLoggedIn(false)
setusername("")

  }

  const mapOverTasks = tasks.map((taskObj, i) => (
    <Todo
      key={taskObj._id}
      task={taskObj}
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
    />
  ));
  return (
    <div className="App">
      <p>app</p>

    <p> Name: {username} </p>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>


    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link className="nav-link active" to="/home"> Home </Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="/login"> Login </Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="/register"> Register </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <br />
      <button onClick={logoutfnc}> LOGOUT</button>
      <Routes>
        <Route
          path="/home"
          element={
            <div className="hom">
              {/* click on button should bring all Data */}
              <button onClick={getData}>GET TASKS</button>
              <button onClick={deleteTasks}>DELETE Completed tasks </button>
              <button
                onClick={() => {
                  filterData(true);
                }}
              >
                GET DONE
              </button>
              <button
                onClick={() => {
                  filterData(false);
                }}
              >
                GET PENDING
              </button>

              <Add createFunc={postNewTodo} />
              {mapOverTasks}
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login setisLoggedIn={setisLoggedIn} setusername={setusername} />
          }
        />
      </Routes>
    </div>
  );
}
