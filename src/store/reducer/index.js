import number from './number';
import string from './string';
import data from './data';
import counter from './counter';
import editor from './editor';

export * from './number';
export * from './string';
export * from './data';
export * from './counter';
export * from './editor';

const reducer = {
  number,
  string,
  data,
  counter,
  editor,
};

export default reducer;
