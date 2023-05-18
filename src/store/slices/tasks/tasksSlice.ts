import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const initialState: TaskState[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Task 1 description",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Task 2 description",
    completed: false,
  },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskState>) => {
      state.push(action.payload);
      // 2
    },
    deleteTask: (state, { payload }: PayloadAction<string>) => {
      return state.filter((task) => task.id !== payload);
    },
    editTask: (state, { payload }: PayloadAction<TaskState>) => {
      const { id, title, description } = payload;

      const foundTask = state.find((task) => task.id === id);

      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
        // 1
      }
    },
  },
});

export const { addTask, deleteTask, editTask } = tasksSlice.actions;

// 1. el objeto foundTask se modifica en su sitio actualizando sus campos title y description. Dado que el objeto foundTask es una referencia a un objeto en la matriz de estados, los cambios realizados en el objeto foundTask también modifican el objeto de tarea correspondiente en la matriz de estados. Cuando la función editTask modifica el objeto foundTask y no devuelve nada, Redux detecta que el objeto de estado ha sido modificado y activa una nueva renderización de la interfaz de usuario.

// 2. En la función addTask, se utiliza el método push para agregar una nueva tarea al array de tareas en el estado actual. A pesar de que push modifica el array existente, en realidad se está agregando un nuevo elemento al final del array. Como resultado, se está creando una copia del array de tareas, agregando la nueva tarea a la copia y devolviendo la copia actualizada como nuevo estado. Es importante tener en cuenta que, aunque push modifica el array existente, no se está modificando el estado actual directamente.
