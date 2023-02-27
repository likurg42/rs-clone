import { AnyAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface SerializedError {
  name: string;
  statusCode?: number;
}

export const createSerializedError = (e: unknown): SerializedError => {
  if (e instanceof AxiosError) {
    return {
      name: e.name,
      statusCode: e?.response?.status,
    };
  }

  if (e instanceof Error) return { name: e.name };

  return {
    name: 'Unknown Error',
  };
};

export function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
