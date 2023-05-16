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
    },
  },
});

export const { addTask } = tasksSlice.actions;
