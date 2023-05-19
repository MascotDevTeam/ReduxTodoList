function TasksList(props) {
  return (
    <div>
      <h2> List of tasks go here. </h2>
      {props.tasks.map((task) => (
        <div>
          <p> {task.title} </p>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
