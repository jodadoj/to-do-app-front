import { task } from "../App"
import axios from "axios";

const client = axios.create({baseURL: "http://localhost:4000/items"});
interface TaskViewProps {
    currentTask: task;
}

function TaskView(props: TaskViewProps): JSX.Element {
    const idString = String(props.currentTask.id);
  return (
    <div>
      <div>
        <p>
        <div>
            <input type="checkbox" id={idString} checked={isComplete(props.currentTask.complete)}/>
            <label htmlFor="checkbox"> {props.currentTask.name} </label>
        </div>
          
          
        </p>
      </div>
    </div>
  );
}

function isComplete(complete:boolean):boolean{
    return complete;
}


export default TaskView