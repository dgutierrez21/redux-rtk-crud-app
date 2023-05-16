import { ChangeEvent, FormEvent, useState } from "react";
import { TaskState } from "../store/slices/tasks/tasksSlice";

const TaskForm = () => {
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

    console.log(task);
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
