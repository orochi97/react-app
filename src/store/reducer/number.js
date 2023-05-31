import { cloneDeep } from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ADD_NUMBER, MINUS_NUMBER } from '../type';

export const addNumberAction = payload => ({
  type: ADD_NUMBER,
  payload: payload,
});

export const minusNumberAction = payload => ({
  type: MINUS_NUMBER,
  payload: payload,
});

export const addNumberThunk = createAsyncThunk(
  ADD_NUMBER,
  async (number) => {
    return new Promise((resolve) => setTimeout(() => resolve(number), 2000));
  },
);

const defaultState = {
  a: 10000,
};

export default function numberReducer(state = defaultState, action) {
  const { type, payload } = action;
  state = cloneDeep(state);
  switch (type) {
    case ADD_NUMBER:
      state.a += payload;
      return state;
    case MINUS_NUMBER:
      state.a -= payload;
      return state;
    case addNumberThunk.fulfilled.toString():
      state.a += payload;
      return state;
    default:
      return state;
  }
};
