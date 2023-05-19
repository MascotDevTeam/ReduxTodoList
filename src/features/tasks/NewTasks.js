import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, getAllTasks } from "../../redux/tasksSlice";
import "./task.css";

function NewTasks() {
  const dispatch = useDispatch();
  //set default state for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newTask, setNewTask] = useState();

  // dispatch(addNewTask("TESTING"));

  function clearFields() {
    setTitle("");
    setDescription("");
    setCategory("");
    document.getElementById("newTaskForm").reset();
  }

  function addTaskToDb() {
    const newTask = {
      title,
      description,
      category,
      status: false,
    };
    dispatch(addNewTask(newTask));
    clearFields();

    dispatch(getAllTasks());
  }

  return (
    <div>
      <form
        id="newTaskForm"
        onSubmit={(e) => {
          e.preventDefault();
          addTaskToDb();
        }}
      >
        <div id="form-inputs">
          <div id="title-input">
            <label> Title: </label> <br />
            <input
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            ></input>
          </div>
          <div id="description-input">
            <label> Enter Task description: </label>
            <br />
            <input
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            ></input>
          </div>
          <div id="category-input">
            <label> Enter Task category: </label> <br />
            <input
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            ></input>
          </div>
          <div id="submit-btn">
            <br />
            <button type="submit">Create Task</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewTasks;
