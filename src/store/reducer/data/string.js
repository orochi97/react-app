import { cloneDeep } from 'lodash';
import { DATA_ADD_STRING, DATA_MINUS_STRING } from '../../type';

export const dataAddStringAction = payload => ({
  type: DATA_ADD_STRING,
  payload: payload,
});

export const dataMinusStringAction = payload => ({
  type: DATA_MINUS_STRING,
  payload: payload,
});

const defaultState = {
  b: 'abc',
};

export default function stringReducer(state = defaultState, action) {
  const { type, payload } = action;
  state = cloneDeep(state);
  switch (type) {
    case DATA_ADD_STRING:
      state.b += payload;
      return state;
    case DATA_MINUS_STRING:
      state.b = '';
      return state;
    default:
      return state;
  }
};