import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addNewTask, getAllTasks } from "./redux/tasksSlice";
import TasksList from "./features/tasks/TasksList";
import NewTasks from "./features/tasks/NewTasks";

export default function App() {
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasksState);
  const tasks = tasksState.tasks;

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  console.log(tasksState);

  return (
    <div className="App">
      <NewTasks />
      <TasksList tasks={tasks} />
    </div>
  );
}
