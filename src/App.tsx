import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskList />,
  },
  {
    path: "create-task",
    element: <TaskForm />,
  },
  {
    path: "edit-task/:id",
    element: <TaskForm />,
  },
]);

function App() {
  return (
    <div className="h-screen bg-zinc-900 text-white">
      <div className="flex h-full items-center justify-center">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
