import React from "react";

export default function Todo(props) {
  const { _id, title, isCompleted } = props.task;
  return (
    <div className="Todo">
     
      <div style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
      <input type="checkbox" defaultChecked={isCompleted} onClick={()=>{
         props.toggleTodo(_id,!isCompleted)
      }}/>

        {title}
        
        <button onClick={() => {
        props.deleteTodo(_id)
      }}>X</button>
      </div>
      
    </div>
  );
}