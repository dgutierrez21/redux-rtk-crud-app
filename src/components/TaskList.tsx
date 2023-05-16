import { useSelector } from "react-redux";
import { RootState } from "../store";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <>
      {tasks.map(({ id, title, description }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </>
  );
};

export default TaskList;
