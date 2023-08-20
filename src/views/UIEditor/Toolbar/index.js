import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Tooltip, message } from 'antd';
import { actionDeleteHandle, actionUndoRedoHandle } from '@/views/UIEditor/actionHandle';
import Assets from '@/views/UIEditor/Assets';
import { apiSaveSystemData } from '@/views/UIEditor/api';
import iconList from './icons';

import './index.less';

function PreviewDialog({ open, handleCancel }) {
  return <Modal
    open={open}
    width="600px"
    title="Preview"
    onOk={handleCancel}
    onCancel={handleCancel}
    key={open ? '1' : '0'} // 每次都重新渲染，为了触发 preview 页面的 loader 事件
    footer={[
      <Button key="close" onClick={handleCancel}>
        Close
      </Button>,
      <Button key="open" type="primary" onClick={() => window.open('/uipreview')}>
        Open
      </Button>,
    ]}
  >
    <iframe title="Preivew" width="100%" height="800px" src="/uipreview" />
  </Modal>;
}

function Toolbar() {
  const { list: components, currentComp } = useSelector(state => state.editor.component);
  const [openPreview, setOpenPreview] = useState(false);
  const [openAssets, setOpenAssets] = useState(false);
  const [actionMap] = useState({
    'undo': () => actionUndoRedoHandle('undo'),
    'redo': () => actionUndoRedoHandle('redo'),
    'delete': actionDeleteHandle,
  });

  const saveHandle = useCallback(() => {
    apiSaveSystemData(components);
    message.success('Save uccessfully');
  }, [components]);

  const previewHandle = useCallback((flag) => {
    setOpenPreview(flag);
  }, []);

  const clickIconHandle = useCallback((type) => {
    actionMap[type](currentComp.id);
  }, [actionMap, currentComp]);

  return (
    <div className='toolbar'>
      <div>
        {
          iconList.map(item => 
            <Tooltip key={item.type}  title={item.label}>
              <Button onClick={() => clickIconHandle(item.type)} className="icon" icon={<item.component />} disabled={item.disabled}/>
            </Tooltip>)
        }
      </div>
      <div className="btns">
        <Button type="default" onClick={() => setOpenAssets(true)}>Assets</Button>
        <Button type="default" onClick={() => previewHandle(true)}>Preview</Button>
        <Button type="primary" onClick={saveHandle}>Save</Button>
      </div>
      <PreviewDialog open={openPreview} handleCancel={() => previewHandle(false)}/>
      <Assets key={openAssets?'1':'0'} open={openAssets} handleCancel={() => setOpenAssets(false)}/>
    </div>
  );
}

export default Toolbar;
