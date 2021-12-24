import React from 'react'

export default function Todo(props) {
    const {_id,
        title,
    isCompleted
    }=props.task
    return (
        <div className='Todo'>
            <p>TITLE:{title}</p>
            <p>ID:{_id}</p>
            <p>IS COMPLETED :{isCompleted} </p>
            
        </div>
    )
}
