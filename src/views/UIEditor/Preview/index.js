import { useLoaderData } from 'react-router-dom';
import { components as compMap } from '@/views/UIEditor/components';
import { apiGetSystemData } from '@/views/UIEditor/api';

import './index.less';

function UIPreview() {
  const components = useLoaderData();

  return (
    <div className="uipreivew">
      <div className='screen'>
        {
          components.map(item => {
            const Comp = compMap[item.type].render;
            return <Comp className={`animate__animated component ${item.porperty.anime}`} style={{ left: item.position.x, top: item.position.y }}
              data-id={item.id} key={item.id} {...item.porperty} />;
          })
        }
      </div>
    </div>
  );
}

// loader结果返回，才会渲染组件
export const loader = async () => {
  const components = await apiGetSystemData();
  return Promise.resolve(components);
};

export default UIPreview;
