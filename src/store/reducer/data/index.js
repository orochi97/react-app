import { combineReducers } from '@reduxjs/toolkit';
import number, { dataAddNumberAction, dataMinusNumberAction } from './number';
import string, { dataAddStringAction, dataMinusStringAction } from './string';

const reducer = combineReducers({
  number,
  string,
});

export {
  dataAddNumberAction,
  dataMinusNumberAction,
  dataAddStringAction,
  dataMinusStringAction,
};

export default reducer;