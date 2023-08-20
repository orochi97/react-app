import { useCallback, useEffect, useState } from 'react';
import { Tabs, Modal, Button, Upload, message } from 'antd';
import { ExclamationCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { apiGetImageList, apiDeleteImage } from '@/views/UIEditor/api';

import './index.less';

function ImageUpload() {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://服务器地址', // https://ant.design/components/upload-cn/
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.info(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.info('Dropped files', e.dataTransfer.files);
    },
  };
  return <Upload.Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Upload.Dragger>;
}

function ImageList({ data, selectedIndex, setSelectedIndex }) {
  const [_selectedIndex, _setSelectedIndex] = useState(null);

  const selectImage = useCallback((idx) => {
    setSelectedIndex(idx);
  }, [setSelectedIndex]);

  useEffect(() => {
    _setSelectedIndex(selectedIndex);
  }, [selectedIndex]);

  return <div className="image-list">
    {
      data.map(({ src, name }, index) =>
        <img className={`image ${(index)===_selectedIndex?'selected':''}`} key={src} src={src} alt={name} onClick={() => selectImage(index)}/>,
      )
    }
  </div>;
}

// 图片的管理，包括选择，删除，添加
function Assets({ open, onlyList, selectedSrc, handleCancel, handleSelect }) {
  const [tabType, setTabType] = useState('list');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [imageList, setImageList] = useState([]);

  const deleteConfirmHandle = useCallback(() => {
    apiDeleteImage().then(() => {
      imageList.splice(selectedIndex, 1);
      setImageList([...imageList]);
      setSelectedIndex(-1);
    });
  }, [selectedIndex, imageList]);

  const deleteHandle = useCallback(() => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete the image?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: deleteConfirmHandle,
    });
  }, [deleteConfirmHandle]);

  const selectHandle = useCallback(() => {
    handleSelect && handleSelect(imageList[selectedIndex]);
  }, [handleSelect, imageList, selectedIndex]);

  useEffect(() => {
    const index = imageList.findIndex(i => i.src === selectedSrc);
    setSelectedIndex(index);
  }, [imageList, selectedSrc]);

  useEffect(() => {
    apiGetImageList().then((list) => {
      setImageList(list);
    });
  }, []);

  return <Modal
    open={open}
    maskClosable={false}
    width="660px"
    title="Assets Manage"
    wrapClassName="edit-assets-dialog"
    onOk={handleCancel}
    onCancel={handleCancel}
    footer={[
      <Button key="cancel" onClick={handleCancel}>
        Cancel
      </Button>,
      tabType === 'list' && !onlyList ? <Button key="delete" type="primary" onClick={deleteHandle} disabled={selectedIndex===-1}>
        Delete
      </Button> : null,
      tabType === 'list' && onlyList ? <Button key="select" type="primary" onClick={selectHandle} disabled={selectedIndex===-1}>
        Select
      </Button> : null,
    ]}
  >
    <Tabs defaultActiveKey="list" items={[
      {
        key: 'list',
        label: `Image List`,
        children: <ImageList data={imageList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}></ImageList>,
      },
      !onlyList && {
        key: 'upload',
        label: `Image Upload`,
        children: <ImageUpload />,
      },
    ]} onChange={setTabType}/>
  </Modal>;
}

export default Assets;
