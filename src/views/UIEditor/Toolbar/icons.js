import {
  RedoOutlined,
  UndoOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import store from '@/store';

const iconList = [
  { type: 'undo', label: 'Undo', component: UndoOutlined, get disabled() {
      return !(store.getState().editor.history.currentIndex > 1);
  }},
  { type: 'redo', label: 'Redo', component: RedoOutlined, get disabled() {
    const { currentIndex, list } = store.getState().editor.history;
    return !(currentIndex < list.length - 1);
  }},
  { type: 'delete', label: 'Delete', component: DeleteOutlined, get disabled() {
    return !store.getState().editor.component.currentComp.id;
  }},
];

export default iconList;
