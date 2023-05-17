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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={handleChange}
        value={task.title}
      />
      <textarea
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={task.description}
      ></textarea>

      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
