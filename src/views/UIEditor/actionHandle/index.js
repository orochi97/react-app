// 所有的事件处理都收拢于此处，即只在这里进行数据处理及 dispatch
import { omit } from 'lodash';
import store, {
  undo,
  redo,
  addComp,
  moveComp,
  deleteComp,
  setAllComp,
  changeComp,
  setHistory,
  setCurrentComp,
} from '@/store';
import { components as compMap } from '@/views/UIEditor/components';
import { generateId } from '@/views/UIEditor/utils';
import { apiGetSystemData } from '@/views/UIEditor/api';

export function actionChangeHandle(id, key, value) {
  store.dispatch(changeComp({ id, key, value }));
  // 改变数据后获取新数据
  const { list, currentComp } = store.getState().editor.component;
  store.dispatch(setHistory({
    components: list,
    selectedId: currentComp.id,
  }));
}

export function actionMoveHandle(id, x, y) {
  store.dispatch(moveComp({ id, x, y }));
  // 改变数据后获取新数据
  const { list, currentComp } = store.getState().editor.component;
  store.dispatch(setHistory({
    components: list,
    selectedId: currentComp.id,
  }));
}

export function actionDeleteHandle(deleteId) {
  store.dispatch(deleteComp({ id: deleteId }));
  // 改变数据后获取新数据
  const { list, currentComp } = store.getState().editor.component;
  store.dispatch(setHistory({
    components: list,
    selectedId: currentComp.id,
  }));
}

function genNewComp(compType, id, position) {
  const newComp = omit(compMap[compType], 'render');
  newComp.id = id + '';
  newComp.position = position;
  return newComp;
};

export function actionAddHandle(type, { x, y }) {
  const newId = generateId();
  store.dispatch(addComp(genNewComp(type, newId, { x, y })));
  // 改变数据后获取新数据
  const { list, currentComp } = store.getState().editor.component;
  store.dispatch(setHistory({
    components: list,
    selectedId: currentComp.id,
  }));
}

export function actionUndoRedoHandle(flag) {
  if (flag === 'undo') {
    store.dispatch(undo());
  } else {
    store.dispatch(redo());
  }
  const { currentIndex, list } = store.getState().editor.history;
  const { components, selectedId } = list[currentIndex];
  store.dispatch(setAllComp({ components, selectedId }));
}

export function actionSetCurrentCompHandle(id) {
  store.dispatch(setCurrentComp({ id }));
}

export function actionInitDataHandle() {
  apiGetSystemData().then((components) => {
    store.dispatch(setAllComp({ components, selectedId: '' }));
    store.dispatch(setHistory({ components, selectedId: '' }));
  });
}
