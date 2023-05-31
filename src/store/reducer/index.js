import number from './number';
import string from './string';
import data from './data';
import counter from './counter';

export * from './number';
export * from './string';
export * from './data';
export * from './counter';

const reducer = {
  number,
  string,
  data,
  counter,
};

export default reducer;
