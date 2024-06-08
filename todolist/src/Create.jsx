import React,{useState} from "react"
import axios from 'axios'


function Create(){
    const [task, setTask]=useState("")
    const handleAdd=() =>{
        axios.post('http://localhost:3001/add',{task:task})
        .then(result => location.reload())  // Add the new task to the state in Home
        .catch(err => console.log('error found',err))

    }
    return(
        <div className="input_text">
        <input  type="text" placeholder="Enter Task"  onChange={(e) =>setTask(e.target.value)}/>
        <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )

}

export default Create;