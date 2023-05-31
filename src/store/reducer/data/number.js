import { cloneDeep } from 'lodash';
import { DATA_ADD_NUMBER, DATA_MINUS_NUMBER } from '../../type';

export const dataAddNumberAction = payload => ({
  type: DATA_ADD_NUMBER,
  payload: payload,
});

export const dataMinusNumberAction = payload => ({
  type: DATA_MINUS_NUMBER,
  payload: payload,
});

const defaultState = {
  a: 10000,
};

export default function numberReducer(state = defaultState, action) {
  const { type, payload } = action;
  state = cloneDeep(state);
  switch (type) {
    case DATA_ADD_NUMBER:
      state.a += payload;
      return state;
    case DATA_MINUS_NUMBER:
      state.a -= payload;
      return state;
    default:
      return state;
  }
};
