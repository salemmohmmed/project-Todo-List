import React from 'react';
import './App.css';
import axios from 'axios';

export default  function App() {
const getData =()=>{
  axios
  .get("http://localhost:5000/tasks")
  .then((response)=>{
    // console.log("RESPONSE",response)
    console.log("DATA",response.data)
  })
  .catch((err)=>{
    console.log("ERR:",err)
  })
}


  return (
    <div className="app">
      <p> App</p>
      <button onClick={getData}> GET tasck </button>
    </div>
  );
}


