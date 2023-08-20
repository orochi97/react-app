import { cloneDeep } from 'lodash';
import { DATA_ADD_COMP, DATA_REMOVE_COMP, DATA_MOVE_COMP, DATA_CHANGE_COMP, SET_CURRENT_COMP, SET_COMP } from './type';

export const setAllComp = payload => ({
  type: SET_COMP,
  payload: payload,
});

export const addComp = payload => ({
  type: DATA_ADD_COMP,
  payload: payload,
});

export const deleteComp = payload => ({
  type: DATA_REMOVE_COMP,
  payload: payload,
});

export const moveComp = payload => ({
  type: DATA_MOVE_COMP,
  payload: payload,
});

export const changeComp = payload => ({
  type: DATA_CHANGE_COMP,
  payload: payload,
});

export const setCurrentComp = payload => ({
  type: SET_CURRENT_COMP,
  payload: payload,
});

const defaultState = {
  list: [],
  currentComp: {},
};

export default function reducer(state = defaultState, action) {
  state = cloneDeep(state);
  const { type, payload = {} } = action;
  const idx = state.list.findIndex(i => i.id === payload.id);
  const comp = state.list[idx];
  switch (type) {
    case SET_COMP:
      state.list = payload.components;
      const currentComp = state.list.find(i => i.id === payload.selectedId);
      if (currentComp) {
        state.currentComp = currentComp;
      } else {
        state.currentComp = {};
      }
      return state;
    case DATA_ADD_COMP:
      state.list.push(payload);
      return state;
    case DATA_REMOVE_COMP:
      if (idx !== -1) {
        state.list.splice(idx, 1);
        state.currentComp = {};
      }
      return state;
    case DATA_MOVE_COMP:
      if (comp) {
        comp.position.x = payload.x ?? comp.position.x;
        comp.position.y = payload.y ?? comp.position.y;
        state.currentComp = comp;
      }
      return state;
    case DATA_CHANGE_COMP:
      if (comp) {
        comp.porperty[payload.key] = payload.value;
      }
      return state;
    case SET_CURRENT_COMP:
      if (comp) {
        state.currentComp = comp;
      }
      return state;
    default:
      return state;
  }
};
