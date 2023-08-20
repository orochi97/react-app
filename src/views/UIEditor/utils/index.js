export function generateId() {
  return Date.now() + '';
}; 

export function parseJsonString(str) {
  try {
    return JSON.parse(str);
  } catch(e) {
    console.error('parse json string error: ', e);
    return {};
  }
};

export function genBasicCompData(customData, porperty) {
  return Object.assign({
    porperty: porperty.reduce((result, item) => {
      result[item.key] = item.defaultValue;
      return result;
    }, {}),
    position: {
      x: 0,
      y: 0,
    },
  }, customData);
}

export const UIEDITOR_COMP_KEY = 'uieditorcomponents';

export function getLocalStorage(key) {
  try {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    }
    return null;
  } catch (error) {
    console.error('get localstorage fail', error);
    return null;
  }
}

export function setLocalStorage(key, value) {
  try {
    localStorage[key] = JSON.stringify(value);
  } catch (error) {
    console.error('set localstorage fail', error);
  }
}
