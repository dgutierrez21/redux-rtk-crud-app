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
    <div className="w-4/6">
      <header className="flex items-center justify-between py-4">
        <h1>Tasks {tasks.length}</h1>
        <Link
          to="/create-task"
          className="rounded-sm bg-indigo-600 px-2 py-1 text-sm"
        >
          Create Task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {tasks.map(({ id, title, description }) => (
          <div key={id} className="rounded-md bg-neutral-800 p-4">
            <header className="flex justify-between">
              <h3>{title}</h3>

              <div className="flex gap-x-2">
                <Link
                  to={`edit-task/${id}`}
                  className="self-center rounded-md bg-zinc-600 px-2 py-1 text-xs"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(id)}
                  className="self-center rounded-md bg-red-500 px-2 py-1 text-xs"
                >
                  delete
                </button>
              </div>
            </header>

            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
