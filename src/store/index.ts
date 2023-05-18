import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./slices/tasks/tasksSlice";

const saveToLocalStorage = (key: string, value: unknown) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log(error);
  }
};

const tasksListener = () => {
  const state = store.getState().tasks;
  saveToLocalStorage("tasks", state);
};

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

store.subscribe(tasksListener);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
