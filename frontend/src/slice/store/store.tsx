import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../todoSlice';
import projectReducer from '../projectSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    projects: projectReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
