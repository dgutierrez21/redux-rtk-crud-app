import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TaskState, addTask, editTask } from "../store/slices/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store";

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [task, setTask] = useState<TaskState>({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask({ ...task, id: uuidv4() }));
    }

    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => task.id === id);

      if (task) setTask(task);
    }
  }, [id, tasks]);

  return (
    <form onSubmit={handleSubmit} className="max-w-sm bg-zinc-800 p-4">
      <label htmlFor="title" className="text-md block font-bold">
        Title:
      </label>
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={handleChange}
        value={task.title}
        className="mb-2 mt-1 w-full rounded-md bg-zinc-600 p-2"
      />

      <label htmlFor="description" className="text-md block font-bold">
        Description:
      </label>

      <textarea
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={task.description}
        className="mb-2 mt-1 w-full rounded-md bg-zinc-600 p-2"
        style={{ resize: "none" }}
      ></textarea>

      <button type="submit" className="rounded-md bg-indigo-600 px-2 py-1">
        Save
      </button>
    </form>
  );
};

export default TaskForm;
