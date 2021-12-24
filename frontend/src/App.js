import React,{useState,useEffect} from "react";
import "./App.css";
import axios from "axios";
import Todo from "./Component/Todo";

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
  
  const mapOverTask = tasks.map((taskObj, i) => <Todo key={(i)} task={taskObj}></Todo>);

  return (
    <div className="app">
      <p> App</p>
      <button onClick={getData}> GET tasck </button>
      {mapOverTask}
    </div>
  );
}
