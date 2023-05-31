import { cloneDeep } from 'lodash';
import { ADD_STRING, MINUS_STRING } from '../type';

export const addStringAction = payload => ({
  type: ADD_STRING,
  payload: payload,
});

export const minusStringAction = payload => ({
  type: MINUS_STRING,
  payload: payload,
});

const defaultState = {
  b: 'abc',
};

export default function stringReducer(state = defaultState, action) {
  const { type, payload } = action;
  state = cloneDeep(state);
  switch (type) {
    case ADD_STRING:
      state.b += payload;
      return state;
    case MINUS_STRING:
      state.b = '';
      return state;
    default:
      return state;
  }
};