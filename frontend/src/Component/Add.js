import React, { useState } from "react";

export default function Add(props) {
  const [newTitle, setNewTitle] = useState("");

  const createNewTodo = () => {
    //
    console.log("createNewTodo from ADD");
    // {"title":"task 5","isCompleted": false}
    props.createFunc({title: newTitle, isCompleted:false});
  };

  return (
    <div className="Add">
<center>
<nav class="navbar navbar-light bg-light">

  <div class="container-fluid">
    <form class="d-flex">
      <input className="form-control me-2" type="text" placeholder="Add your Tasck here..." aria-label="Add your item here..."
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
      />

<button type="button" className="btn btn-outline-success" onClick={createNewTodo}>Add</button>
    </form>
  </div>
</nav>





</center>

  
  



  
     
     
    </div>
  );
}