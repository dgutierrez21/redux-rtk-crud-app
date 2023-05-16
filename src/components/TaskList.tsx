import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteTask } from "../store/slices/tasks/tasksSlice";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <>
      {tasks.map(({ id, title, description }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={() => handleDelete(id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default TaskList;
