import { useCallback, useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { components as compMap } from '@/views/UIEditor/components';
import { actionAddHandle, actionMoveHandle, actionSetCurrentCompHandle } from '@/views/UIEditor/actionHandle';
import { parseJsonString } from '@/views/UIEditor/utils';

import './index.less';

function UIEditor() {
  const $screen = useRef(null);
  const [distance, setDistance] = useState({ left: 0, top: 0 });
  const editorState = useSelector(state => state.editor);
  const { list, currentComp } = editorState.component;

  // 需要把目标放置点的默认 ondragover 事件禁止，才能触发 ondrop 事件
  const dragoverHandle = useCallback((ev) => {
    ev.preventDefault();
  }, []);

  // 拖拽松手放置事件，区分添加或者移动触发
  const dropHandle = useCallback((ev) => {
    ev.preventDefault();
    const transferData = ev.dataTransfer.getData('text/plain');
    const { event, type, id, offsetX, offsetY } = parseJsonString(transferData);
    const x = Math.ceil(ev.clientX - distance.left - offsetX);
    const y = Math.ceil(ev.clientY - distance.top - offsetY);
    if (event === 'move') {
      actionMoveHandle(id, x, y);
      return;
    }
    if (compMap[type]) {
      actionAddHandle(type, { x, y });
      return;
    }
    console.warn(`Can't find the component!`);
  }, [distance]);

  // 已经渲染在编辑区，做移动的拖拽处理
  const dragStartHandle = useCallback((ev) => {
    const { offsetX, offsetY } = ev.nativeEvent;
    ev.dataTransfer.setData('text/plain', JSON.stringify({ event: 'move', id: ev.target.dataset.id, offsetX, offsetY }));
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setDragImage(ev.target, offsetX, offsetY);
  }, []);

  // 点击选择编辑器的组件
  const selectHandle = useCallback((ev) => {
    actionSetCurrentCompHandle(ev.currentTarget.dataset.id);
  }, []);

  useEffect(() => {
    const { left, top } = $screen.current.getBoundingClientRect();
    setDistance({ left: Math.ceil(left), top: Math.ceil(top) });
  }, []);

  return (
    <div className="container">
      <div className="frame">
        <div className="screen" onDragOver={dragoverHandle} onDrop={dropHandle} ref={$screen}>
          {
            list.map(item => {
              const Comp = compMap[item.type].render;
              return <div onDragStart={dragStartHandle} onClick={selectHandle}
                className={`animate__animated component ${currentComp.id === item.id ? 'selected' : ''} ${item.porperty.anime}`}
                style={{ left: item.position.x, top: item.position.y }} data-id={item.id} key={item.id}  draggable="true">
                <Comp {...item.porperty} />
                <div className='alert'></div>
              </div>;
            })
          }
        </div>
      </div>
    </div>
  );
}

export default UIEditor;
