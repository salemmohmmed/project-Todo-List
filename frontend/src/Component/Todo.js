import React from "react";

export default function Todo(props) {
  const { _id, title, isCompleted } = props.task;
  return (
    <div className="Todo">
      <center>
        <div className="ms-3 me-3 ">
          <label class="list-group-item hstack gap-3">
            <input
              className="form-check-input me-1"
              type="checkbox"
              defaultChecked={isCompleted}
              onClick={() => {
                props.toggleTodo(_id, !isCompleted);
              }}
            />

            <span
              style={{ textDecoration: isCompleted ? "line-through" : "none" }}
            >
              {title}
            </span>
            <button className="btn btn-outline-danger"
              onClick={() => {
                props.deleteTodo(_id);
              }}
            >
             <i class="bi bi-x-circle"></i>
            </button>
          </label>
        </div>
      </center>
    </div>
  );
}
