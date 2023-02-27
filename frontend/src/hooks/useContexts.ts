import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { RootState, useAppDispatch, useAppSelector } from '../slice/store';
import { Context } from '../types/contextType';
import {
  CurrentContextId,
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
  currentContextId: CurrentContextId;
  fetchContexts: (payload: FetchContextPayload) => void;
  changeCurrentContext: (payload: CurrentContextId) => void;
  createContext: (payload: CreateContextPayload) => void;
  updateContext: (payload: UpdateContextPayload) => void;
  removeContext: (payload: RemoveContextPayload) => void;
};

const useContexts = (): UseContext => {
  const dispatch = useAppDispatch();

  const currentContextId = useAppSelector((state: RootState) => state.contexts.currentContextId);

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
