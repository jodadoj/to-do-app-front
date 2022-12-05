import { greet } from "./utils/greet";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TaskView from "./utils/TaskView";
import axios from "axios";

const client = axios.create({baseURL: "http://localhost:4000/items"});

/*

how to add todo
need to run info into post function
think we just get the json and recieve it back
with react it's just taking and giving out props

want to be able to enter a date and time

const baseUrl = process.env.NODE_ENV === "production"
	? "your-project.onrender.com"
	: "localhost:4000"

  const [url, setUrl] = useState(""); //can make a state for the url
  //defaults to Games of Thrones and currently displays GoT with no issues

  const [tasks, setTasks] = useState<task[]>([]); //sets state and variable types
  
  const fetchTasks = async () => {
    const response = await fetch(baseUrl); // gets data
    const tasks = await response.json(); //formats as JSON 
    setTasks(tasks); //puts the JSON data as "episodes"
  };
  
  useEffect(() => {
    fetchTasks();
  }); 
*/

const baseUrl = "localhost:4000";

  export interface task{
    id: number;
    name: string;
    complete: boolean;
    date: Date;
 }

function App(): JSX.Element {

  const [url, setUrl] = useState("/items"); //can make a state for the url
  const [tasks, setTasks] = useState<task[]>([]); //sets state and variable types
  
  /*
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:4000/items"); // gets data
    const tasks = await response.json(); //formats as JSON 
    setTasks(tasks); //puts the JSON data as "tasks"
  };
  */

  useEffect(() => {
      client.get('?_limit=10').then((response) => {
         setTasks(response.data);
      });
   }, []);

  const deleteTask = (deletedId:number) => {
    client.delete(`${deletedId}`);
    setTasks(tasks.filter((undeletedTask) => {return undeletedTask.id !== deletedId}));
  } //currently deletes a task but has it reloaded?

  return(
    <div>
      <h1>To-Do List!</h1>
      <AddTodo />
      <div className="list-view">
        <ul>
          {tasks.map((taskItem) => {
          return <>
            <TaskView currentTask={taskItem} key={taskItem.id} />
            return <button onClick={() => deleteTask(taskItem.id)}>Delete</button>
          </>})}
        </ul>
      </div>

      <ul>
        <li>Add todo: just add a name - create / post</li>
        <li>Edit todo: build editing a name - update / put</li>
        <li>Mark todo - another put</li>
        <li>Delete todo - a delete</li>
        <li>sort todo</li>
        <li>set todo due date</li>
        <li>filter overdue todo</li>
      </ul>
    </div>
  );
}

export default App;

function AddTodo():JSX.Element{

  const [name, setName]=useState('');
  const [date, setDate]=useState('');
  const [completed, setCompleted]=useState(false);
  

  return(
    <form>
      <input type="checkbox" id="isComplete" name="isComplete" />
      <label htmlFor="task">Task:</label><br />
      <input type="text" id="task" name="task" /><br />
      <label htmlFor="dueDate">Due by:</label><br />
      <input type="date" id="dueDate" name="dueDate" />
      <label htmlFor="dueTime">At :</label><br />
      <input type="time" id="dueTime" name="dueTime" />
  </form> 
  // may have to add another function to split these two inputs into one string
  )
}

