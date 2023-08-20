import { combineReducers } from '@reduxjs/toolkit';
import component, { addComp, moveComp, deleteComp, changeComp, setCurrentComp, setAllComp } from './components';
import history, { undo, redo, setHistory } from './history';

const reducer = combineReducers({
  component,
  history,
});

export {
  undo,
  redo,
  setHistory,
  addComp,
  moveComp,
  deleteComp,
  changeComp,
  setAllComp,
  setCurrentComp,
};

export default reducer;