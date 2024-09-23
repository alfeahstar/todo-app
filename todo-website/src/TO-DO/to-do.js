import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = (props) => {
    const [toDo, setToDo] = useState(props.initialTasks || []);

    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null); 
    const [editingText, setEditingText] = useState(''); 

    //add task
    const addTask = () => {
        if (newTask) {
            let num = toDo.length ? toDo[toDo.length - 1].id + 1 : 1; 
            let newEntry = { id: num, title: newTask, status: false };
            setToDo([...toDo, newEntry]);
            setNewTask('');
        }
    };

    //enter key to add task
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    //delete task
    const deleteTask = (id) => {
        let newTasks = toDo.filter(task => task.id !== id);
        setToDo(newTasks);
    };

    //mark task as done/undo
    const toggleTaskStatus = (id) => {
        let updatedTasks = toDo.map(task => {
            if (task.id === id) {
                return { ...task, status: !task.status }; 
            }
            return task; 
        });
        setToDo(updatedTasks); 
    };

    //edit to-do
    const editTodo = (index) => {
        setEditingIndex(index);
        setEditingText(toDo[index].title); 
    };

    //save edited to-do
    const saveTodo = (index) => {
        const updatedTodos = [...toDo];
        updatedTodos[index].title = editingText; 
        setToDo(updatedTodos);
        setEditingIndex(null); 
        setEditingText(''); 
    };

    //cancel editing
    const cancelEditing = () => {
        setEditingIndex(null);
        setEditingText('');
    };

return (
    <div className="container App">
     <br /><br />
        <h1>To-Do List</h1>
        <br /><br />

    <div className="row align-items-center">
        <div className="col">
         <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown} 
            className="form-control form-control-lg"
            placeholder="Add a to-do"
        />
    </div>
        <div className="col-auto">
         <button onClick={addTask} className="btn btn-lg btn-custom"> Add To-do </button>   
        </div>
    </div>
        <br/>

    {toDo.length === 0 ? 
        <div className="no-todos">
           No to-dos available. Add a to-do to get started!
        </div>
          : 
          toDo.sort((a, b) => a.id - b.id).map((task, index) => (
            <React.Fragment key={task.id}>
              <div className="taskBg">
                <div>
                <span className="taskNumber">{index + 1}</span>
                 {editingIndex === index ? (
                    <input
                         type="text"
                         value={editingText}
                         onChange={(e) => setEditingText(e.target.value)}
                         className="form-control editing-input"
                      />
                        ) : (
                        <span className={`taskText ${task.status ? 'done' : ''}`}>
                          {task.title}
                        </span>
                        )}
                       </div>
                        <div className="button-container">
                         {editingIndex === index ? (
                            <React.Fragment>
                             <button title="Save To-do" onClick={() => saveTodo(index)} className="btn btn-custom-primary">Save</button>
                             <button title="Cancel Editing" onClick={cancelEditing} className="btn btn-custom-danger">Cancel</button>
                            </React.Fragment>
                            ) : (
                            <React.Fragment>
                            {task.status ? (
                            <button title="Undo To-do" onClick={() => toggleTaskStatus(task.id)}className="btn btn-custom-success">Undo</button>
                            ) : (
                            <button title="Mark Done" onClick={() => toggleTaskStatus(task.id)}className="btn btn-custom-success">Done</button>
                        )}
                            <button title="Edit To-do" onClick={() => editTodo(index)}className="btn btn-custom-primary" disabled={task.status}>Edit </button>
                            <button title="Delete To-do" onClick={() => deleteTask(task.id)}className="btn btn-custom-danger"disabled={task.status}>Delete</button>
                             </React.Fragment>
                        )}
                            </div>
                        </div>
                </React.Fragment>
            ))
         }
     </div>
    );
};

export default Todo;
