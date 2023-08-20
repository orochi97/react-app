import { cloneDeep } from 'lodash';
import { DATA_UNDO, DATA_REDO, SET_HISTORY } from './type';

export const undo = payload => ({
  type: DATA_UNDO,
  payload: payload,
});

export const redo = payload => ({
  type: DATA_REDO,
  payload: payload,
});

export const setHistory = payload => ({
  type: SET_HISTORY,
  payload: payload,
});

const defaultState = {
  list: [{
    components: [],
    selectedId: '',
  }],
  currentIndex: 0,
};

export default function reducer(state = defaultState, action) {
  state = cloneDeep(state);
  const { type, payload = {} } = action;
  switch (type) {
    case DATA_UNDO:
      if (state.currentIndex > 1) {
        state.currentIndex--;
      }
      return state;
    case DATA_REDO:
      if (state.currentIndex < state.list.length - 1) {
        state.currentIndex++;
      }
      return state;
    case SET_HISTORY:
      state.list.push({
        components: payload.components,
        selectedId: payload.selectedId,
      });
      state.currentIndex++;
      return state;
    default:
      return state;
  }
};
