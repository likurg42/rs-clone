import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { RootState, useAppDispatch, useAppSelector } from '../slice/store';
import { Context } from '../types/contextType';
import {
  FetchContextPayload,
  fetchContexts,
  changeCurrentContext,
  createContext,
  updateContext,
  removeContext,
  CreateContextPayload,
  UpdateContextPayload,
  RemoveContextPayload,
} from '../slice/contextSlice';

type UseContext = {
  contexts: Context[];
  currentContextId: number | null;
  fetchContexts: (payload: FetchContextPayload) => void;
  changeCurrentContext: (payload: Context | null) => void;
  createContext: (payload: CreateContextPayload) => void;
  updateContext: (payload: UpdateContextPayload) => void;
  removeContext: (payload: RemoveContextPayload) => void;
};

const useContexts = (): UseContext => {
  const dispatch = useAppDispatch();

  const currentContextId = useAppSelector((state: RootState) => {
    if (state.contexts.currentContext) {
      return state.contexts.currentContext.id;
    }
    return null;
  });

  const actions = useMemo(() => bindActionCreators({
    fetchContexts,
    createContext,
    updateContext,
    removeContext,
    changeCurrentContext,
  }, dispatch), [dispatch]);

  const contexts = useAppSelector((state) => state.contexts.list);

  return {
    contexts,
    currentContextId,
    ...actions,
  };
};

export default useContexts;
