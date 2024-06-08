import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from 'axios'
import { BsTrashFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { FaRegCircleCheck,FaRegCircle } from "react-icons/fa6";
import { PiTrashSimple } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";



function Home() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [isActive, setActive] = useState("false");

  useEffect(() =>{
    axios.get('http://localhost:3001/get')
    .then(result =>setTodos(result.data))
    .catch(err => console.log(err))
  },[])

  const handleToggle = (id) =>{
    axios.put('http://localhost:3001/toggle/'+id)
    .then(result => setTodos(todos.map(todo => todo._id === id ? { ...todo, done: !todo.done } : todo)))
    .catch(err => console.log(err))
  }

  const handleDelete=(id)=>{
    axios.delete('http://localhost:3001/delete/'+id)
    .then(result =>{
      setTodos(todos.filter(todo => todo._id !== id));})
    .catch(err => console.log(err))
  }
  
  
  const handleEdit = (id, task) => {
    if (editing === id) {
      setEditing(null);
      setNewTask("");
    } else {
      setEditing(id);
      setNewTask(task);
    }wTask(task);
  }
  ;


  const handleKeyDown = (id, event) => {
    if (event.key === 'Enter') {
      handleUpdate(id);
      
      
    }
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:3001/update-task/${id}`, { task: newTask })
    .then(result => setTodos(todos.map(todo => todo._id === id ? { ...todo, done: !todo.done } : todo)))
      .then(result => {
        setTodos(todos.map(todo => todo._id === id ? { ...todo, task: newTask } : todo));
        

        setEditing(null);
        setNewTask("");
        handleToggle(id);
        
      })
      .catch(err => console.log(err));
  };

  

  return (
    <body>
    <div className="home">
    <h1>NOTES MAKER</h1>

    <div className="container">
      <div className="title">
      <h2>To do list </h2><CgNotes id="notes" /></div>
      <Create  />
      {todos.length == 0 ? (
        <h3>No records !!</h3>
      ) : (
        
        todos.map((todo) => //to get the tasks and iterate them
        
        <div className="tasks">
          
          <div className="checkbox" >
            <div onClick={() => handleToggle(todo._id)}>
            {todo.done ? <FaRegCircleCheck className="icon"onClick={() => handleToggle(todo._id)}/>
            : <FaRegCircle className="icon"/> }</div>
            
            {editing === todo._id?(<input id="edit-box"
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(todo._id, e)}
                  
                />):(<p className={todo.done?"line-through":""}>{todo.task}</p>) 

            }
            
          </div>
          
          <div><span>
            <FiEdit2 className="icon" onClick={() =>handleEdit(todo._id,todo.task)} />
            <PiTrashSimple className="icon " //delete tasks
          onClick={()=>handleDelete(todo._id)}/></span></div>

          </div>
          )
      )}
      </div>
    </div>
    </body>
  );
}
export default Home;
