import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./todoSlice";

const store = configureStore({
  reducer: {
    todoData: TodoSlice,
  },
});

export default store;
