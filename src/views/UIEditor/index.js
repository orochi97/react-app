import { useEffect } from 'react';
import commandRegister from '@/views/uieditor/command';
import { actionUndoRedoHandle, actionInitDataHandle, actionDeleteHandle } from '@/views/UIEditor/actionHandle';
import store from '@/store';
import Information from './Information';
import Toolbar from './Toolbar';
import Porperty from './Porperty';
import Toolbox from './Toolbox';
import Screen from './Screen';

import './index.less';

function init() {
  document.title = 'UI EDitor';
  commandRegister([
    { type: 'undo', command: 'ctrl+z', action() {
      actionUndoRedoHandle('undo');
    }},
    { type: 'redo', command: 'shift+ctrl+z', action() {
      actionUndoRedoHandle('redo');
    }},
    { type: 'delete', command: 'delete', action() {
      actionDeleteHandle(store.getState().editor.component.currentComp.id);
    }},
  ]);
  actionInitDataHandle();
}

function UIEditor() {
  useEffect(() => {
    init();
  }, []);

  return (
    <div className='ui-editor'>
      <header className='editor-header'>
        <Information></Information>
        <Toolbar></Toolbar>
      </header>
      <section className='editor-section'>
        <div className='editor-toolbox'>
          <Toolbox></Toolbox>
        </div>
        <div className='editor-layout'>
          <Screen></Screen>
        </div>
        <div className='editor-porperty'>
          <Porperty></Porperty>
        </div>
      </section>
    </div>
  );
}

export default UIEditor;
