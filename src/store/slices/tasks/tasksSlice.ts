import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem("tasks");
    if (tasks === null) return [];

    return JSON.parse(tasks);
  } catch (err) {
    return undefined;
  }
};

const initialState: TaskState[] = loadTasks();

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
      // 3
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

// 3. la función deleteTask devuelve un nuevo arreglo en lugar de asignar el nuevo arreglo al estado porque es importante no mutar el estado original. Mutar el estado puede hacer que comparaciones entre el estado anterior y el nuevo sean problemáticas, lo que puede afectar el rendimiento y la capacidad de deshacer y rehacer en la aplicación. Además, mutar el estado original directamente es una mala práctica en Redux. En su lugar, se deben utilizar métodos inmutables como Array.slice en lugar de Array.splice. En este caso específico, deleteTask utiliza el método Array.filter para devolver un nuevo arreglo que contiene todos los elementos excepto el que se desea eliminar. Al hacer esto, se devuelve un nuevo arreglo en lugar de mutar el arreglo original.
