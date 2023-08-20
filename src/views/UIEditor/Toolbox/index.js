import { useCallback } from 'react';
import { components } from '@/views/UIEditor/components';

import './index.less';

const toolboxList = Object.keys(components).reduce((result, key) => {
  const { type, label } = components[key];
  result.push({ type, label });
  return result;
}, []);

function Toolbox() {
  const dragStartHandle = useCallback((ev) => {
    const offsetX = 0;
    const offsetY = 0;
    ev.dataTransfer.setData('text/plain', JSON.stringify({ event: 'add', type: ev.target.dataset.type, offsetX, offsetY }));
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setDragImage(ev.target, offsetX, offsetY);
  }, []);

  return (
    <div className='toolbox'>
      <h2 className="title">Toolbox</h2>
      <div>
        {
          toolboxList.map(item => 
            <span onDragStart={dragStartHandle}
              className='icon' key={item.type} data-type={item.type} draggable="true">
              {item.label}
            </span>,
          )
        }
      </div>
    </div>
  );
}

export default Toolbox;
