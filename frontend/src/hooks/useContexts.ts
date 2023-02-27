import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { RootState, useAppDispatch, useAppSelector } from '../slice/store';
import { Context } from '../types/contextType';
import {
  CurrentContextId, FetchContextPayload, fetchContexts, changeCurrentContext,
} from '../slice/contextSlice';

type UseContext = {
  contexts: Context[];
  currentContextId: CurrentContextId;
  fetchContexts: (payload: FetchContextPayload) => void;
  changeCurrentContext: (payload: CurrentContextId) => void;
};

const useContexts = (): UseContext => {
  const dispatch = useAppDispatch();

  const currentContextId = useAppSelector((state: RootState) => state.contexts.currentContextId);

  const actions = useMemo(() => bindActionCreators({
    fetchContexts,
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
