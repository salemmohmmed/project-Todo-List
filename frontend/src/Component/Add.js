import React,{useState} from "react";

export default function Add(props) {
  const [newTitle, setnewTitle] = useState('');
 
  const createNewTodo=()=>{
     console.log(" create New Todo fom Add ")
    props.createfunc({title:newTitle ,isCompleted:false})
    }
 
  return (
    <div className="Add">
      <input
        type="text"
        placeholder="write new title here"
        onChange={(e) => {
          setnewTitle(e.target.value);
        }}
      />
      <button onClick={createNewTodo}>create New Todo </button>
    </div>
  );
}
