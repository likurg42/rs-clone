import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import todoReducer from './todoSlice';
import projectReducer from './projectSlice';
import contextReducer from './contextSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    projects: projectReducer,
    contexts: contextReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
