import { isEmpty, cloneDeep } from 'lodash';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Modal, Button, Input, InputNumber, Select, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { porperties as porpertyMap } from '@/views/UIEditor/components';
import { actionChangeHandle, actionMoveHandle, actionSetCurrentCompHandle } from '@/views/UIEditor/actionHandle';
import Assets from '@/views/UIEditor/Assets';
import animeOptions from './animeoptions';

import './index.less';

// 编辑 select radio checkbox 此类有多个 options 的弹窗，统一格式 [{ value, label }]
function EditOptionsDialog({ open, options, handleCancel, handleSubmit }) {
  const [editedOptions, setOptions] = useState(cloneDeep(options));

  const changeHandle = useCallback((value, index, key) => {
    editedOptions[index][key] = value;
    setOptions([...editedOptions]);
  }, [editedOptions]);

  const actionDeleteHandle = useCallback((index) => {
    editedOptions.splice(index, 1);
    setOptions([...editedOptions]);
  }, [editedOptions]);

  const actionAddHandle = useCallback(() => {
    setOptions([...editedOptions, { value: '', label: '' }]);
  }, [editedOptions]);

  const submitHandle = useCallback(() => {
    const hasEmpty = editedOptions.some((item) => {
      return (!item.label || !item.value);
    });
    if (hasEmpty) {
      return message.error('All input cannot be empty!');
    }
    handleSubmit(editedOptions);
  }, [editedOptions, handleSubmit]);

  return <Modal
    open={open}
    maskClosable={false}
    width="600px"
    title="Edit Options"
    wrapClassName="edit-options-dialog"
    onOk={handleCancel}
    onCancel={handleCancel}
    footer={[
      <Button key="cancel" onClick={handleCancel}>
        Cancel
      </Button>,
      <Button key="add" type="primary" onClick={actionAddHandle}>
        Add
      </Button>,
      <Button key="submit" type="primary" onClick={submitHandle}>
        Submit
      </Button>,
    ]}
  >
    <List
      bordered
      dataSource={editedOptions}
      size="small"
      renderItem={(item, index) => (
        <List.Item>
          <span className="name">value:</span>
          <Input value={item.value} onChange={(ev) => changeHandle(ev.target.value, index, 'value')} />
          <span className="name">label:</span>
          <Input value={item.label} onChange={(ev) => changeHandle(ev.target.value, index, 'label')} />
          <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => actionDeleteHandle(index)} />
        </List.Item>
      )}
    />
  </Modal>;
}

// 单条不同类型编辑框的统一封装
function PorpertyItem({ porperty, value, id, openOptionDialog, openImageDialog }) {
  const { key, type, options, isPosition } = porperty;

  const changeHandle = useCallback((value) => {
    if (isPosition) {
      actionMoveHandle(id, key === 'x' ? value : null, key === 'y' ? value : null);
    } else {
      actionChangeHandle(id, key, value);
    }
    actionSetCurrentCompHandle(id);
  }, [id, key, isPosition]);

  return (
    <div className="porperty-item">
      <span className="name">{key}:&nbsp;</span>
      {
        type === 'number' && <InputNumber value={value} min={0} onChange={changeHandle}></InputNumber>
      }
      {
        type === 'text' && <Input value={value} onChange={(ev) => changeHandle(ev.target.value)}></Input>
      }
      {
        type === 'select' && <Select options={options} value={value} onChange={changeHandle}></Select>
      }
      {
        type === 'options' && <Button onClick={openOptionDialog}>Edit Options</Button>
      }
      {
        type === 'image' && <Button onClick={openImageDialog}>Select Image</Button>
      }
    </div>
  ); 
}

function Porperty() {
  const editorState = useSelector(state => state.editor);
  const [optionDialog, setOpenOptionDialog] = useState(false);
  const [imageDialog, setOpenImageDialog] = useState(false);
  const { label, type, porperty: porpertyValues, id, position } = editorState.component.currentComp;

  const noCurrentComp = isEmpty(editorState.component.currentComp);

  const handleSubmitOptions = useCallback((value) => {
    actionChangeHandle(id, 'options', value);
    setOpenOptionDialog(false);
  }, [id]);

  const handleSelectImage = useCallback(({ src }) => {
    actionChangeHandle(id, 'src', src);
    setOpenImageDialog(false);
  }, [id]);

  return (
    <div className="porperty">
      <h2 className="title">Porperty</h2>
      {
        noCurrentComp && <></>
      }
      {
        !noCurrentComp &&
          <div>
            <p className="title">{label}</p>
            <PorpertyItem porperty={{ key: 'anime', type: 'select', options: animeOptions }} value={porpertyValues.anime||'none'} id={id}></PorpertyItem>
            <PorpertyItem porperty={{ key: 'x', type: 'number', isPosition: true }} value={position.x} id={id}></PorpertyItem>
            <PorpertyItem porperty={{ key: 'y', type: 'number', isPosition: true }} value={position.y} id={id}></PorpertyItem>
            {
              porpertyMap[type].map((item) => {
                if (item.isPrivate) {
                  return null;
                }
                return <PorpertyItem
                  porperty={item} key={item.key} value={porpertyValues[item.key]} id={id}
                  openOptionDialog={() => setOpenOptionDialog(true)}
                  openImageDialog={() => setOpenImageDialog(true)}
                />;
              })
            }
            <EditOptionsDialog open={optionDialog} key={optionDialog} options={porpertyValues.options}
              handleCancel={() => setOpenOptionDialog(false)} handleSubmit={handleSubmitOptions} />
            <Assets key={imageDialog?'1':'0'} open={imageDialog} onlyList={true} selectedSrc={porpertyValues.src}
              handleCancel={() => setOpenImageDialog(false)} handleSelect={handleSelectImage} />
          </div>
      }
    </div>
  );
}

export default Porperty;
