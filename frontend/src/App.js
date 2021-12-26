import React,{useState,useEffect} from "react";
import "./App.css";
import axios from "axios";
import Todo from "./Component/Todo";
import Add from "./Component/Add";

export default function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
    getData()
  },[])

  const getData = () => {
    //  من الباك ايند هذا يجيب داتا 
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        // console.log("RESPONSE",response)
        console.log("DATA", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR:", err);
      });
  };
  const postNewTodo=(body)=>{
    axios
    .post("http://localhost:5000/tasks",body)
    .then((response) => {
      // console.log("RESPONSE",response)
      console.log("DATA", response.data);
      getData()
    })
    .catch((err) => {
      console.log("ERR:", err);
    });
  }

  const deleteTodo=(id)=>{
    axios
    .delete(`http://localhost:5000/taskss/${id}`)
    .then((response) => {
      // console.log("RESPONSE",response)
      console.log("DATA", response.data);
      getData()
    })
    .catch((err) => {
      console.log("ERR:", err);
    });
  }
  
  const mapOverTask = tasks.map((taskObj, i) => 
  <Todo key={(i)} task={taskObj} deleteTodo={deleteTodo} ></Todo>);

  return (
    <div className="app">
      <p> App</p>
      <button onClick={getData}> GET tasck </button>
      <Add createfunc={postNewTodo}/>
      {mapOverTask}
    </div>
  );
}
