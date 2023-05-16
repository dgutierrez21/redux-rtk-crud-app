import { ChangeEvent, FormEvent, useState } from "react";
import { TaskState, addTask } from "../store/slices/tasks/tasksSlice";
import { useDispatch } from "react-redux";

const TaskForm = () => {
  const dispatch = useDispatch();

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

    dispatch(addTask(task));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="description"
        onChange={handleChange}
      ></textarea>

      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
