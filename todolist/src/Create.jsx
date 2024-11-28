import React, { useState } from "react";
import axios from "axios";

// Get the API base URL from environment variables or use a default value
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://notes-maker-yhb3.onrender.com";

function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    axios
      .post(`${API_BASE_URL}/add`, { task: task }) // Use the environment-based API URL
      .then(() => {
        // Reload or update the state in Home
        window.location.reload();
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  return (
    <div className="input_text">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
