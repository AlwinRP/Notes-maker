import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { FaRegCircleCheck, FaRegCircle } from "react-icons/fa6";
import { PiTrashSimple } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";

// Base API URL (set dynamically via environment variables)
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://notes-maker-yhb3.onrender.com";

function Home() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newTask, setNewTask] = useState("");

  // Centralized Axios instance
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  useEffect(() => {
    api
      .get("/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const handleToggle = (id) => {
    api
      .put(`/toggle/${id}`)
      .then(() =>
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        )
      )
      .catch((err) => console.error("Error toggling todo:", err));
  };

  const handleDelete = (id) => {
    api
      .delete(`/delete/${id}`)
      .then(() => setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id)))
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleEdit = (id, task) => {
    if (editing === id) {
      setEditing(null);
      setNewTask("");
    } else {
      setEditing(id);
      setNewTask(task);
    }
  };

  const handleKeyDown = (id, event) => {
    if (event.key === "Enter") {
      handleUpdate(id);
    }
  };

  const handleUpdate = (id) => {
    api
      .put(`/update-task/${id}`, { task: newTask })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, task: newTask } : todo
          )
        );
        setEditing(null);
        setNewTask("");
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  return (
    <div className="home">
      <h1>NOTES MAKER</h1>
      <div className="container">
        <div className="title">
          <h2>To Do List</h2>
          <CgNotes id="notes" />
        </div>
        <Create />
        {todos.length === 0 ? (
          <h3>No records!</h3>
        ) : (
          todos.map((todo) => (
            <div className="tasks" key={todo._id}>
              <div className="checkbox">
                <div onClick={() => handleToggle(todo._id)}>
                  {todo.done ? (
                    <FaRegCircleCheck
                      className="icon"
                      onClick={() => handleToggle(todo._id)}
                    />
                  ) : (
                    <FaRegCircle className="icon" />
                  )}
                </div>
                {editing === todo._id ? (
                  <input
                    id="edit-box"
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(todo._id, e)}
                  />
                ) : (
                  <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
                )}
              </div>
              <div>
                <span>
                  <FiEdit2
                    className="icon"
                    onClick={() => handleEdit(todo._id, todo.task)}
                  />
                  <PiTrashSimple
                    className="icon"
                    onClick={() => handleDelete(todo._id)}
                  />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
