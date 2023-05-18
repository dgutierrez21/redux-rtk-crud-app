import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteTask } from "../store/slices/tasks/tasksSlice";

import { Link } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <header>
        <h1>Tasks {tasks.length}</h1>
        <Link to="/create-task">Create Task</Link>
      </header>

      {tasks.map(({ id, title, description }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={() => handleDelete(id)}>delete</button>

          <Link to={`edit-task/${id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
